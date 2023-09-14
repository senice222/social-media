import style from './Content.module.scss'
import profilePic from "../../assets/profile-pic.png";
import {NavLink} from "react-router-dom";
import postImg from '../../assets/feed-image-1.png'
import like from '../../assets/like-blue.png'
import comment from '../../assets/comments.png'
import share from '../../assets/share.png'
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";
import {setCurrentPage} from "../../store/slices/Posts/PostsSlice.ts";
import {useEffect} from "react";
import {loadPosts} from "../../store/slices/Posts/postThunks.ts";

const ContentItem = () => {
    const dispatch = useAppDispatch();
    let {posts, currentPage, totalPosts, totalPages} = useAppSelector((state) => state.posts);

    useEffect(() => {
        dispatch(loadPosts({ page: currentPage, perPage: 5 }));
    }, [currentPage, dispatch]);

    return (
        <div className={style.middleSide}>

            <div className={style.postContainer}>
                <div className={style.postRow}>
                    <div className={style.userProfile}>
                        <img src={profilePic} alt={'/'}/>
                        <div>
                            <p>John</p>
                            <span>June 23 2021, 13:40 pm</span>
                        </div>
                    </div>
                    <NavLink to={'/'}>...</NavLink>
                </div>
                <p className={style.postText}>
                    Subscribe Sanya <span>@sanyak</span> <NavLink to={'/'}>#go here</NavLink>
                </p>
                <img src={postImg} className={style.postImg} alt="/"/>

                <div className={style.postRow}>
                    <div className={style.activityIcons}>
                        <div><img src={like} alt="/"/> 120</div>
                        <div><img src={comment} alt="/"/> 45</div>
                        <div><img src={share} alt="/"/> 20</div>
                    </div>
                    <div className={style.postProfileIcon}>
                        <img src={profilePic} alt="/"/>
                    </div>
                </div>
            </div>


            {/* Пагинация */}
            <div>
                <button onClick={() => dispatch(setCurrentPage(currentPage - 1))} disabled={currentPage === 1}>
                    Предыдущая
                </button>
                <span>
                    Страница {currentPage} из {totalPages}
                </span>
                <button onClick={() => dispatch(setCurrentPage(currentPage + 1))} disabled={currentPage === totalPages}>
                    Следующая
                </button>
            </div>

        </div>
    );
};

export default ContentItem;
