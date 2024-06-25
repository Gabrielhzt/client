import React from 'react';
import { useStripe, useElements, PaymentElement, AddressElement } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { validateCart } from '../features/cart/cartSlice';

const PaymentForm = ({ cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const addressElement = elements.getElement(AddressElement);
        const addressData = addressElement.getValue().value.address;

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'https://voltbike.vercel.app/payment-success',
                shipping: {
                    name: addressData.name,
                    address: {
                        line1: addressData.line1,
                        line2: addressData.line2,
                        city: addressData.city,
                        state: addressData.state,
                        postal_code: addressData.postal_code,
                        country: addressData.country,
                    },
                },
            },
        });

        if (!error) {
            console.log('Paiement confirmé avec succès!');
            return true; // Indicate success
        } else {
            console.error('Erreur lors de la confirmation du paiement:', error);
            throw error; // Throw error to indicate failure
        }
    };

    const handleSubmitWithDispatch = async (event) => {
        event.preventDefault();
    
        try {
            const paymentSuccessful = await handleSubmit(event);
            if (paymentSuccessful) {
                dispatch(validateCart()); // Dispatch validateCart if handleSubmit succeeded
            }
        } catch (error) {
            console.error('Error in handleSubmitWithDispatch:', error);
            // Handle the error if needed
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
