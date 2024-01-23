import { FC } from "react";
import style from "./CreatePost.module.scss";
import feeling from "../../../assets/feeling.png";
import video from "../../../assets/live-video.png";
import { useState } from "react";
import * as Api from "../../../api";
import { useSWRConfig } from "swr";
import { CreatePostProps } from "../../../interfaces/Posts";
import { File } from "../../../interfaces/File";
import UserProfile from "./UserProfile/UserProfile";
import PostInput from "./PostInput/PostInput";
import UploadButton from "./UploadButton/UploadButton";

const CreatePost: FC<CreatePostProps> = ({ user, currentPage }) => {
    const { mutate } = useSWRConfig();
    const [content, setContent] = useState<string>("");
    const [fileList, setFileList] = useState<File[]>([]);

    const handleCreatePost = async () => {
        await Api.posts.createPost(content, fileList);
        setContent("");
        mutate(`posts/getPaginatedPosts?page=${currentPage}&perPage=${5}`);
    };

    return (
        <div className={style.middleSide}>
            <UserProfile user={user} />
            <PostInput content={content} setContent={setContent} username={user?.username} handleCreatePost={handleCreatePost}/>
            <div className={style.addPostLink}>
                <UploadButton
                    icon={video}
                    label="Upload Video"
                    setFileList={setFileList}
                />
                <UploadButton
                    icon={feeling}
                    label="Upload File"
                    setFileList={setFileList}
                />
            </div>
        </div>
    );
};

export default CreatePost;
