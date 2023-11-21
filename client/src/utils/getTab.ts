import {FC} from "react";
import UserPosts from "../components/UserPosts/UserPosts.tsx";
import FriendsList from "../components/UserFriends/FriendsList.tsx";

export type TABS_TYPE = 'posts' | 'friends'

export const TABS: Record<TABS_TYPE, FC> = {
    posts: UserPosts,
    friends: FriendsList    
}
