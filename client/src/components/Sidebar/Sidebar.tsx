import style from './Sidebar.module.scss'
import {NavLink} from "react-router-dom";
import news from '../../assets/news.png'
import friends from '../../assets/friends.png'
import group from '../../assets/group.png'
import market from '../../assets/marketplace.png'
import watch from '../../assets/watch.png'

const Sidebar = () => {
    return (
        <div className={style.container}>

            <div className={style.leftSideBar}>
                <div className={style.impLinks}>
                    <div>
                        <NavLink to={'/'}>
                            <img src={news} alt="/"/> Latest News
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to={'/'}>
                            <img src={friends} alt="/"/> Friends
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to={'/'}>
                            <img src={group} alt="/"/> Group
                        </NavLink>
                    </div>

                    <div>
                        <NavLink to={'/'}>
                            <img src={market} alt="/"/> marketplace
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to={'/'}>
                            <img src={watch} alt="/"/> Watch
                        </NavLink>
                    </div>
                    <NavLink to={'/'}>See more</NavLink>
                </div>
            </div>

            <div className={style.mainContent}>content</div>
            <div className={style.rightSideBar}>right sidebar</div>
        </div>
    );
};

export default Sidebar;
