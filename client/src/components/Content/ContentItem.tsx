import React from "react";
import style from "./Content.module.scss";
import profilePic from "../../assets/profile-pic.png";
import { NavLink } from "react-router-dom";
import postImg from "../../assets/feed-image-1.png";
import blueLike from "../../assets/like-blue.png";
import like from "../../assets/like.png";
import comment from "../../assets/comments.png";
import share from "../../assets/share.png";
import { ContentItemProps, likes } from "../../interfaces/Posts.ts";
import CommentsList from "../Comments/CommentsList.tsx";
import { usePostLikes } from "../../hooks/usePostLikes.ts";

const ContentItem: React.FC<ContentItemProps> = ({
  _id,
  content,
  comments,
  owner,
  createdAt,
  user
}) => {
  const { likes, handleLike } = usePostLikes(_id);

  const isUserLiked =
    likes?.length > 0 &&
    likes.some((item: likes) => item.id === user?._id);

  return (
    <div className={style.middleSide}>
      <div className={style.postContainer}>
        <div className={style.postRow}>
          <div className={style.userProfile}>
            <img src={profilePic} alt={"/"} />
            <div>
              <p>{owner && owner.username}</p>
              <span>{createdAt}</span>
            </div>
          </div>
          <NavLink to={"/"}>...</NavLink>
        </div>
        <p className={style.postText}>{content}</p>
        <img src={postImg} className={style.postImg} alt="/" />

        <div className={style.postRow}>
          <div className={style.activityIcons}>
            <div onClick={handleLike}>
              <img src={isUserLiked ? blueLike : like} alt="/" />{" "}
              {likes ? likes.length : 0}
            </div>
            <div>
              <img src={comment} alt="/" /> {comments ? comments.length : 0}
            </div>
            <div>
              <img src={share} alt="/" /> 20
            </div>
          </div>
          <div className={style.postProfileIcon}>
            <img src={profilePic} alt="/" />
          </div>
        </div>

        <CommentsList _id={_id} />
      </div>
    </div>
  );
};

export default ContentItem;
