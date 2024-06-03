import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './menu.css'
import { Products } from "../../assets/data/productdata";

const Menu = () => {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <div className="menu-2" onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={faBars} size="xl" />
            </div>
            {open ? (
                <ul className='links-2'>
                    {Products.map((product)=> (
                        <li>{product.name}</li>
                    ))}
                    <li className="icons">
                        <FontAwesomeIcon icon={faCartShopping} size='lg' />
                        <FontAwesomeIcon icon={faCircleUser} size='lg' />
                    </li>
                </ul>
            ):(
                null
            )}
        </div>
    )
}

export default Menu;