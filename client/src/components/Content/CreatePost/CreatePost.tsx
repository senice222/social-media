import {FC} from "react";
import style from './CreatePost.module.scss'
import feeling from "../../../assets/feeling.png";
import video from "../../../assets/live-video.png";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import * as Api from '../../../api'
import userAvatar from "../../../assets/user.png"
import {Button, message, Upload} from 'antd';
import {useSWRConfig} from "swr";
import {CreatePostProps} from "../../../interfaces/Posts";

const CreatePost: FC<CreatePostProps> = ({user, currentPage}) => {
    const { mutate } = useSWRConfig();
    const [content, setContent] = useState<string>('');


    const handleCreatePost = async () => {
        await Api.posts.createPost(content);
        setContent('');
        mutate(`posts/getPaginatedPosts?page=${currentPage}&perPage=${5}`);
    };

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
                ></textarea>
                <div className={style.addPostLink}>
                    <NavLink to={'/'}>
                        <img src={video} alt="/"/> Live video
                    </NavLink>
                    <Upload beforeUpload={(file) => {
                        return new Promise((resolve, reject) => {
                            if (file.size > 2) {
                                reject("Rejected")
                            } else {
                                resolve("Success")
                            }
                        })
                    }}
                            onChange={(response) => {
                                if (response.file.status !== 'uploading') {
                                    console.log(response.file, response.fileList);
                                }
                                if (response.file.status === 'done') {
                                    message.success(`${response.file.name}  
                               file uploaded successfully`);
                                } else if (response.file.status === 'error') {
                                    message.error(`${response.file.name}  
                             file upload failed.`);
                                }
                            }}
                    >
                        <Button style={{marginRight: "20px"}}>Upload File</Button>
                    </Upload>
                    <NavLink to={'/'}>
                        <img src={feeling} alt="/"/> Feeling/Activity
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
