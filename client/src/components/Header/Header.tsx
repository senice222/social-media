import style from './Header.module.scss'
import {Input} from 'antd';
import facebook from '../../assets/2021_Facebook_icon.svg.png'
import msg from '../../assets/icons8-message-50.png'
import not from '../../assets/icons8-notification-48.png'
import {NavLink, useLocation} from "react-router-dom";
import {useGetMe} from "../../hooks/useGetMe.ts";
import PendingFriendsList from "../PendingFriends/PendingFriendsList.tsx";
import {useState} from "react";

const Header = () => {
    const {Search} = Input;
    const location = useLocation()
    const [isActive, setIsActive] = useState<boolean>(false);
    const { currentUser } = useGetMe()
    const onSearch = (value: string) => console.log(value);

    // 3. логику принянятия запроса и отклонения и ререндер с помощью SWR

    return (
        <div className={style.headerContainer}>
            <nav className={style.header}>
                <div className={style.leftContainer}>
                    <img src={facebook} className={style.img} alt="/" />
                    <Search
                        className={style.search}
                        placeholder="Input search text"
                        onSearch={onSearch}
                        enterButton
                    />
                </div>
                <div className={style.middleContainer}>
                    <div className={style.links}>
                        <NavLink
                            className={location.pathname === '/' ? style.active : style.link}
                            to={'/'}
                        >
                            <p>Home</p>
                        </NavLink>
                        <NavLink
                            className={
                                location.pathname === `/profile/${currentUser?._id}` ? style.active : style.link
                            }
                            to={`/profile/${currentUser?._id}`}
                        >
                            <p>Profile</p>
                        </NavLink>
                    </div>
                </div>
                <div className={style.rightContainer}>
                    <div className={style.msgCircle}>
                        <img src={msg} alt="/" className={style.msg} />
                    </div>
                    <div className={style.msgCircle} onClick={() => setIsActive(prev => !prev)}>
                        <img src={not} alt="/" className={style.msg} />
                    </div>
                    <img src={`http://localhost:5000/${currentUser?.avatar}`} alt="/" className={style.user} />
                </div>

                {isActive && <PendingFriendsList/>}
            </nav>
        </div>
    );
};

export default Header;
