import {FC} from "react";
import style from "./Content.module.scss";
import CreatePost from "./CreatePost/CreatePost.tsx";
import ContentItem from "./ContentItem.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.ts";
import { useEffect } from "react";
import { loadPosts } from "../../store/slices/Posts/thunks/post.thunks.ts";
import PaginationComponent from "./ContentPagination/Pagination.tsx";
import { Post } from "../../interfaces/Posts.ts";
import { UserProps } from "../../interfaces/Auth.ts";

const ContentList:FC<UserProps> = ({user}) => {
  const dispatch = useAppDispatch();
  const { posts, currentPage } = useAppSelector((state) => state.posts);

  // getting 5 posts per page
  useEffect(() => {
    dispatch(loadPosts({ page: currentPage, perPage: 5 }));
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
      {posts && <div className={style.loadPosts}>loading..</div>}
      <PaginationComponent />
    </div>
  );
};

export default ContentList;
