import style from './Comment.module.scss'
import {FC, useState} from "react";
import {Comment, CommentProps} from "../../../interfaces/PostsI.ts";
import * as Api from '../../../api/index.ts'
import useSWR from 'swr';
import {fetcher} from "../../../core/axios.ts";
import CommentsPagination from "./Pagination/CommentsPagination.tsx";

const CommentItem: FC<CommentProps> = ({_id}) => {
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
            <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
            />
            <button onClick={onCreateComment}>Send</button>

            <>
                {
                    currentComments ? (

                        currentComments.map((comment: Comment) => (
                            <div className={style.comment}
                                 key={comment._id}
                            >
                                <div className={style.userInfo}>
                                    <img src={`http://localhost:5000/${comment.userId.avatar}`} alt={'/'}/>
                                    <h3>{comment.userId.username}</h3>
                                    <p>{comment.createdAt}</p>
                                </div>
                                <p>{comment.commentText}</p>
                            </div>
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

export default CommentItem;
