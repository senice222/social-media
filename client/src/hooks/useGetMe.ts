import { GetUserByHook } from "../interfaces/Auth.ts";
import useSWR from 'swr'
import { fetcher } from '../core/axios.ts'

export const useGetMe = (): GetUserByHook => {
  const {data: currentUser, isLoading} = useSWR('/user/getMe/me', fetcher)

  return { currentUser, isLoading }
};