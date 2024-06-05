import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './menu.css'
import { Products } from "../../assets/data/productdata";
import { NavLink } from "react-router-dom";

const Menu = () => {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <div className="menu-2">
                <NavLink to={'/cart'}><FontAwesomeIcon icon={faCartShopping} size='xl' color="#fff" /></NavLink>
                <FontAwesomeIcon icon={faBars} size="xl" className="icon" onClick={() => setOpen(!open)} />
            </div>
            {open ? (
                <ul className='links-2'>
                    {Products.map((product)=> (
                        <NavLink to={`/product/${product.id}`}>
                            <li key={product.id}>{product.name}</li>
                        </NavLink>
                    ))}
                    <li className="icons">
                        <NavLink to={'/account/personal-info'}><FontAwesomeIcon icon={faCircleUser} size='lg' /></NavLink>
                    </li>
                </ul>
            ):(
                null
            )}
        </div>
    )
}

export default Menu;