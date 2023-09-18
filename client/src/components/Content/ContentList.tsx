import React from 'react'
import style from './Content.module.scss'
import CreatePost from "../CreatePost/CreatePost.tsx";
import ContentItem from "./ContentItem.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks.ts";
import {useEffect} from "react";
import {loadPosts} from "../../store/slices/Posts/post.thunks.ts";
import PaginationComponent from "../Pagination/Pagination.tsx";

const ContentList = () => {
    const dispatch = useAppDispatch();
    const {posts, currentPage} = useAppSelector((state) => state.posts);

    useEffect(() => {
        dispatch(loadPosts({ page: currentPage, perPage: 5 }));
    }, [currentPage, dispatch]);

    return (
        <div className={style.middleSide}>
            <CreatePost />
            {
                posts.map((item, i) => (
                    <React.Fragment key={i}>
                        <ContentItem
                           content={item.content}
                           likes={item.likes}
                           comments={item.comments}
                           urls={item.urls}
                           createdAt={item.createdAt}
                           owner={item.owner}
                        />
                    </React.Fragment>
                ))
            }
            <PaginationComponent />
        </div>
    );
};

export default ContentList;
