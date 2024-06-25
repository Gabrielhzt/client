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

        const address = elements.getElement(AddressElement);

        const { error } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
            confirmParams: {
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

        if (!error) {
            console.log('Paiement confirmé avec succès!');
            dispatch(validateCart());
            window.location.href = 'https://voltbike.vercel.app/payment-success';
        } else {
            console.error('Erreur lors de la confirmation du paiement:', error);
        }
    };

    const handleSubmitWithDispatch = async (event) => {
        event.preventDefault();
    
        try {
            await handleSubmit(event); // Wait for handleSubmit to complete
            dispatch(validateCart()); // Dispatch validateCart if handleSubmit succeeded
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