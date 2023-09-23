import React from 'react'
import style from './Content.module.scss'
import profilePic from "../../assets/profile-pic.png";
import {NavLink} from "react-router-dom";
import postImg from '../../assets/feed-image-1.png'
import blueLike from '../../assets/like-blue.png'
import like from '../../assets/like.png'
import comment from '../../assets/comments.png'
import share from '../../assets/share.png'
import {Post} from "../../interfaces/PostsI.ts";
import CommentsList from "../Comments/CommentsList.tsx";
import {useGetMe} from "../../hooks/useGetMe.ts";

const ContentItem: React.FC<Post> = ({_id, content, likes, comments, owner, createdAt}) => {
    const { currentUser } = useGetMe()
    const isUserLiked = likes.some(item => item === currentUser?._id)

    return (
        <div className={style.middleSide}>
            <div className={style.postContainer}>
                <div className={style.postRow}>
                    <div className={style.userProfile}>
                        <img src={profilePic} alt={'/'}/>
                        <div>
                            <p>{owner && owner.username}</p>
                            <span>{createdAt}</span>
                        </div>
                    </div>
                    <NavLink to={'/'}>...</NavLink>
                </div>
                <p className={style.postText}>
                    {content}
                </p>
                <img src={postImg} className={style.postImg} alt="/"/>

                <div className={style.postRow}>
                    <div className={style.activityIcons}>
                        <div><img src={isUserLiked ? blueLike : like} alt="/"/> {likes ? likes.length : 0} </div>
                        <div><img src={comment} alt="/"/> {comments ? comments.length : 0} </div>
                        <div><img src={share} alt="/"/> 20</div>
                    </div>
                    <div className={style.postProfileIcon}>
                        <img src={profilePic} alt="/"/>
                    </div>
                </div>

                <CommentsList
                    _id={_id}
                    comments={comments}
                />
            </div>
        </div>
    );
};

export default ContentItem;
