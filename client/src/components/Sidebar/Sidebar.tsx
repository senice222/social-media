import style from "./Sidebar.module.scss";
import {NavLink} from "react-router-dom";
import news from "../../assets/news.png";
import friends from "../../assets/friends.png";
import group from "../../assets/group.png";
import market from "../../assets/marketplace.png";
import watch from "../../assets/watch.png";
import {Children} from "../../interfaces/ProtectedRoute";
import Shortcuts from "../Shortcuts/Shortcuts";
import RightSidebar from "../RightSidebar/RightSidebar";

const Sidebar = ({children}: Children) => {
    return (
        <div className={style.container}>
            <div className={style.leftSideBar}>
                <div className={style.impLinks}>
                    <div>
                        <NavLink to={"/"}>
                            <img src={news} alt="/"/> Latest News
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to={"/"}>
                            <img src={friends} alt="/"/> Friends
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to={"/"}>
                            <img src={group} alt="/"/> Group
                        </NavLink>
                    </div>

                    <div>
                        <NavLink to={"/"}>
                            <img src={market} alt="/"/> marketplace
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to={"/"}>
                            <img src={watch} alt="/"/> Watch
                        </NavLink>
                    </div>
                    <NavLink className={style.lastChild} to={"/"}>
                        See more
                    </NavLink>
                </div>

                <Shortcuts/>
            </div>

            <div style={{width: "100%", marginRight: "15px"}}>{children}</div>

            <RightSidebar/>
        </div>
    );
};

export default Sidebar;
