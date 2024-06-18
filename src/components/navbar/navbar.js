import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Menu from "../menu/menu";
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice";
import { fetchCart, getTotalItems } from "../../features/cart/cartSlice";

const Navbar = () => {
    const { loading, products, error } = useSelector((state) => state.products);
    const { totalItems, cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCart());
    }, [dispatch]);

    useEffect(() => {
        if (cart.length > 0) {
            dispatch(getTotalItems({ orderId: cart[0].order_id }));
        }
    }, [cart, dispatch, totalItems]);

    return (
        <nav className='home-nav2'>
            <div className='left-nav'>
                <NavLink to={'/'} className={'logo'}>
                    <h1>Voltbike</h1>
                </NavLink>
                <ul className='links'>
                    {products.map((product) => (
                        <li key={product.product_id}>
                            <NavLink to={`/product/${product.product_id}`}>
                                {product.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='right-nav'>
                <NavLink to={'/cart'}><FontAwesomeIcon icon={faCartShopping} size='xl' color="#fff" /></NavLink>
                <div className="circle">
                    <p>{totalItems}</p>
                </div>
                <NavLink to={'/account/personal-info'}><FontAwesomeIcon icon={faCircleUser} size='xl' color="#fff" /></NavLink>
            </div>
            <div className='menu'>
                <Menu loading={loading} products={products} cart={cart} totalItems={totalItems} error={error} />
            </div>
        </nav>
    );
};

export default Navbar;