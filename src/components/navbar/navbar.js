import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Menu from "../menu/menu";
import './navbar.css';
import { Products } from "../../assets/data/productdata";

const Navbar = () => {
    return (
        <nav className='home-nav'>
            <div className='left-nav'>
                <h1>Voltbike</h1>
                <ul className='links'>
                    {Products.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            </div>
            <div className='right-nav'>
                <FontAwesomeIcon icon={faCartShopping} size='xl' />
                <FontAwesomeIcon icon={faCircleUser} size='xl' />
            </div>
            <div className='menu'>
                <Menu />
            </div>
        </nav>
    )
}

export default Navbar;