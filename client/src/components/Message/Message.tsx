import style from './Message.module.scss'
import {FC} from "react";
import {MessagePropsI} from "../../interfaces/Message.ts";
import {format} from 'timeago.js'

const Message:FC<MessagePropsI> = ({message, own}) => {
    return (
        <div className={own ? `${style.message} ${style.own}` : `${style.message}`}>
            <div className={style.messageTop}>
                <img src="https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp" alt="" className={style.messageImg}/>
                <p className={style.messageText}>{message.text}</p>
            </div>
            <div className={style.messageBottom}>{format(message.createdAt)}</div>
        </div>
    );
};

export default Message;
