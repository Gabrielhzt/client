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
            <footer>
                <h2>VoltBike</h2>
                <p>© 2024 VoltBike - Designed with passion by Gabriel Hazout. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Account;