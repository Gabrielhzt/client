import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Menu from "../menu/menu";
import './navbar.css';
import { Products } from "../../assets/data/productdata";
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='home-nav2'>
            <div className='left-nav'>
                <NavLink to={'/'} className={'logo'}>
                    <h1>Voltbike</h1>
                </NavLink>
                <ul className='links'>
                    {Products.map((product) => (
                        <NavLink to={`/product/${product.id}`}>
                            <li key={product.id}>{product.name}</li>
                        </NavLink>
                    ))}
                </ul>
            </div>
            <div className='right-nav'>
                <NavLink to={'/cart'}><FontAwesomeIcon icon={faCartShopping} size='xl' color="#fff" /></NavLink>
                <NavLink to={'/account/personal-info'}><FontAwesomeIcon icon={faCircleUser} size='xl' color="#fff" /></NavLink>
            </div>
            <div className='menu'>
                <Menu />
            </div>
        </nav>
    )
}

export default Navbar;