import style from "./CreateComment.module.scss";
import {FC} from "react";
import {CreateCommentProps} from "../../../interfaces/PostsI.ts";

const CreateComment: FC<CreateCommentProps> = ({ setComment, comment, onCreateComment}) => {

    return (
        <>
            <input
                className={style.commentInput}
                value={comment}
                placeholder={'Add a comment...'}
                onChange={(e) => setComment(e.target.value)}
                type="text"
            />
            <button className={style.commentBtn} onClick={onCreateComment}>Send</button>
        </>
    );
};

export default CreateComment;
