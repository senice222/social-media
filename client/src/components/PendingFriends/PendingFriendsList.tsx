import style from "./PendingFriends.module.scss";
import {useFriendsPendingRequests} from "../../hooks/useFriendsPendingRequests";
import PendingFriendsItem from "./PendingFriendsItem";
import {FriendRequest} from "../../interfaces/Friends";
import {FC, useEffect, useState} from "react";
import {HeaderProps} from '../../interfaces/Auth'

const PendingFriendsList: FC<HeaderProps> = ({user}) => {
    const {friends} = useFriendsPendingRequests(user?._id ? user._id : "");
    const [friendsState, setFriendsState] = useState<FriendRequest[]>();

    useEffect(() => {
        setFriendsState(friends);
    }, [friends]);

    return (
        <div className={style.settingMenu}>
            {friendsState ? (
                friendsState.map((friend: FriendRequest, i: number) => (
                    <PendingFriendsItem
                        key={i}
                        username={friend.fromUser.username}
                        avatar={friend.fromUser.avatar}
                        requestId={friend._id}
                        setFriendsState={setFriendsState}
                    />
                ))
            ) : (
                <div className={style.center}>
                    Loading...
                </div>
            )}
            {friends && friends.length === 0 && (
                <div className={style.noFriends}>
                    <p>You don't have any friends requests</p>
                </div>
            )}
        </div>
    );
};

export default PendingFriendsList;
