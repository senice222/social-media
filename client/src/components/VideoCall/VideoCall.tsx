import style from './VideoCall.module.scss'
import {FC, useEffect, useState} from "react";
import {CurrentChatI} from "../../interfaces/Chat.ts";
import * as Api from '../../api/index.ts'


const VideoCall: FC<CurrentChatI> = ({currentChat, currentUser}) => {
    const [currentChatUsername, setCurrentChatUsername] = useState<string>()
    const friendId = currentChat?.members.filter(user => user !== currentUser?._id).toString()

    useEffect(() => {
        const getUserById = async () => {
            if (friendId) {
                const data = await Api.user.getUserById(friendId)
                setCurrentChatUsername(data.username)
            }
        }
        getUserById()
    }, [currentChat])


    return (
        <div className={style.userContainer}>
            <div className={style.usernameContainer}>
                <p>{currentChatUsername ? currentChatUsername : 'Loading..'}</p>
            </div>

            <div className={style.callItems}>
                <p>call</p>
                <p>video call</p>
            </div>
        </div>
    );
};

export default VideoCall;
