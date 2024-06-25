import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement, AddressElement } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { validateCart } from '../features/cart/cartSlice';

const PaymentForm = ({ cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const [error, setError] = useState(null); // Utilisation de null pour les erreurs par défaut

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
                    redirect: 'if_required',
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
                setError(error.message); // Mise à jour de l'état de l'erreur pour affichage si nécessaire
            }
        } catch (error) {
            console.error('Erreur lors de la confirmation du paiement:', error);
            setError(error.message); // Mise à jour de l'état de l'erreur pour affichage si nécessaire
        }
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <PaymentElement />
                <AddressElement options={{ mode: 'shipping' }} />
                <button type="submit" disabled={!stripe} className='btn2'>
                    Payer
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;