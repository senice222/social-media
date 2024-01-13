import {GetUserByHook, User} from "../interfaces/Auth";
import useSWR from 'swr'
import {fetcher} from "../helpers/fetcher";

export const useGetMe = (): GetUserByHook => {
  const {data: currentUser, isLoading} = useSWR<User>('/user/getMe/me', fetcher)

  return { currentUser, isLoading }
};