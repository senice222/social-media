import style from './Profile.module.scss'
import Layout from "../../layouts/Layout.tsx";
import {useGetMe} from "../../hooks/useGetMe.ts";

const Profile = () => {
    const { currentUser } = useGetMe()

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
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile