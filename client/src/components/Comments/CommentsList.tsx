import style from './Comment.module.scss'
import {FC, useState} from "react";
import CommentsPagination from "./CommentsPagination/CommentsPagination.tsx";
import CommentItem from "./CommentItem.tsx";
import CreateComment from "./CreateComment/CreateComment.tsx";
import {usePostComments} from "../../hooks/usePostComments.ts";
import {CommentProps, Comment} from "../../interfaces/CommentsI.ts";

const CommentsList: FC<CommentProps> = ({_id}) => {
    const [comment, setComment] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const {comments, handleComment} = usePostComments(_id, comment, setComment)

    const commentsPerPage = 5
    const indexOfLastComment = currentPage * commentsPerPage
    const indexOfFirstComment = indexOfLastComment - commentsPerPage
    const currentComments = comments?.slice(indexOfFirstComment, indexOfLastComment)
    const totalPages = Math.ceil((comments?.length || 0) / commentsPerPage);

    return (
        <div className={style.commentContainer}>
            <CreateComment
                onCreateComment={handleComment}
                comment={comment}
                setComment={setComment}
            />
            <>
                {
                    currentComments ? (
                        currentComments.map((comment: Comment, i: number) => (
                            <CommentItem
                                key={i}
                                _id={comment.userId._id}
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
