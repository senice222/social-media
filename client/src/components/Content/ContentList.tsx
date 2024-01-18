import {FC} from "react";
import style from "./Content.module.scss";
import CreatePost from "./CreatePost/CreatePost";
import ContentItem from "./ContentItem";
import {useAppSelector} from "../../hooks/reduxHooks";
import {UserProps} from "../../interfaces/Auth";
import useSWR from "swr";
import {fetcher} from "../../helpers/fetcher";
import PaginationComponent from "./ContentPagination/Pagination";
import {InitialState, Post} from "../../interfaces/Posts";

const ContentList: FC<UserProps> = ({user}) => {
    const {currentPage} = useAppSelector((state) => state.posts);

    const {data} = useSWR<InitialState>(
        `posts/getPaginatedPosts?page=${currentPage}&perPage=${5}`,
        () => fetcher(`posts/getPaginatedPosts?page=${currentPage}&perPage=${5}`)
    );

    return (
        <div className={style.middleSide}>
            <CreatePost user={user} currentPage={+currentPage}/>
            {data ?
                data.posts.map((item: Post, i: number) => (
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
                )) : <div className={style.loadingContainer}>
                    <div className={style.loading}>
                        Loading..
                    </div>
                </div>
            }
            {data && <PaginationComponent currentPage={+data.currentPage} totalPages={data.totalPages}/>}
        </div>
    );
};

export default ContentList;
