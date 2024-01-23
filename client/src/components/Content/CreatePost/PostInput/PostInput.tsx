import { Dispatch, FC, SetStateAction } from "react";
import style from "../CreatePost.module.scss";

const PostInput: FC<{
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    username?: string;
    handleCreatePost: () => void;
}> = ({ content, setContent, username, handleCreatePost }) => (
    <div className={style.postInputContainer}>
        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            placeholder={`What's on your mind, ${username} ?`}
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleCreatePost();
                }
            }}
        />
    </div>
);

export default PostInput;
