import style from './Message.module.scss'

// <div className={`${style.message} ${style.own}`}>

const Message = ({own}: {own?: boolean}) => {
    return (
        <div className={own ? `${style.message} ${style.own}` : `${style.message}`}>
            <div className={style.messageTop}>
                <img src="https://platinumlist.net/guide/wp-content/uploads/2023/03/IMG-worlds-of-adventure.webp" alt="" className={style.messageImg}/>
                <p className={style.messageText}>message</p>
            </div>
            <div className={style.messageBottom}>1 hour ago</div>
        </div>
    );
};

export default Message;
