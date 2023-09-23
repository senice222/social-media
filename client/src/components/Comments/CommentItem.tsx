import style from "./Comment.module.scss";
import {CommentItemProps} from "../../interfaces/PostsI.ts";
import {FC} from "react";

const CommentItem: FC<CommentItemProps> = ({username, commentText, createdAt, avatar}) => {
    return (
        <div className={style.comment}>
            <div className={style.userInfo}>
                <img src={`http://localhost:5000/${avatar}`} alt={'/'}/>
                <h3>{username}</h3>
                <p>{createdAt}</p>
            </div>
            <p>{commentText}</p>
        </div>
    );
};

export default CommentItem;