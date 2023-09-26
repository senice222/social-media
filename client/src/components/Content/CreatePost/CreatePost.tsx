import style from './CreatePost.module.scss'
import profilePic from '../../../assets/profile-pic.png'
import photo from "../../../assets/photo.png";
import feeling from "../../../assets/feeling.png";
import video from "../../../assets/live-video.png";
import {NavLink} from "react-router-dom";

const CreatePost = () => {
    return (
        <div className={style.middleSide}>
            <div className={style.userProfile}>
                <img src={profilePic} alt={'/'}/>
                <div>
                    <p>John</p>
                </div>
            </div>

            <div className={style.postInputContainer}>
                <textarea rows={3} placeholder={"What's on your mind, John?"}></textarea>

                <div className={style.addPostLink}>
                    <NavLink to={'/'}>
                        <img src={video} alt="/"/> Live video
                    </NavLink>
                    <NavLink to={'/'}>
                        <img src={photo} alt="/"/> Photo
                    </NavLink>
                    <NavLink to={'/'}>
                        <img src={feeling} alt="/"/> Feeling/Activity
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
