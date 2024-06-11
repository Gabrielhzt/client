import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './cart.css';
import { useDispatch } from 'react-redux';
import { fetchCart, removeItem, updateQuantity } from '../features/cart/cartSlice';

const Cart = ({ loadingCart, cart, errorCart }) => {
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0); // State to hold the total price

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const incrementQuantity = (orderDetailId, quantity) => {
        dispatch(updateQuantity({ orderDetailId, quantity: quantity + 1 }));
        dispatch(fetchCart());
    };

    const decrementQuantity = (orderDetailId, quantity) => {
        if (quantity > 1) {
            dispatch(updateQuantity({ orderDetailId, quantity: quantity - 1 }));
            dispatch(fetchCart());
        }
    };

    const handleRemoveItem = (id) => {
        dispatch(removeItem(id));
        dispatch(fetchCart());
    };

    // Calculate total price whenever cart changes
    useEffect(() => {
        let total = 0;
        cart.forEach((item) => {
            total += item.quantity * item.price;
        });
        setTotalPrice(total);
    }, [cart]);

    return (
        <div>
            <Navbar />
            <div className='cart'>
                <h1>Your Cart</h1>
                <div className='items'>
                    {cart.map((item) => (
                        <div className='item' key={item.product_id}>
                            <div className='info-product'>
                                <img src='https://www.vanmoof.com/sites/default/files/2023-03/PDP-D-Carousel-S5-Light-01_0.jpg' alt='product' className='img-cart' />
                                <div className='text-product'>
                                    <div>
                                        <h3>{item.name}</h3>
                                        <p>${item.price}</p>
                                    </div>
                                    <button className='remove' onClick={() => handleRemoveItem(item.order_detail_id)}>Remove</button>
                                </div>
                            </div>
                            <div className='number'>
                                <div className='quantity' onClick={() => incrementQuantity(item.order_detail_id, item.quantity)}>
                                    <FontAwesomeIcon icon={faChevronUp} />
                                </div>
                                <p>{item.quantity}</p>
                                <div className='quantity' onClick={() => decrementQuantity(item.order_detail_id, item.quantity)}>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='total'>
                    <h2>Total</h2>
                    <p>${totalPrice.toFixed(2)}</p> {/* Display total price */}
                </div>
                <button className='validate'>Validate the order</button>
            </div>
            <footer>
                <h2>VoltBike</h2>
                <p>© 2024 VoltBike - Designed with passion by Gabriel Hazout. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Cart;
