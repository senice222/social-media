import {FC} from "react";
import style from "./Content.module.scss";
import CreatePost from "./CreatePost/CreatePost";
import ContentItem from "./ContentItem";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {useEffect} from "react";
import {loadPosts} from "../../store/slices/Posts/thunks/post.thunks";
import PaginationComponent from "./ContentPagination/Pagination";
import {Post} from "../../interfaces/Posts";
import {UserProps} from "../../interfaces/Auth";

const ContentList: FC<UserProps> = ({user}) => {
    const dispatch = useAppDispatch();
    const {posts, currentPage} = useAppSelector((state) => state.posts);

    // getting 5 posts per page
    useEffect(() => {
        dispatch(loadPosts({page: currentPage, perPage: 5}));
    }, [currentPage, dispatch]);

    return (
        <div className={style.middleSide}>
            <CreatePost user={user}/>
            {posts.map((item: Post, i: number) => (
                <ContentItem
                    key={i}
                    _id={item._id}
                    content={item.content}
                    comments={item.comments}
                    urls={item.urls}
                    createdAt={item.createdAt}
                    owner={item.owner}
                    user={user}
                />
            ))}
            <PaginationComponent/>
        </div>
    );
};

export default ContentList;
