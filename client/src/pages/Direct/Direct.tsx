import style from './Direct.module.scss'
import Layout from "../../layouts/Layout.tsx";
import Message from "../../components/Message/Message.tsx";
import ChatOnline from "../../components/ChatOnline/ChatOnline.tsx";
import {useEffect, useState} from "react";
import * as Api from '../../api/index.ts'
import Conversation from "../../components/Conversations/Conversation.tsx";
import {useGetMe} from "../../hooks/useGetMe.ts";
import {ConversationI} from "../../interfaces/ConversationI.ts";
import {MessageI} from "../../interfaces/Message.ts";

const Direct = () => {
    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState<ConversationI>();
    const [messages, setMessages] = useState([]);
    const {currentUser} = useGetMe()

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

    return (
        <Layout>
            <div className={style.directContainer}>
                <div className={style.chatMenuWrapper}>
                    <input type="text" placeholder={'Search for friends'} className={style.chatMenuInput}/>
                    {conversation.map(conv => (
                        <div onClick={() => setCurrentChat(conv)}>
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
                                        messages.map((m: MessageI) => (
                                            <Message
                                                message={m}
                                                own={m.sender === currentUser?._id}
                                            />
                                        ))
                                    }
                                </div>
                                <div className={style.chatBoxBottom}>
                                    <textarea className={style.chatMessageInput} placeholder={'write something..'}></textarea>
                                    <button className={style.submitButton}>Send</button>
                                </div>
                            </>
                        ) : <span className={style.noConversationText}>Open a conversation to start chat</span>
                    }
                </div>
                <div className={style.chatOnlineWrapper}>
                    <div className={style.chatOnline}>
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Direct