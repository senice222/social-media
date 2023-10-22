import style from './ChatOnline.module.scss'

const ChatOnline = () => {
    return (
        <div className={style.chatOnline}>
            <div className={style.chatOnlineFriend}>
                <div className={style.chatOnlineImgContainer}>
                    <img src="https://static.thenounproject.com/png/4035887-200.png" alt="/"/>
                    <div className={style.chatOnlineBadge}></div>
                </div>
                <span className={style.chatOnlineName}>John Doe</span>
            </div>
        </div>
    );
};

export default ChatOnline;
