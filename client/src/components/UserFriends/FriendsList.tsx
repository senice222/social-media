import {useEffect, useState} from "react";
import {User} from "../../interfaces/AuthI.ts";
import * as Api from '../../api/'
import FriendsItem from "./FriendsItem.tsx";

const FriendsList = () => {
    const [friends, setFriends] = useState<User[]>()

    useEffect(() => {
       const getUserFriends = async () => {
           const data = await Api.friends.getAllUserFriends()
           setFriends(data)
       }

       getUserFriends()
    }, [])

    return (
        <>
            {
                friends ? (
                    friends.map(item => (
                        <>
                            <FriendsItem
                                username={item.username}
                                avatar={item.avatar}
                            />
                        </>
                    ))
                ) : (
                    <div>
                        <p>No friends yet</p>
                    </div>
                )
            }
        </>
    );
};

export default FriendsList;
