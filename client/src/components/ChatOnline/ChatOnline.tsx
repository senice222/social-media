import style from './ChatOnline.module.scss'
import {FC, useEffect, useState} from "react";
import {SocketUser, UserOnlineProps} from "../../interfaces/Chat.ts";
import {User} from "../../interfaces/AuthI.ts";
import * as Api from '../../api/'

const ChatOnline: FC<UserOnlineProps> = ({onlineUsers, setCurrentChat, currentUserId}) => {
    const [friends, setFriends] = useState<User[]>()
    const [onlineFriends, setOnlineFriends] = useState<User[]>()


    useEffect(() => {
        const getFriends = async () => {
            const data = await Api.friends.getAllUserFriends()
            setFriends(data)
        }
        getFriends()
    }, [currentUserId]);

    useEffect(() => {
        if (friends && onlineUsers) {
            const onlineUserIds = onlineUsers.map((user: SocketUser) => user.userId);
            setOnlineFriends(friends.filter(friend => onlineUserIds.includes(friend._id)));
        }
    }, [friends, onlineUsers]);

    const handleChangeConversation = async (user: User) => {
        try {
            if (currentUserId)  {
                const data = await Api.conversation.getCurrentUserConversation(currentUserId, user._id)
                setCurrentChat(data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={style.chatOnline}>
            {
                onlineFriends?.map((friend) => (
                    <div className={style.chatOnlineFriend} onClick={() => handleChangeConversation(friend)}>
                        <div className={style.chatOnlineImgContainer}>
                            <img src={`http://localhost:5000/${friend.avatar}`} alt={'/'} />
                            <div className={style.chatOnlineBadge}></div>
                        </div>
                        <span className={style.chatOnlineName}>{friend.username}</span>
                    </div>
                ))
            }
        </div>
    );
};

export default ChatOnline;
