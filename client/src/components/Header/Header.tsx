import style from './Header.module.scss'
import { Input } from 'antd';
import facebook from '../../assets/2021_Facebook_icon.svg.png'
import home from '../../assets/icons8-home-50.png'
import friends from '../../assets/icons8-friends-50.png'

const Header = () => {
    const { Search } = Input;

    const onSearch = (value: string) => console.log(value);


    return (
        <div className={style.container}>
            <div className={style.leftContainer}>
                <img src={facebook} className={style.img} alt="/"/>
                <Search className={style.search} placeholder="input search text" onSearch={onSearch} enterButton />

            </div>
            <div className={style.middleContainer}>
                <div className={style.icons}>
                    <div className={style.homeDiv}>
                        <img src={home} className={style.home} alt="/"/>
                    </div>
                    <div className={style.friendsDiv}>
                        <img src={friends} className={style.friends} alt="/"/>
                    </div>

                </div>
            </div>
            <div className={style.rightContainer}>
                3
            </div>
        </div>
    );
};

export default Header;
