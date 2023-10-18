import style from "./PendingFriends.module.scss";
import {Button} from "antd";
import {FC} from "react";
import {PendingFriendsItemProps} from "../../interfaces/FriendsI.ts";
import * as Api from '../../api/index.ts'

const PendingFriendsItem: FC<PendingFriendsItemProps> = ({setFriendsState, requestId, username, avatar}) => {

    const handleAccept = async () => {
        try {
            await Api.friends.acceptUserRequest(requestId);
            setFriendsState(prevFriends => prevFriends?.filter((friend) => friend._id !== requestId));
        } catch (e) {
            console.log(e);
        }
    }

    const handleReject = async () => {
        try {
            await Api.friends.rejectUserRequest(requestId)
            setFriendsState(prevFriends => prevFriends?.filter((friend) => friend._id !== requestId));
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={style.userProfile}>
            <img src={`http://localhost:5000/${avatar}`} className={style.img} alt={'/'}/>
            <div className={style.user}>
                <h3>{username}</h3>
                <p>Friend request</p>
            </div>
            <div className={style.btnsContainer}>
                <Button type="primary" className={style.btnAccept} onClick={handleAccept}>Accept</Button>
                <Button type="primary" danger className={style.btnDecline} onClick={handleReject}>Decline</Button>
            </div>

            <div className={style.line}/>
        </div>
    );
};

export default PendingFriendsItem;
