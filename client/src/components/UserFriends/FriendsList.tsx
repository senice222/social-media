import {Fragment, useEffect, useState} from "react";
import FriendsItem from "./FriendsItem.tsx";
import {getUserConv} from "../../utils/ChatUtils.ts";
import { HeaderProps } from "../../interfaces/Auth.ts";

const FriendsList = ({user}: HeaderProps) => {
    const [conversation, setConversation] = useState([])

    useEffect(() => {
        getUserConv(setConversation)
    }, []);

    return (
        <>
            {user?.friends.length ? (
                user?.friends.map((item, i) => (
                    <Fragment key={i}>
                        <FriendsItem
                            _id={item._id}
                            username={item.username}
                            avatar={item.avatar}
                            userConversations={conversation}
                        />
                    </Fragment>
                ))
            ) : (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <p>No friends yet</p>
                </div>
            )}
        </>

    );
};

export default FriendsList;
