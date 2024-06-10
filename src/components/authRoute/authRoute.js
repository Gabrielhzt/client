import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router';

const AuthRoute = ({ loadingUser, user, errorUser }) => {

    if (loadingUser) {
        return <div>Loading...</div>;
    }

    if (user.full_name) {
        return <Navigate to="/cart" />;
    }

    return <Outlet />;
};

export default AuthRoute;

