import useSWR from 'swr';
import * as Api from "../api/index";
import {fetcher} from "../helpers/fetcher";
// import {Post} from "../interfaces/Posts";

export const usePostLikes = (postId: string) => {
    const { data: likes, mutate } = useSWR<any>(`posts/likes/${postId}`, fetcher);

    const handleLike = async () => {
        try {
            await Api.posts.like(postId);
            mutate(`/posts/likes/${postId}`);
        } catch (e) {
            console.log(e)
        }
    }

    return { likes, handleLike };
};
