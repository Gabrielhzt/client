import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './cart.css';
import { useDispatch } from 'react-redux';
import { fetchCart, getTotalItems, removeItem, updateQuantity, updateTotalPrice } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';

const Cart = ({ loadingCart, cart, total, allQuantity, errorCart }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!errorCart && cart.length > 0) {
            dispatch(updateTotalPrice({ orderId: cart[0].order_id }));
        }
    }, [dispatch, errorCart, cart]);

    const incrementQuantity = (orderDetailId, quantity, orderId) => {
        dispatch(updateQuantity({ orderDetailId, quantity: quantity + 1, orderId }))
            .then(() => {
                dispatch(updateQuantity());
                
                dispatch(getTotalItems({ orderId: cart[0].order_id }));
            });
    };

    const decrementQuantity = (orderDetailId, quantity, orderId) => {
        if (quantity > 1) {
            dispatch(updateQuantity({ orderDetailId, quantity: quantity - 1, orderId }))
                .then(() => {
                    dispatch(updateQuantity());
                    dispatch(getTotalItems({ orderId: cart[0].order_id }));
                });
        }
    };

    const handleRemoveItem = (id, orderId) => {
        dispatch(removeItem(id))
            .then(() => {
                dispatch(fetchCart());
                dispatch(updateTotalPrice({ orderId }));
                dispatch(getTotalItems({ orderId: cart[0].order_id }));
            });
    };

    if (!Array.isArray(cart || loadingCart)) {
        return <div>Loading...</div>;
      }

    return (
        <div>
            <div className='cart'>
                <h1>Your Cart:</h1>
                <div className='items'>
                    {cart.length > 0 ? (
                        cart.map((item) => {
                            const quantity = allQuantity.find(q => q.orderDetailId === item.order_detail_id)?.quantity || item.quantity;
    
                            return (
                                <div className='item' key={item.product_id}>
                                    <div className='info-product'>
                                        <img src={item.product_img} alt='product' className='img-cart' />
                                        <div className='text-product'>
                                            <div>
                                                <h3>{item.name}</h3>
                                                <p>${item.price}</p>
                                            </div>
                                            <button className='remove' onClick={() => handleRemoveItem(item.order_detail_id, item.order_id)}>Remove</button>
                                        </div>
                                    </div>
                                    <div className='number'>
                                        <div className='quantity' onClick={() => incrementQuantity(item.order_detail_id, quantity, item.order_id)}>
                                            <FontAwesomeIcon icon={faChevronUp} />
                                        </div>
                                        <p>{quantity}</p>
                                        <div className='quantity' onClick={() => decrementQuantity(item.order_detail_id, quantity, item.order_id)}>
                                            <FontAwesomeIcon icon={faChevronDown} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ):(
                        <div className='space'>
                            <p>There is nothing in your cart for now</p>
                        </div>
                    )}
                </div>
                <div className='total'>
                    <h2>Total</h2>
                    {total.total ? (
                        <p>${total.total}</p>
                    ):(
                        <p>$0</p>
                    )}
                </div>
                {cart.length > 0 ? (
                    <Link to={'/payment'}><button className='validate'>Validate the order</button></Link>
                ):(
                    null
                )}
            </div>
        </div>
    );
};

export default Cart;