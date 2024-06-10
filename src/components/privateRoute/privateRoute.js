import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ loadingUser, user, errorUser }) => {

    if (loadingUser) {
        return <div>Loading...</div>;
    }

    if (errorUser || user.length === 0) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
