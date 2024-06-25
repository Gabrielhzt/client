import React, { useEffect } from "react";
import './history.css';
import { useDispatch, useSelector } from "react-redux";
import { getcartHistory } from "../../features/cart/cartSlice";

function formatDateString(dateString) {
    const date = new Date(dateString);
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric' 
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
}

const History = () => {
    const dispatch = useDispatch();
    const { cartHistoryLoading, cartHistory, cartHistoryError } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getcartHistory());
    }, [dispatch]);

    return (
        <div className="info">
            <p>On this page, find a summary of all your past orders, including details such as the order number, and total amount of each purchase. It's a convenient way to keep track of your previous purchases and reorder if needed.</p>
            {cartHistoryLoading || cartHistoryError ? (
                <p>Loading...</p>
            ):(
                <div className="all-gap">
                    {cartHistory.map((order) => (
                        <div key={order.order_id}>
                            <div className="top-history">
                                <h2>{formatDateString(order.created_at)}</h2>
                                <p>Total Amount: ${order.total_amount}</p>
                            </div>
                            <div className="gap">
                                {order.products.map((products) => (
                                    <div className='order-product' key={products.product_id}>
                                        <div className='info-product'>
                                            <img src={products.image_url} alt="" className='img-history' />
                                            <div className='text-product'>
                                                <div>
                                                    <h3>{products.name}</h3>
                                                    <p>${products.price}</p>
                                                </div>
                                                <div></div>
                                            </div>
                                        </div>
                                        <p>Quantity: {products.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;