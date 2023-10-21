import style from './Conversation.module.scss'

const Conversation = () => {
    return (
        <div className={style.conversation}>
            <img src="https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp" alt="/" className={style.conversationImg}/>
            <span className={style.conversationName}>John Doe</span>
        </div>
    );
};

export default Conversation;
