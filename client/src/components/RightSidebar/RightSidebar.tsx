import style from './RightSidebar.module.scss'
import {NavLink} from "react-router-dom";

const RightSidebar = () => {
    return (
        <div className={style.rightSidebar}>
            <div className={style.sideBarTitle}>
                <h4>Conversations</h4>
                <NavLink to={'/'}>See All</NavLink>
            </div>

            <div className={style.event}>
                <div className={style.leftEvent}>
                    <h3>18</h3>
                    <span>March</span>
                </div>

                <div className={style.rightEvent}>
                    <h4>Social Media</h4>
                    <p>Willson Tech Park</p>
                    <NavLink to={'/'}>More info</NavLink>
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;
