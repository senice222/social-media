import {FC} from 'react'
import style from './Header.module.scss'
import {Input} from 'antd';
import facebook from '../../assets/2021_Facebook_icon.svg.png'
import not from '../../assets/icons8-notification-48.png'
import {NavLink, useLocation} from "react-router-dom";
import PendingFriendsList from "../PendingFriends/PendingFriendsList.tsx";
import {useState} from "react";
import userAvatar from "../../assets/user.png"
import {HeaderProps} from '../../interfaces/Auth.ts'

const Header: FC<HeaderProps> = ({user}) => {
    const {Search} = Input;
    const location = useLocation()
    const [isActive, setIsActive] = useState<boolean>(false);
    const onSearch = (value: string) => console.log(value);

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
                                location.pathname === '/direct' ? style.active : style.link
                            }
                            to={`/direct`}
                        >
                            <p>Direct</p>
                        </NavLink>
                        <NavLink
                            className={
                                location.pathname === `/profile/${user?._id}` ? style.active : style.link
                            }
                            to={`/profile/${user?._id}`}
                        >
                            <p>Profile</p>
                        </NavLink>
                    </div>
                </div>
                <div className={style.rightContainer}>
                    <div className={style.msgCircle} onClick={() => setIsActive(prev => !prev)}>
                        <img src={not} alt="/" className={style.msg} />
                    </div>
                    <img src={user?.avatar ? `http://localhost:5000/${user?.avatar}` : userAvatar} alt="/" className={style.user} />
                </div>

                {isActive && <PendingFriendsList user={user}/>}
            </nav>
        </div>
    );
};

export default Header;
