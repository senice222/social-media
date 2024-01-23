import {FC} from "react";
import style from "./Content.module.scss";
import profilePic from "../../assets/profile-pic.png";
import {NavLink} from "react-router-dom";
import blueLike from "../../assets/like-blue.png";
import like from "../../assets/like.png";
import comment from "../../assets/comments.png";
import {ContentItemProps, Likes} from "../../interfaces/Posts";
import CommentsList from "../Comments/CommentsList";
import {usePostLikes} from "../../hooks/usePostLikes";
import {Carousel, Image} from "antd";

const ContentItem: FC<ContentItemProps> = ({_id, content, comments, owner, createdAt, user, urls}) => {
    const {likes, handleLike} = usePostLikes(_id);
    const likesArray = Array.isArray(likes) ? likes : [likes];
    const isUserLiked = likesArray?.length > 0 && likesArray.some((item: Likes) => item?.id === user?._id);

    return (
        <div className={style.middleSide}>
            <div className={style.postContainer}>
                <div className={style.postRow}>
                    <div className={style.userProfile}>
                        <img src={profilePic} alt={"/"}/>
                        <div>
                            <p>{owner && owner.username}</p>
                            <span>{createdAt}</span>
                        </div>
                    </div>
                    <NavLink to={"/"}>...</NavLink>
                </div>
                <p className={style.postText}>{content}</p>
                <Carousel style={{width: "200px"}} dots={true}>
                    {
                        urls.map(((item, i) => (
                            <div key={i}>
                                <Image
                                    width={200}
                                    src={`http://localhost:5000/${item}`}
                                />
                            </div>
                        )))
                    }
                </Carousel>

                <div className={style.postRow}>
                    <div className={style.activityIcons}>
                        <div onClick={handleLike}>
                            <img src={isUserLiked ? blueLike : like} alt="/"/>{" "}
                            {likes ? likes.length : 0}
                        </div>
                        <div>
                            <img src={comment} alt="/"/> {comments ? comments.length : 0}
                        </div>
                    </div>
                    <div className={style.postProfileIcon}>
                        <img src={profilePic} alt="/"/>
                    </div>
                </div>

                <CommentsList _id={_id}/>
            </div>
        </div>
    );
};

export default ContentItem;
