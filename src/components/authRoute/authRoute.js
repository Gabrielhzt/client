import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router';
import { fetchUserInfo } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';

const AuthRoute = ({ loadingUser, user }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch])

    if (loadingUser) {
        return <div>Loading...</div>;
    }

    if (user.full_name) {
        return <Navigate to='/account/personal-info' />;
    }

    return <Outlet />;
};

export default AuthRoute;

