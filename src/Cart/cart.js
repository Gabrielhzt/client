import React from 'react';
import Navbar from '../components/navbar/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './cart.css';

const Cart = () => {
    return (
        <div>
            <Navbar />
            <div className='cart'>
                <h1>Your Cart</h1>
                <div className='items'>
                    <div className='item'>
                        <div className='info-product'>
                            <img src='https://www.vanmoof.com/sites/default/files/2023-03/PDP-D-Carousel-S5-Light-01_0.jpg' alt='product' className='img-cart' />
                            <div className='text-product'>
                                <div>
                                    <h3>VoltBike Boost</h3>
                                    <p>$1999</p>
                                </div>
                                <button className='remove'>Remove</button>
                            </div>
                        </div>
                        <div className='number'>
                            <FontAwesomeIcon icon={faChevronUp} />
                            <p>1</p>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                    </div>
                    <div className='item'>
                        <div className='info-product'>
                            <img src='https://www.vanmoof.com/sites/default/files/2023-03/PDP-D-Carousel-S5-Light-01_0.jpg' alt='product' className='img-cart' />
                            <div className='text-product'>
                                <div>
                                    <h3>VoltBike Boost</h3>
                                    <p>$1999</p>
                                </div>
                                <button className='remove'>Remove</button>
                            </div>
                        </div>
                        <div className='number'>
                            <FontAwesomeIcon icon={faChevronUp} />
                            <p>1</p>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                    </div>
                </div>
                <div className='total'>
                    <h2>Total</h2>
                    <p>$2999</p>
                </div>
                <button className='validate'>Validate the order</button>
            </div>
            <footer>
                <h2>VoltBike</h2>
                <p>© 2024 VoltBike - Designed with passion by Gabriel Hazout. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Cart;