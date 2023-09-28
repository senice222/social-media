import style from './Footer.module.scss'
import {NavLink} from "react-router-dom";
const Footer = () => {

    return (
        <footer>
            <div className={style.line}/>
            <div className={style.footerContent}>
                <div className={style.footerSection}>
                    <h3>Contact</h3>
                    <p>Phone: 123-456-7890</p>
                    <p>Email: info@example.com</p>
                    <p>Address: 123 Main St, City, Country</p>
                </div>
                <div className={style.footerSection}>
                    <h3>Quick Links</h3>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/">About Us</NavLink></li>
                        <li><NavLink to="/">Contact</NavLink></li>
                    </ul>
                </div>
                <div className={style.footerSection}>
                    <h3>Follow us</h3>
                    <ul className={style.socialMedia}>

                    </ul>
                </div>
            </div>
            <div className={style.footerBottom}>
                <p>&copy; 2023 Your Company. All rights reserved.</p>
            </div>
        </footer>

    );
};

export default Footer;
