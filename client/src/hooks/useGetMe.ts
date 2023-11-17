import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks.ts';
import { GetUserByHook } from '../interfaces/AuthI.ts';
import { getMe } from '../store/slices/User/thunks/user.thunks.ts';

export const useGetMe = (): GetUserByHook => {
    const currentUser = useAppSelector(state => state.user.user);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(currentUser === null);

    useEffect(() => {
        if (isLoading) {
            const fetchCurrentUser = async () => {
                try {
                    await dispatch(getMe());
                } catch (error) {
                    console.error('Error fetching current user:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchCurrentUser();
        }
    }, [dispatch, currentUser]);

    return { currentUser, isLoading };
};
