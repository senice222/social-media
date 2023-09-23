import style from "./Shortcuts.module.scss";
import {NavLink} from "react-router-dom";
import shortcut1 from "../../assets/shortcut-1.png";
import shortcut2 from "../../assets/shortcut-2.png";
import shortcut3 from "../../assets/shortcut-3.png";
import shortcut4 from "../../assets/shortcut-4.png";

const Shortcuts = () => {
    return (
        <div className={style.shortCutLinks}>
            <h3>Your Shortcuts</h3>

            <div>
                <NavLink to={'/'}>
                    <img src={shortcut1} alt="/"/> Web developers
                </NavLink>
            </div>
            <div>
                <NavLink to={'/'}>
                    <img src={shortcut2} alt="/"/> Web Design course
                </NavLink>
            </div>
            <div>
                <NavLink to={'/'}>
                    <img src={shortcut3} alt="/"/> Full Stack development
                </NavLink>
            </div>
            <div>
                <NavLink to={'/'}>
                    <img src={shortcut4} alt="/"/> Website experts
                </NavLink>
            </div>
        </div>
    );
};

export default Shortcuts;
