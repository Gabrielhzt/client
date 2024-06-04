import React from "react";
import './history.css';

const History = () => {
    return (
        <div className="info">
            <p>On this page, find a summary of all your past orders, including details such as the order number, and total amount of each purchase. It's a convenient way to keep track of your previous purchases and reorder if needed.</p>
            <div>
                <div>
                    <div className="top-history">
                        <h2>Order 1</h2>
                        <p>Total Amount: $1000</p>
                    </div>
                    <div className="gap">
                        <div className='order-product'>
                            <div className='info-product'>
                                <img src="https://www.vanmoof.com/sites/default/files/2023-03/PDP-D-Carousel-S5-Light-01_0.jpg" alt="" className='img-history' />
                                <div className='text-product'>
                                    <div>
                                        <h3>VB Pulse</h3>
                                        <p>$500</p>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                            <p>Quantity: 1</p>
                        </div>
                        <div className='order-product'>
                            <div className='info-product'>
                                <img src="https://www.vanmoof.com/sites/default/files/2023-03/PDP-D-Carousel-S5-Light-01_0.jpg" alt="" className='img-history' />
                                <div className='text-product'>
                                    <div>
                                        <h3>VB Pulse</h3>
                                        <p>$500</p>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                            <p>Quantity: 1</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History;