import style from './Comment.module.scss'
import {FC, useState} from "react";
import {Comment, CommentProps} from "../../interfaces/PostsI.ts";
import * as Api from '../../api'
import useSWR from 'swr';
import {fetcher} from "../../core/axios.ts";
import CommentsPagination from "../CommentsPagination/CommentsPagination.tsx";
import CommentItem from "./CommentItem.tsx";
import CreateComment from "../CreateComment/CreateComment.tsx";

const CommentsList: FC<CommentProps> = ({_id}) => {
    const [comment, setComment] = useState<string>('')
    const {data: comments, mutate: mutateComments} = useSWR(`posts/comments/${_id}`, fetcher)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const commentsPerPage = 5

    const onCreateComment = async () => {
        try {
            await Api.posts.createComment(_id, comment)
            mutateComments()
            setComment('')
        } catch (e) {
            console.log(e)
        }
    }

    // Calculate the index of the first and last comment on the current page (pagination logic)
    const indexOfLastComment = currentPage * commentsPerPage
    const indexOfFirstComment = indexOfLastComment - commentsPerPage
    const currentComments = comments?.slice(indexOfFirstComment, indexOfLastComment)
    const totalPages = Math.ceil((comments?.length || 0) / commentsPerPage);

    return (
        <div className={style.commentContainer}>
            <CreateComment
                onCreateComment={onCreateComment}
                comment={comment}
                setComment={setComment}
            />
            <>
                {
                    currentComments ? (

                        currentComments.map((comment: Comment, i: number) => (
                            <CommentItem
                                key={i}
                                commentText={comment.commentText}
                                createdAt={comment.createdAt}
                                avatar={comment.userId.avatar}
                                username={comment.userId.username}
                            />
                        ))

                    ) : (
                        <p>Loading comments...</p>
                    )
                }
            </>

            <CommentsPagination
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                currentPage={currentPage}
            />
        </div>
    );
};

export default CommentsList;
