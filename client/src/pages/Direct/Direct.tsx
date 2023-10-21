import style from './Direct.module.scss'
import Layout from "../../layouts/Layout.tsx";
import ConversationItem from "../../components/Conversations/ConversationItem.tsx";
import Message from "../../components/Message/Message.tsx";

const Direct = () => {

    return (
        <Layout>
            <div className={style.directContainer}>
                <div className={style.chatMenuWrapper}>
                    <input type="text" placeholder={'Search for friends'} className={style.chatMenuInput}/>
                    <ConversationItem />
                    <ConversationItem />
                    <ConversationItem />
                </div>
                <div className={style.chatBoxWrapper}>
                    <div className={style.chatBoxTop}>
                        <Message />
                        <Message own={true}/>
                        <Message />
                    </div>
                    <div className={style.chatBoxBottom}>
                        <textarea className={style.chatMessageInput} placeholder={'write something..'}></textarea>
                        <button className={style.submitButton}>Send</button>
                    </div>
                </div>
                <div className={style.chatOnlineWrapper}>
                    <div className={style.chatOnline}>online</div>
                </div>
            </div>
        </Layout>
    );
};

export default Direct;
