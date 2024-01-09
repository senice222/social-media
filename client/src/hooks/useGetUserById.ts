import {User} from "../interfaces/Auth";
import * as Api from "../api";
import useSWR, {mutate as swrMutate} from 'swr'

const fetchUserById = async (id: string): Promise<User> => {
    const data = await Api.user.getUserById(id);
    return data;
};

export const useGetUserById = (id: string) => {
    const {data: user, error} = useSWR(`user/getUser/${id}`, () => fetchUserById(id))

    const isLoading = !user && !error;

    const setUser = (newUser: User | null) => {
        swrMutate(`/api/user/${id}`, newUser, false);
    };

    return {
        user,
        isLoading,
        error,
        setUser,
    };
};
