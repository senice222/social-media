import useSWR, { mutate } from 'swr';
import * as Api from "../api/index.ts";
import {fetcher} from "../core/axios.ts";

export const usePostLikes = (postId: string) => {
    const { data: likes, mutate: mutateLikes } = useSWR(`posts/likes/${postId}`, fetcher);

    const handleLike = async () => {
        await Api.posts.like(postId);

        mutateLikes();

        mutate(`/posts/likes/${postId}`);
    }
    return { likes, handleLike };
};
