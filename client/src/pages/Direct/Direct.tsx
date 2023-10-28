import style from './Direct.module.scss'
import Layout from "../../layouts/Layout.tsx";
import Message from "../../components/Message/Message.tsx";
import ChatOnline from "../../components/ChatOnline/ChatOnline.tsx";
import {Fragment, useEffect, useRef, useState} from "react";
import * as Api from '../../api/index.ts'
import Conversation from "../../components/Conversations/Conversation.tsx";
import {useGetMe} from "../../hooks/useGetMe.ts";
import {ConversationI} from "../../interfaces/ConversationI.ts";
import {MessageI} from "../../interfaces/Message.ts";
import {io, Socket} from "socket.io-client";


const Direct = () => {
    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState<ConversationI>();
    const [messages, setMessages] = useState<MessageI[]>([]);
    const [newMessage, setNewMessage] = useState<string>('')
    const [arrivalMessage, setArrivalMessage] = useState<any>(null)
    const {currentUser, isLoading} = useGetMe()
    // const scrollRef = useRef<HTMLDivElement | null>(null);
    const socket = useRef<Socket>()

    useEffect(() => {
        socket.current = io('ws://localhost:5001')
        socket.current.on("getUsers", (users) => {
            console.log(users)
        });
        socket.current?.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text
            })
        })
    }, []);

    useEffect(() => {
        arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);

    }, [arrivalMessage, currentChat]);


    useEffect(() => {
        if (!isLoading) {
            socket.current?.emit('addUser', currentUser?._id);
        }
    }, [currentUser, isLoading]);

    useEffect(() => {
        const getUserConv = async () => {
            try {
                const data = await Api.conversation.getUserConversations()
                setConversation(data)
            } catch (e) {
                console.log(e)
            }
        }
        getUserConv()
    }, []);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const data = await Api.messages.getMessages(currentChat ? currentChat._id : '')
                setMessages(data)
            } catch (e) {
                console.log(e)
            }
        }
        getMessages()
    }, [currentChat]);


    const handleSendMessage = async () => {

        const message = {
            conversationId: currentChat?._id,
            text: newMessage,
            sender: currentUser?._id
        }
        const receiverId = currentChat?.members.find(user => user !== currentUser?._id)

        if (message.text.trim() !== '') {
            socket.current?.emit("sendMessage", {
                senderId: currentUser?._id,
                receiverId,
                text: newMessage
            })
        }
        try {
            if (message.text.trim() !== '') {
                const data = await Api.messages.sendMessage(message)
                setMessages([...messages, data])
                setNewMessage('')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleTextareaKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevents the textarea from adding a newline
            handleSendMessage();
        }
    };

    return (
        <Layout>
            <div className={style.directContainer}>
                <div className={style.chatMenuWrapper}>
                    <input type="text" placeholder={'Search for friends'} className={style.chatMenuInput}/>
                    {conversation.map((conv, i: number) => (
                        <div onClick={() => setCurrentChat(conv)} key={i}>
                            <Conversation
                                conversation={conv}
                                currentUser={currentUser}
                            />
                        </div>
                    ))}
                </div>
                <div className={style.chatBoxWrapper}>
                    {
                        currentChat ? (
                            <>
                                <div className={style.chatBoxTop}>
                                    {
                                        messages.map((m: MessageI, i: number) => (
                                            <Fragment key={i}>
                                                <Message
                                                    message={m}
                                                    own={m.sender === currentUser?._id}
                                                />
                                            </Fragment>
                                        ))
                                    }
                                </div>
                                <div className={style.chatBoxBottom}>
                                    <textarea
                                        className={style.chatMessageInput}
                                        placeholder={'write something..'}
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={handleTextareaKeyDown}
                                    >

                                    </textarea>
                                    <button className={style.submitButton}
                                            onClick={handleSendMessage}
                                    >
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : <span className={style.noConversationText}>Open a conversation to start chat</span>
                    }
                </div>
                <div className={style.chatOnlineWrapper}>
                    <div className={style.chatOnline}>
                        <ChatOnline/>
                        <ChatOnline/>
                        <ChatOnline/>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Direct