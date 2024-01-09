import useSWR, { mutate } from 'swr';
import * as Api from "../api/index";
import {fetcher} from "../core/axios";

export const usePostLikes = (postId: string) => {
    const { data: likes, mutate: mutateLikes } = useSWR(`posts/likes/${postId}`, fetcher);

    const handleLike = async () => {
        try {
            await Api.posts.like(postId);
            mutateLikes();
            mutate(`/posts/likes/${postId}`);
        } catch (e) {
            console.log(e)
        }
    }
    return { likes, handleLike };
};
