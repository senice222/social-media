import style from './UserPosts.module.scss'
import {FC} from "react";
import {UserProps} from "../../interfaces/Auth";

const UserPosts: FC<UserProps> = ({user}) => {


    return (
        <div className={style.postsContainer}>
            <div className={style.imgList}>
                {
                    user ? (
                        user.createdPosts.map((item, i) => (
                            <img key={i} src={`http://localhost:5000/${item.urls[0]}`} alt="/"/>
                        ))
                    ) : (
                        <div className={style.loading}>loading</div>
                    )
                }
            </div>
        </div>
    );
};

export default UserPosts;
