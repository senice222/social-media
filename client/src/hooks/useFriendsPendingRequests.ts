import useSWR from 'swr';
import { fetcher } from '../core/axios';

export const useFriendsPendingRequests = (userId: string) => {
    const { data: friends } = useSWR(`friends/${userId}/pending`, fetcher);

    return { friends };
}
