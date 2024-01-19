import style from './Profile.module.scss'
import Layout from "../../layouts/Layout";
import {FC, useEffect, useState} from "react";
import {TABS, TABS_TYPE} from "../../utils/getTab";
import userAvatar from "../../assets/user.png"
import {User, UserProps} from '../../interfaces/Auth'
import {useLocation} from "react-router-dom";
import * as Api from '../../api/index'
// {user}
const Profile: FC<UserProps> = () => {
    const [currentTab, setCurrentTab] = useState<TABS_TYPE>('posts')
    const [user, setUser] = useState<User>();
    const location = useLocation()
    const TabView: FC<UserProps> = TABS[currentTab];
    const isActivePosts = currentTab === 'posts'
    const isActiveFriends = currentTab === 'friends'
    const currentId = location.pathname.split('/')[2]

    useEffect(() => {
        if (location) {
            const getUser = async () => {
                const data = await Api.user.getUserById(currentId)
                setUser(data)
            }
            getUser()
        }
    }, [location])

    return (
        <Layout user={user}>
            <div className={style.profileContainer}>
                <div className={style.profile}>
                    <div className={style.userInfo}>
                        <img src={user?.avatar ? `http://localhost:5000/${user?.avatar}` : userAvatar}
                             className={style.userAvatar}
                             alt="/"
                        />
                        <h3>{user?.username}</h3>
                        <div className={style.currentFriends}>
                            <p><strong>{user?.createdPosts.length}</strong> posts</p>
                            <p><strong>{user?.friends.length}</strong> friends</p>
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
                    <TabView user={user}/>
                </div>
            </div>
        </Layout>
    )
}

export default Profile  