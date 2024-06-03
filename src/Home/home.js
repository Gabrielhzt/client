import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './home.css';
import { Products } from '../assets/data/productdata';

const Home = () => {
    return (
        <div>
            <header className='home-header'>
                <nav className='home-nav'>
                    <div className='left-nav'>
                        <h1>Voltbike</h1>
                        <ul className='links'>
                            <li>VoltBike Pulse</li>
                            <li>VoltBike Pulse</li>
                            <li>VoltBike Pulse</li>
                        </ul>
                    </div>
                    <div className='right-nav'>
                        <FontAwesomeIcon icon={faCartShopping} size='xl' />
                        <FontAwesomeIcon icon={faCircleUser} size='xl' />
                    </div>
                </nav>
                <div className='header-title'>
                    <h1>Ride into the Future with WattWheels</h1>
                    <p>Your Eco-Friendly Electric Bike Destination!</p>
                    <button className='btn'>Learn more</button>
                </div>
            </header>
            <section className='products'>
                {Products.map((product) => (
                    <div key={product.id} className={product.id !== 'VB3' ? 'img' : 'img-2'} style={{ backgroundImage: `url(${product.img})` }}>
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                        <button className='btn-product'>Buy it</button>
                    </div>
                ))}
            </section>
            <section className='banner'>
                <img src='https://www.vanmoof.com/sites/default/files/2023-02/CTA-D-H01-v2.jpg' className='banner-img' />
            </section>
        </div>
    )
}

export default Home;