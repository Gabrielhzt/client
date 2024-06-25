import React from "react";
import { Outlet } from 'react-router-dom';
import Navbar from "../navbar/navbar";

const NavRoute = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <footer>
                <h2>VoltBike</h2>
                <p>© 2024 VoltBike - Designed with passion by Gabriel Hazout. All rights reserved.</p>
            </footer>
        </>
    )
}

export default NavRoute;