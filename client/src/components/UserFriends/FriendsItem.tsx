import {FC} from "react";
import style from './Friends.module.scss'
import {FriendsItemProps} from "../../interfaces/FriendsI.ts";
import {NavLink} from "react-router-dom";

const FriendsItem: FC<FriendsItemProps> = ({_id, username, avatar}) => {

    return (
        <div className={style.friendContainer}>
            <div className={style.friendItem}>
                <img src={`http://localhost:5000/${avatar}`} alt="/"/>
                <div className={style.textFriend}>
                    <h3 className={style.username}>
                        <NavLink to={`http://localhost:5173/profile/${_id}`}>{username}</NavLink>
                    </h3>
                    <div style={{display: 'flex', marginTop: '10px'}}>
                        <p className={style.textMessage}>Text message</p>
                        <p className={style.call}>Call</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendsItem;
