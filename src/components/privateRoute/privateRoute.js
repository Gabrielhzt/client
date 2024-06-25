import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ loadingUser, user, errorUser }) => {

    if (loadingUser) {
        return <div>Loading...</div>;
    }

    if (user.full_name) {
        return <Outlet />;
    }

    return <Navigate to="/login" />;
};

export default PrivateRoute;
