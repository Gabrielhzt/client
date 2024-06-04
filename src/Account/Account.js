import React from "react";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import './Account.css';
import Navbar from "../components/navbar/navbar";

const Account = () => {
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
                </div>
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Account;