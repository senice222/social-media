import style from './PendingFriends.module.scss'
import {useFriendsPendingRequests} from "../../hooks/useFriendsPendingRequests.ts";
import {useGetMe} from "../../hooks/useGetMe.ts";
import PendingFriendsItem from "./PendingFriendsItem.tsx";
import {FriendRequest} from "../../interfaces/FriendsI.ts";
import {useEffect, useState} from "react";

const PendingFriendsList = () => {
    const {currentUser} = useGetMe()
    const {friends} = useFriendsPendingRequests(currentUser?._id ? currentUser._id : '')
    const [friendsState, setFriendsState] = useState<FriendRequest[]>()

    useEffect(() => {
        setFriendsState(friends)
    }, [friends]);

    return (
        <div className={style.settingMenu}>
            {friendsState ? friendsState.map((friend: FriendRequest, i: number) => (
                <PendingFriendsItem
                    key={i}
                    username={friend.fromUser.username}
                    avatar={friend.fromUser.avatar}
                    requestId={friend._id}
                    setFriendsState={setFriendsState}
                />
            )): (
                <div>
                    Loading...
                </div>
            )}
        </div>
    );
};

export default PendingFriendsList;
