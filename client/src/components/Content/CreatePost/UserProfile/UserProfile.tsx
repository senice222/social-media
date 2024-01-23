import { FC } from "react";
import { UserProps } from "../../../../interfaces/Auth";
import style from "../CreatePost.module.scss";
import userAvatar from "../../../../assets/user.png";

const UserProfile: FC<UserProps> = ({ user }) => (
    <div className={style.userProfile}>
        <img
            src={
                user?.avatar
                    ? `http://localhost:5000/${user?.avatar}`
                    : userAvatar
            }
            alt={"/"}
        />
        <div>
            <p>{user ? user.username : "Loading.."}</p>
        </div>
    </div>
);

export default UserProfile;
