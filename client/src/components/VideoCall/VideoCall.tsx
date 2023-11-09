import './VideoCall.scss'
import {FC, useEffect, useRef, useState} from "react";
import {CurrentChatI} from "../../interfaces/Chat.ts";
import * as Api from '../../api/index.ts'
import {CopyToClipboard} from "react-copy-to-clipboard"
import Peer, {Instance} from "simple-peer"
import {io, Socket} from "socket.io-client";
import {TextField} from "@mui/material";
import {IconButton} from "@mui/material";
import {Button} from '@mui/material'
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import AssignmentIcon from '@mui/icons-material/Assignment';

const VideoCall: FC<CurrentChatI> = ({currentChat, currentUser}) => {
    const [me, setMe] = useState<string>("")
    const [stream, setStream] = useState<MediaStream>()
    const [receivingCall, setReceivingCall] = useState<boolean>(false)
    const [caller, setCaller] = useState<string>("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState<boolean>(false)
    const [idToCall, setIdToCall] = useState<string>("")
    const [callEnded, setCallEnded] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [currentChatUsername, setCurrentChatUsername] = useState<string>()
    const myVideo = useRef<HTMLVideoElement | null>(null);
    const userVideo = useRef<HTMLVideoElement | null>()
    const connectionRef = useRef<Instance | null>(null);
    const friendId = currentChat?.members.filter(user => user !== currentUser?._id).toString()
    const socket: Socket = io('http://localhost:5001');

    useEffect(() => {
        const getUserById = async () => {
            if (friendId) {
                const data = await Api.user.getUserById(friendId)
                setCurrentChatUsername(data.username)
            }
        }
        getUserById()
    }, [currentChat])

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
            .then((stream) => {
                setStream(stream);
                if (myVideo.current) {
                    myVideo.current.srcObject = stream;
                }
            })
            .catch((error) => {
                console.error("Error accessing media devices:", error);
            });

        socket.on("me", (id: string) => {
            setMe(id)
        })

        socket.on("callUser", (data: any) => {
            setReceivingCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        })

    }, [])

    const callUser = (id: string) => {
        try {
            console.log("Initializing Peer...");
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream
            });

            console.log("Peer initialized:", peer);

            peer.on("signal", (data) => {
                console.log("Sending signal data...");
                socket.emit("callUser", {
                    userToCall: id,
                    signalData: data,
                    from: me,
                    name: name
                });
            });

            peer.on("stream", (stream) => {
                console.log("Receiving stream...");
                if (userVideo.current) {
                    userVideo.current.srcObject = stream;
                }
            });

            socket.on("callAccepted", (signal) => {
                console.log("Call accepted. Signaling peer...");
                setCallAccepted(true);
                peer.signal(signal);
            });

            connectionRef.current = peer;
        } catch (error) {
            console.error("Error in callUser:", error);
        }
    };


    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })

        peer.on("signal", (data: any) => {
            socket.emit("answerCall", {signal: data, to: caller})
        })
    }

    const leaveCall = () => {
        setCallEnded(true)
        if (connectionRef.current) {
            connectionRef.current.destroy()
        }
    }

    return (
        // <div className={style.userContainer}>
        //     <div className={style.usernameContainer}>
        //         <p>{currentChatUsername ? currentChatUsername : 'Loading..'}</p>
        //     </div>
        //
        //     <div className={style.callItems}>
        //         <p>call</p>
        //         <p>video call</p>
        //     </div>
        // </div>

        <>
            <h1 style={{textAlign: "center", color: 'black'}}>Zoomish</h1>
            <div className="container">
                <div className="video-container">
                    <div className="video">
                        {stream && <video playsInline muted ref={myVideo} autoPlay style={{width: "300px"}}/>}
                    </div>
                    <div className="video">
                        {callAccepted && !callEnded ?
                            <video playsInline ref={userVideo} autoPlay style={{width: "300px"}}/> :
                            null}
                    </div>
                </div>
                <div className="myId">
                    <TextField
                        id="filled-basic"
                        label="Name"
                        variant="filled"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{marginBottom: "20px"}}
                    />
                    <CopyToClipboard text={me} style={{marginBottom: "2rem"}}>
                        <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large"/>}>
                            Copy ID
                        </Button>
                    </CopyToClipboard>

                    <TextField
                        id="filled-basic"
                        label="ID to call"
                        variant="filled"
                        value={idToCall}
                        onChange={(e) => setIdToCall(e.target.value)}
                    />
                    <div className="call-button">
                        {callAccepted && !callEnded ? (
                            <Button variant="contained" color="secondary" onClick={leaveCall}>
                                End Call
                            </Button>
                        ) : (
                            <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
                                <PhoneEnabledIcon fontSize="large"/>
                            </IconButton>
                        )}
                        {idToCall}
                    </div>
                </div>
                <div>
                    {receivingCall && !callAccepted ? (
                        <div className="caller">
                            <h1>{name} is calling...</h1>
                            <Button variant="contained" color="primary" onClick={answerCall}>
                                Answer
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default VideoCall;
