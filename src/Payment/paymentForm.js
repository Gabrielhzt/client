import React from 'react';
import { useStripe, useElements, PaymentElement, AddressElement } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { validateCart } from '../features/cart/cartSlice';

const PaymentForm = ({ cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const addressElement = elements.getElement(AddressElement);
        const addressData = addressElement.getValue().value.address;

        stripe.confirmPayment({
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
        })
        .then(({ error }) => {
            if (!error) {
                console.log('Paiement confirmé avec succès!');
                dispatch(validateCart());
            } else {
                console.error('Erreur lors de la confirmation du paiement:', error);
            }
        })
        .catch(error => {
            console.error('Erreur lors de la confirmation du paiement:', error);
        });
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
