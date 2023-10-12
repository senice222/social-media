import {useAppDispatch, useAppSelector} from "./reduxHooks.ts";
import {useEffect} from "react";
import {GetUserByHook} from "../interfaces/AuthI.ts";
import {getMe} from "../store/slices/User/thunks/user.thunks.ts";

export const useGetMe = (): GetUserByHook => {
    const currentUser = useAppSelector(state => state.user.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                await dispatch(getMe());
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        }
        
        fetchCurrentUser();
    }, [dispatch]);

    return { currentUser };
};