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

export const createPost = async (content: string) => {
    const formData = new FormData()
    formData.append('content', content)

    const config = {
        headers: {"Content-Type": "multipart/form-data"},
    };

    try {
        const {data} = await axios.post('posts/create', formData, config)
        return data
    } catch (e) {
        console.log(e)
    }
}
