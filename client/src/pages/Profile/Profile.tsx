import style from './Profile.module.scss'
import Layout from "../../layouts/Layout.tsx";
import {useGetMe} from "../../hooks/useGetMe.ts";
import {FC, useState} from "react";
import {TABS, TABS_TYPE} from "../../utils/getTab.ts";

const Profile: FC = () => {
    const { currentUser } = useGetMe()
    const [currentTab, setCurrentTab] = useState<TABS_TYPE>('posts')
    const TabView = TABS[currentTab]
    const isActivePosts = currentTab === 'posts'
    const isActiveFriends = currentTab === 'friends'

    return (
        <Layout>
            <div className={style.profileContainer}>
                <div className={style.profile}>
                    <div className={style.userInfo}>
                        <img src={`http://localhost:5000/${currentUser?.avatar}`}
                             className={style.userAvatar}
                             alt="/"
                        />
                        <h3>{currentUser?.username}</h3>
                        <div className={style.currentFriends}>
                            <p><strong>0</strong> публикаций</p>
                            <p><strong>66 </strong> подписчиков</p>
                            <p><strong>42</strong> подписок</p>
                        </div>
                    </div>
                    <div className={style.friendsOrPostsContainer}>
                        <div className={isActivePosts ? style.active : style.publications} onClick={() => setCurrentTab('posts')}>
                            <p>POSTS</p>
                        </div>
                        <div className={isActiveFriends ? style.active : style.friends} onClick={() => setCurrentTab('friends')}>
                            <p>FRIENDS</p>
                        </div>
                    </div>
                    <TabView />
                </div>
            </div>
        </Layout>
    )
}

export default Profile