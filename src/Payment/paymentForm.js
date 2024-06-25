import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement, AddressElement } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { validateCart } from '../features/cart/cartSlice';

const PaymentForm = ({ cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const address = elements.getElement(AddressElement);

        try {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: 'https://voltbike.vercel.app/payment-success',
                    shipping: {
                        name: address.name,
                        address: {
                            line1: address.line1,
                            line2: address.line2,
                            city: address.city,
                            state: address.state,
                            postal_code: address.postal_code,
                            country: address.country,
                        },
                    },
                },
            });

            if (error) {
                setError(error.message);
                console.error('Error confirming payment:', error);
            } else {
                setError(null);
            }
        } catch (error) {
            setError(error.message);
            console.error('Error in handleSubmit:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <AddressElement options={{ mode: 'shipping' }} />
            <button type="submit" disabled={!stripe} className='btn2'>
                Payer
            </button>
        </form>
    );
};

export default PaymentForm;