import React from "react";
import {  Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import './Account.css';
import Navbar from "../components/navbar/navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "../features/user/userSlice";

const Account = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:4000/user/logout', token, {
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
            <Navbar />
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
            <footer>
                <h2>VoltBike</h2>
                <p>© 2024 VoltBike - Designed with passion by Gabriel Hazout. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Account;