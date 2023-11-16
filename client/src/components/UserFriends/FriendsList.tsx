import {Fragment, useEffect, useState} from "react";
import FriendsItem from "./FriendsItem.tsx";
import {useParams} from "react-router-dom";
import {useGetUserById} from "../../hooks/useGetUserById.ts";
import {getMessages, getUserConv, setupSocket} from "../../utils/ChatUtils.ts";

const FriendsList = () => {
    const {id} = useParams()
    const [conversation, setConversation] = useState([])
    const {user} = id ? useGetUserById(id) : { user: null };

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
