import React from "react";
import {  Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import './Account.css';
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "../features/user/userSlice";

const Account = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('https://voltbike-server.onrender.com/user/logout', token, {
                headers: {
                    'Authorization': token
                }
            })
            localStorage.removeItem('token');
            dispatch(fetchUserInfo())
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <div className="account">
                <div className="account-nav">
                    <NavLink to={'personal-info'}>
                        Personal Information
                    </NavLink>
                    <NavLink to={'order-history'}>
                        Order-history
                    </NavLink>
                    <NavLink to={'wishlist'}>
                        Wishlist
                    </NavLink>
                    <button className="logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Account;