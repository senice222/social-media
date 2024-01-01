import {FC} from "react";
import UserPosts from "../components/UserPosts/UserPosts";
import FriendsList from "../components/UserFriends/FriendsList";

export type TABS_TYPE = 'posts' | 'friends'

export const TABS: Record<TABS_TYPE, FC> = {
    posts: UserPosts,
    friends: FriendsList    
}
