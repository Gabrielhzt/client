import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './home.css';
import { Products } from '../assets/data/productdata';
import Menu from '../components/menu/menu';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <header className='home-header'>
                <nav className='home-nav'>
                    <div className='left-nav'>
                        <NavLink to={'/'} className={'logo'}><h1>Voltbike</h1></NavLink>
                        <ul className='links'>
                            {Products.map((product) => (
                                <NavLink to={`/product/${product.id}`}>
                                    <li key={product.id}>{product.name}</li>
                                </NavLink>
                            ))}
                        </ul>
                    </div>
                    <div className='right-nav'>
                    <NavLink to={'/cart'}><FontAwesomeIcon icon={faCartShopping} size='xl' color="#fff" /></NavLink>
                <NavLink to={'/account/personal-info'}><FontAwesomeIcon icon={faCircleUser} size='xl' color="#fff" /></NavLink>
                    </div>
                    <div className='menu'>
                        <Menu />
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
            <footer>
                <h2>VoltBike</h2>
                <p>© 2024 VoltBike - Designed with passion by Gabriel Hazout. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Home;