import {FC} from "react";
import style from './Friends.module.scss'
import {FriendsItemProps} from "../../interfaces/FriendsI.ts";

const FriendsItem: FC<FriendsItemProps> = ({username, avatar}) => {

    return (
        <div className={style.friendContainer}>
            <img src={`http://localhost:5000/${avatar}`} alt="/"/>
            <h3>{username}</h3>
        </div>
    );
};

export default FriendsItem;
