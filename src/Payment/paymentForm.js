import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement, AddressElement } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { validateCart } from '../features/cart/cartSlice';

const PaymentForm = ({ cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const [error1, setError1] = useState(null);

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
                setError1('error');
                console.log(error1)
                console.error('Error confirming payment:', error);
            }
        } catch {
            setError1('error');
            console.log(error1)
            console.error('Error in handleSubmit:', error);
        }
    };

    const handleSubmitWithDispatch = async (event) => {
        event.preventDefault();

        try {
            await handleSubmit(event);
            console.log(error1)
            if (error1 === null) {
                dispatch(validateCart());
            }
        } catch (error) {
            console.error('Error in handleSubmitWithDispatch:', error);
        }
    };

    return (
        <form onSubmit={handleSubmitWithDispatch}>
            <PaymentElement />
            <AddressElement options={{ mode: 'shipping' }} />
            <button type="submit" disabled={!stripe} className='btn2'>
                Payer
            </button>
        </form>
    );
};

export default PaymentForm;