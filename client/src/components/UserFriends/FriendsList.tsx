import {Fragment} from "react";
import FriendsItem from "./FriendsItem.tsx";
import {useParams} from "react-router-dom";
import {useGetUserById} from "../../hooks/useGetUserById.ts";

const FriendsList = () => {
    const {id} = useParams()
    const {user} = id ? useGetUserById(id) : { user: null };

    return (
        <>
            {user?.friends?.length > 0 ? (
                user?.friends.map((item, i) => (
                    <Fragment key={i}>
                        <FriendsItem
                            _id={item._id}
                            username={item.username}
                            avatar={item.avatar}
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
