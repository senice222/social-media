import {FC, useRef} from 'react'
import style from "./Direct.module.scss";
import Layout from "../../layouts/Layout.tsx";
import Message from "../../components/Message/Message.tsx";
import ChatOnline from "../../components/ChatOnline/ChatOnline.tsx";
import { Fragment, KeyboardEvent, useEffect, useState } from "react";
import * as Api from "../../api/index.ts";
import { OneMessage } from "../../interfaces/Message.ts";
import {
  getMessages,
  getUserConv,
  setupSocket,
} from "../../utils/ChatUtils.ts";
import VideoCall from "../../components/VideoCall/VideoCall";
import Conversation from "../../components/Conversations/Conversation.tsx";
import { DirectProps } from "../../interfaces/Auth.ts";
import {Socket} from "socket.io-client";
import {SocketUser} from "../../interfaces/Chat.ts";
import {Conv} from '../../interfaces/Conversation.ts'

const Direct: FC<DirectProps> = ({user, isLoading}) => {
    const [conversation, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState<Conv>();
    const [messages, setMessages] = useState<OneMessage[]>([]);
    const [newMessage, setNewMessage] = useState<string>('')
    const [arrivalMessage, setArrivalMessage] = useState<any>()
    const [onlineUsers, setOnlineUsers] = useState<SocketUser[]>()
    // const scrollRef = useRef<HTMLDivElement | null>(null);
    const socket = useRef<Socket>()
    
    useEffect(() => {
        setupSocket(socket, setOnlineUsers, setArrivalMessage);
    }, []);

    useEffect(() => {
        if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
            setMessages((prev) => [...prev, arrivalMessage]);
        }
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        if (!isLoading) {
            socket.current?.emit('addUser', user?._id);
        }
    }, [user, isLoading]);

    useEffect(() => {
        getUserConv(setConversation)
    }, []);

    useEffect(() => {
        getMessages(currentChat, setMessages)
    }, [currentChat]);


    const handleSendMessage = async () => {
		const message = {
			conversationId: currentChat?._id,
			text: newMessage,
			sender: user?._id,
            senderAvatar: user?.avatar
		};
		const receiverId = currentChat?.members.find(
			(member) => member !== user?._id
		);

		if (message.text.trim() !== "") {
			socket.current?.emit("sendMessage", {
				senderId: user?._id,
				receiverId,
				text: newMessage,
			});
		}

		try {
			if (message.text.trim() !== "") {
				const data = await Api.messages.sendMessage(message);
				setMessages([...messages, data]);
				setNewMessage("");
			}
		} catch (e) {
			console.log(e);
		}
	};

    const handleTextareaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

  return (
    <Layout user={user}>
      <div className={style.directContainer}>
        <div className={style.chatMenuWrapper}>
          <input
            type="text"
            placeholder={"Search for friends"}
            className={style.chatMenuInput}
          />
          {conversation.map((conv, i: number) => (
            <div onClick={() => setCurrentChat(conv)} key={i}>
              <Conversation conversation={conv} currentUser={user} />
            </div>
          ))}
        </div>
        <div className={style.chatBoxWrapper}>
          {currentChat && (
            <VideoCall currentChat={currentChat} currentUser={user} />
          )}
          {currentChat ? (
            <>
              <div className={style.chatBoxTop}>
                {messages.map((m: OneMessage, i: number) => (
                  <Fragment key={i}>
                    <Message message={m} own={m.sender === user?._id} />
                  </Fragment>
                ))}
              </div>
              <div className={style.chatBoxBottom}>
                <textarea
                  className={style.chatMessageInput}
                  placeholder={"write something.."}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleTextareaKeyDown}
                ></textarea>
                <button
                  className={style.submitButton}
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className={style.noConversationText}>
              Open a conversation to start chat
            </span>
          )}
        </div>
        <div className={style.chatOnlineWrapper}>
          <div className={style.chatOnline}>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentUserId={user?._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Direct;
