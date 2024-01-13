import useSWR from 'swr';
import {fetcher} from "../helpers/fetcher";
import {FriendRequest} from "../interfaces/Friends";

export const useFriendsPendingRequests = (userId: string) => {
    const { data: friends } = useSWR<FriendRequest>(`friends/${userId}/pending`, fetcher);

    return { friends };
}
