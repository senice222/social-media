import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks.ts';
import { useEffect } from 'react';
import { GetUserByHook } from '../interfaces/AuthI.ts';
import { getMe } from '../store/slices/User/thunks/user.thunks.ts';

export const useGetMe = (): GetUserByHook => {
    const currentUser = useAppSelector(state => state.user.user);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                await dispatch(getMe());
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching current user:', error);
                setIsLoading(false);
            }
        }

        if (currentUser === null) {
            fetchCurrentUser();
        } else {
            setIsLoading(false);
        }
    }, [dispatch, currentUser]);

    return { currentUser, isLoading };
};
