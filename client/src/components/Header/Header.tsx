import style from './Header.module.scss'
import {Input} from 'antd';
import facebook from '../../assets/2021_Facebook_icon.svg.png'
import msg from '../../assets/icons8-message-50.png'
import not from '../../assets/icons8-notification-48.png'
import {NavLink, useLocation} from "react-router-dom";
import {useGetMe} from "../../hooks/useGetMe.ts";

const Header = () => {
    const {Search} = Input;
    const location = useLocation()
    const onSearch = (value: string) => console.log(value);
    const { currentUser } = useGetMe()

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
                                location.pathname === '/friends' ? style.active : style.link
                            }
                            to={'/friends'}
                        >
                            <p>Friends</p>
                        </NavLink>
                        <NavLink
                            className={
                                location.pathname === '/profile' ? style.active : style.link
                            }
                            to={'/profile'}
                        >
                            <p>Profile</p>
                        </NavLink>
                    </div>
                </div>
                <div className={style.rightContainer}>
                    <div className={style.msgCircle}>
                        <img src={msg} alt="/" className={style.msg} />
                    </div>
                    <div className={style.msgCircle}>
                        <img src={not} alt="/" className={style.msg} />
                    </div>
                    <img src={`http://localhost:5000/${currentUser?.avatar}`} alt="/" className={style.user} />
                </div>
            </nav>
        </div>
    );
};

export default Header;
