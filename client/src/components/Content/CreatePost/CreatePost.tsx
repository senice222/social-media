import {FC} from "react";
import style from './CreatePost.module.scss'
import photo from "../../../assets/photo.png";
import feeling from "../../../assets/feeling.png";
import video from "../../../assets/live-video.png";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import * as Api from '../../../api'
import userAvatar from "../../../assets/user.png"
import { UserProps } from '../../../interfaces/Auth';

const CreatePost:FC<UserProps> = ({user}) => {
    const [content, setContent] = useState<string>('');

    const handleCreatePost = async () => {
        await Api.posts.createPost(content)
        setContent('')
        window.location.reload()
    }

    return (
        <div className={style.middleSide}>
            <div className={style.userProfile}>
                <img src={user?.avatar ? `http://localhost:5000/${user?.avatar}` : userAvatar} alt={'/'}/>
                <div>
                    <p>{user ? user.username : 'Loading..'}</p>
                </div>
            </div>

            <div className={style.postInputContainer}>
                <textarea value={content}
                          onChange={(e) => setContent(e.target.value)}
                          rows={3}
                          placeholder={"What's on your mind, John?"}
                          onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  handleCreatePost();
                              }
                          }}
                >

                </textarea>

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
