import axios from "../../core/axios";

export const getAllUserFriends = async () => {
    return (await axios.get('friends')).data
}

export const getUserPendingRequests = async (id: string) => {
    return (await axios.get(`friends/${id}/pending`)).data
}

export const acceptUserRequest = async (requestId: string) => {
    const statusObject = {
        status: "accepted"
    }

    return (await axios.put(`friends/${requestId}`, statusObject)).data
}

export const rejectUserRequest = async (requestId: string) => {
    const statusObject = {
        status: "rejected"
    }

    return (await axios.put(`friends/${requestId}`, statusObject)).data
}