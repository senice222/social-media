import style from './VideoCall.module.scss'
import {FC, useEffect, useRef, useState} from "react";
import {CurrentChatI} from "../../interfaces/Chat.ts";
import * as Api from '../../api/index.ts'

const VideoCall: FC<CurrentChatI> = ({currentChat, currentUser}) => {
    // const [ me, setMe ] = useState<string>("")
    // const [ stream, setStream ] = useState()
    // const [ receivingCall, setReceivingCall ] = useState<boolean>(false)
    // const [ caller, setCaller ] = useState<string>("")
    // const [ callerSignal, setCallerSignal ] = useState()
    // const [ callAccepted, setCallAccepted ] = useState<boolean>(false)
    // const [ idToCall, setIdToCall ] = useState<string>("")
    // const [ callEnded, setCallEnded] = useState<boolean>(false)
    // const [ name, setName ] = useState<string>("")
    const [currentChatUsername, setCurrentChatUsername] = useState<string>()

    // const myVideo = useRef()
    // const userVideo = useRef()
    // const connectionRef= useRef()
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
