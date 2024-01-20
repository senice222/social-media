import style from './Profile.module.scss'
import Layout from "../../layouts/Layout";
import {FC, useEffect, useState} from "react";
import {TABS, TABS_TYPE} from "../../utils/getTab";
import userAvatar from "../../assets/user.png"
import {User, UserProps} from '../../interfaces/Auth'
import {useLocation} from "react-router-dom";
import * as Api from '../../api/index'
import {Button, Spin} from "antd";

const Profile: FC<UserProps> = ({user}) => {
    const [currentTab, setCurrentTab] = useState<TABS_TYPE>('posts')
    const [profileUser, setProfileUser] = useState<User>();
    const [loading, setLoading] = useState<boolean>(true);
    const location = useLocation()
    const currentId = location.pathname.split('/')[2]
    const TabView: FC<UserProps> = TABS[currentTab];
    const isActivePosts = currentTab === 'posts'
    const isActiveFriends = currentTab === 'friends'
    const isCurrentUserProfile = currentId === user?._id
    const isUserAlreadyIncludes = profileUser?.friends.some(item => item._id === user?._id);
    const shouldShowAddFriendButton = !isCurrentUserProfile && !isUserAlreadyIncludes;

    useEffect(() => {
        if (location) {
            const getUser = async () => {
                try {
                    const data = await Api.user.getUserById(currentId);
                    setProfileUser(data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching user:", error);
                    setLoading(false);
                }
            };

            getUser();
        }
    }, [location, currentId]);

    return (
        <Layout user={user}>
            {loading ? (
                <div className={style.profileContainer}>
                    <div className={`${style.profile} ${style.loadingDiv}`}>
                        <Spin />
                    </div>
                </div>

            ) : (
                <>
                    <div className={style.profileContainer}>
                        <div className={style.profile}>
                            <div className={style.userInfo}>
                                <img
                                    src={profileUser?.avatar ? `http://localhost:5000/${profileUser?.avatar}` : userAvatar}
                                    className={style.userAvatar}
                                    alt="/"
                                />
                                <h3>{profileUser?.username}</h3>
                                <div className={style.currentFriends}>
                                    {
                                        profileUser ? (
                                            <>
                                                {shouldShowAddFriendButton && (
                                                    <Button>Add friend</Button>
                                                )}

                                                {!isCurrentUserProfile && (
                                                    <Button>Delete friend</Button>
                                                )}
                                            </>
                                        ) : (
                                            <p>loading</p>
                                        )
                                    }
                                    <p><strong>{profileUser?.createdPosts.length}</strong> posts</p>
                                    <p><strong>{profileUser?.friends.length}</strong> friends</p>
                                </div>
                            </div>
                            <div className={style.friendsOrPostsContainer}>
                                <div className={isActivePosts ? style.active : style.publications}
                                     onClick={() => setCurrentTab('posts')}>
                                    <p>POSTS</p>
                                </div>
                                <div className={isActiveFriends ? style.active : style.friends}
                                     onClick={() => setCurrentTab('friends')}>
                                    <p>FRIENDS</p>
                                </div>
                            </div>
                            <TabView user={profileUser}/>
                        </div>
                    </div>
                </>
            )}
        </Layout>
    );
}

export default Profile  