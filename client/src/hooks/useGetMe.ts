import {useAppDispatch, useAppSelector} from "./reduxHooks.ts";
import {useEffect} from "react";
import {getMe} from "../store/slices/UserSlice.ts";

export const useGetMe = async () => {
    const currentUser = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    return { currentUser }
}