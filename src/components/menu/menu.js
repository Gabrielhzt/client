import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './menu.css';
import { NavLink } from "react-router-dom";
import { fetchCart, getTotalItems } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const Menu = ({ loading, products, cart, totalItems, error }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    useEffect(() => {
        if (cart && Array.isArray(cart) && cart.length > 0) {
            dispatch(getTotalItems({ orderId: cart[0].order_id }));
        }
    }, [dispatch, cart]);

    return (
        <div>
            <div className="menu-2">
                <NavLink to={'/cart'}>
                    <FontAwesomeIcon icon={faCartShopping} size='xl' color="#fff" />
                </NavLink>
                <div className="circle">
                    <p>{totalItems}</p>
                </div>
                <FontAwesomeIcon icon={faBars} size="xl" className="icon" onClick={() => setOpen(!open)} />
            </div>
            {open ? (
                <ul className='links-2'>
                    {products.map((product) => (
                        <li key={product.product_id}>
                            <NavLink to={`/product/${product.product_id}`}>
                                {product.name}
                            </NavLink>  
                        </li>
                    ))}
                    <li className="icons">
                        <NavLink to={'/account/personal-info'}>
                            <FontAwesomeIcon icon={faCircleUser} size='lg' />
                        </NavLink>
                    </li>
                </ul>
            ) : null}
        </div>
    );
}

export default Menu;