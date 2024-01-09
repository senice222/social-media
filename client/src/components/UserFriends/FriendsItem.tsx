import {FC} from "react";
import style from "./Friends.module.scss";
import {FriendsItemProps} from "../../interfaces/Friends";
import {useGetMe} from "../../hooks/useGetMe";
import * as Api from "../../api/index";
import {useNavigate} from "react-router-dom";

const FriendsItem: FC<FriendsItemProps> = ({_id, username, avatar, userConversations}) => {
    const {currentUser} = useGetMe();
    const navigate = useNavigate();

    const isConversationExists = userConversations.some((conversation) => {
        if (currentUser) {
            return (
                conversation.members.includes(currentUser?._id) &&
                conversation.members.includes(_id)
            );
        }
    });

    const createConversation = async () => {
        try {
            if (!isConversationExists && currentUser) {
                await Api.conversation.createConversation(currentUser._id, _id);
            }
            navigate("/direct");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={style.friendContainer}>
            <div className={style.friendItem}>
                <img src={`http://localhost:5000/${avatar}`} alt="/"/>
                <div className={style.textFriend}>
                    <h3 className={style.username}>{username}</h3>
                    <div style={{display: "flex", marginTop: "10px"}}>
                        <p className={style.textMessage} onClick={createConversation}>
                            Text message
                        </p>
                        <p className={style.call}>Call</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendsItem;
