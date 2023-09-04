import style from './Sidebar.module.scss'
import {NavLink} from "react-router-dom";
import news from '../../assets/news.png'
import friends from '../../assets/friends.png'
import group from '../../assets/group.png'
import market from '../../assets/marketplace.png'
import watch from '../../assets/watch.png'
import shortcut1 from '../../assets/shortcut-1.png'
import shortcut2 from '../../assets/shortcut-2.png'
import shortcut3 from '../../assets/shortcut-3.png'
import shortcut4 from '../../assets/shortcut-4.png'



import ContentList from "../Content/ContentList.tsx";

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
                    <NavLink className={style.lastChild} to={'/'}>See more</NavLink>
                </div>

                <div className={style.shortCutLinks}>
                    <p>Your Shortcuts</p>
                    <NavLink to={'/'}>
                        <img src={shortcut1} alt="/"/> Web developers
                    </NavLink>

                    <NavLink to={'/'}>
                        <img src={shortcut2} alt="/"/> Web Design course
                    </NavLink>

                    <NavLink to={'/'}>
                        <img src={shortcut3} alt="/"/> Full Stack development
                    </NavLink>

                    <NavLink to={'/'}>
                        <img src={shortcut4} alt="/"/> Website experts
                    </NavLink>
                </div>

            </div>

            <div className={style.mainContent}>
                <ContentList />
            </div>

            <div className={style.rightSideBar}>right sidebar</div>
        </div>
    );
};

export default Sidebar;
