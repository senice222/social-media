import style from "./Conversation.module.scss";
import {FC, useEffect, useState} from "react";
import {ConversationProps} from "../../interfaces/Conversation.ts";
import * as Api from "../../api/index.ts";
import {User} from "../../interfaces/Auth.ts";
import userAvatar from "../../assets/user.png";

const Conversation: FC<ConversationProps> = ({conversation, currentUser}) => {
    const [friend, setFriend] = useState<User>();

    useEffect(() => {
        const friendId = conversation.members.find((member) => member !== currentUser?._id);
        const getUserById = async () => {
            try {
                if (friendId) {
                    const data = await Api.user.getUserById(friendId);
                    setFriend(data);
                }
            } catch (e) {
                console.log(e);
            }
        };

        getUserById();
    }, [currentUser, conversation]);

    return (
        <div className={style.conversation}>
            <img
                src={
                    friend?.avatar
                        ? `http://localhost:5000/${friend?.avatar}`
                        : userAvatar
                }
                alt="/"
                className={style.conversationImg}
            />
            <span className={style.conversationName}>
        {friend?.username ? friend?.username : "loading.."}
      </span>
        </div>
    );
};

export default Conversation;
