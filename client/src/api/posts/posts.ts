import axios from "../../core/axios.ts";

export const createComment = async (postId: string, commentText: string) => {
    const commentObj = {
        commentText
    }

    return (await axios.post(`posts/addComment/${postId}`, commentObj)).data
}

export const like = async (postId: string) => {
    return (await axios.put(`posts/like/${postId}`)).data
}
