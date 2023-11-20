import style from "./Comment.module.scss";
import { FC } from "react";
import { CommentItemProps } from "../../interfaces/Comments.ts";
import { NavLink } from "react-router-dom";

const CommentItem: FC<CommentItemProps> = ({
  _id,
  username,
  commentText,
  createdAt,
  avatar,
}) => {
  return (
    <div className={style.comment}>
      <div className={style.userInfo}>
        <img src={`http://localhost:5000/${avatar}`} alt={"/"} />
        <h4>
          <NavLink to={`/profile/${_id}`}>{username}</NavLink>
        </h4>
        <p>{createdAt}</p>
      </div>
      <p>{commentText}</p>
    </div>
  );
};

export default CommentItem;
