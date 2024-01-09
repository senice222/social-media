import { GetUserByHook } from "../interfaces/Auth";
import useSWR from 'swr'
import { fetcher } from '../core/axios'

export const useGetMe = (): GetUserByHook => {
  const {data: currentUser, isLoading} = useSWR('/user/getMe/me', fetcher)

  return { currentUser, isLoading }
};