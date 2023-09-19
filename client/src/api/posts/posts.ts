import axios from "../../core/axios.ts";

export const createComment = async (postId: string, commentText: string) => {
    const commentObj = {
        commentText
    }

    const {data} = await axios.post(`posts/addComment/${postId}`, commentObj)
    return data
}