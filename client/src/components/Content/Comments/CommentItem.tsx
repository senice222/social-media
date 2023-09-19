import style from './Comment.module.scss'
import React from 'react'
import {FC, useState} from "react";
import {CommentProps} from "../../../interfaces/PostsI.ts";
import * as Api from '../../../api/index.ts'
import useSWR from 'swr';
import {fetcher} from "../../../core/axios.ts";

const CommentItem: FC<CommentProps> = ({_id}) => {
    const [comment, setComment] = useState<string>('');
    const {data: comments, mutate: mutateComments} = useSWR(`posts/comments/${_id}`, fetcher);

    const onCreateComment = async () => {
        try {
            await Api.posts.createComment(_id, comment);
            mutateComments();
            setComment('');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={style.commentContainer}>
            <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
            />
            <button onClick={onCreateComment}>Send</button>

            <div>
                <h3>Comments:</h3>
                {   comments ? (
                        <ul>
                            {
                                comments.map((comment: any) => (
                                    <React.Fragment key={comment._id}>
                                        <li>
                                            {comment.commentText}
                                        </li>
                                    </React.Fragment>
                                ))
                             }
                        </ul>
                    ) : (
                        <p>Loading comments...</p>
                    )
                }
            </div>
        </div>
    );
};

export default CommentItem;
