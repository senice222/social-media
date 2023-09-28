import useSWR from 'swr';
import * as Api from "../api/index.ts";
import {fetcher} from "../core/axios.ts";
import {SetStateAction, Dispatch} from "react";

export const usePostComments = (_id: string, comment: string, setComment: Dispatch<SetStateAction<string>>) => {
    const { data: comments, mutate: mutateComments } = useSWR(`posts/comments/${_id}`, fetcher)

    const handleComment = async () => {
        try {
            await Api.posts.createComment(_id, comment)
            mutateComments()
            setComment('')
        } catch (e) {
            console.log(e)
        }
    }

    return { comments, handleComment }
}