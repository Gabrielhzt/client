import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './paymentForm';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchCart } from '../features/cart/cartSlice';
import './payment.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const stripePromise = loadStripe('pk_test_51OyFFJDPXcpTe3zr5xy7bQ3YRiPFneS6r82O0v3i49uvmQD6WAzPPayQwlXlbES8egVItlmmw50afoWoCRPjZJBg00Gm2CCxTT');

const Payment = ({ loadingCart, cart, errorCart }) => {
    const [clientSecret, setClientSecret] = useState('');
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    useEffect(() => {
        if (token && cart && cart.length > 0) {
            const amountInCents = parseFloat(cart[0].total) * 100;
            axios.post('https://voltbike-server.onrender.com/payment/create-payment-intent', { amount: amountInCents, products: cart }, {
                headers: {
                    'Authorization': token
                }
            })
            .then(response => {
                setClientSecret(response.data.clientSecret);
            })
            .catch(error => {
                console.error('Erreur lors de la création du PaymentIntent:', error);
            });
        }
    }, [token, cart]);

    const options = {
        clientSecret: clientSecret,
    };

    return (
        <div className="App">
            <Link to={'/cart'} style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none'}}>
                <FontAwesomeIcon icon={faArrowLeft} color='#000' />
                <p style={{color: '#000'}}>Back</p>
            </Link>
            <div className='grid'>
                <div className='info'>
                    <h1>Paiement sécurisé</h1>
                    {clientSecret && (
                        <Elements stripe={stripePromise} options={options}>
                            <PaymentForm cart={cart} />
                        </Elements>
                    )}
                </div>
                <div className='items' style={{ alignItems: 'flex-start', gap: '40px'}}>
                    <h1>Detail Order</h1>
                    {cart && cart.length > 0 ? (
                        <div className='items2'>
                            {cart.map((item) => (
                                <div className='item' key={item.product_id} style={{width: 'auto'}}>
                                    <div className='info-product'>
                                        <img src={item.product_img} alt='product' className='img-cart' />
                                        <div className='text-product'>
                                            <div>
                                                <h3>{item.name}</h3>
                                                <p>${item.price}</p>
                                            </div>
                                            <div style={{marginBottom: '10px'}}>
                                                <p>Quantity: {item.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className='total2'>
                                <h2>Total:</h2>
                                <h2>${cart[0].total}</h2>
                            </div>
                        </div>
                    ) : (
                        <p>Votre panier est vide</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Payment;