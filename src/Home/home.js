import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './home.css';
import Menu from '../components/menu/menu';
import { Link, NavLink } from 'react-router-dom';

const Home = ({ loading, products, error }) => {

    return (
        <div>
            <header className='home-header'>
                <nav className='home-nav'>
                    <div className='left-nav'>
                        <NavLink to={'/'} className={'logo'}><h1>Voltbike</h1></NavLink>
                        <ul className='links'>
                            {products.map((product) => (
                                <li key={product.product_id}>
                                    <NavLink to={`/product/${product.product_id}`}>
                                        {product.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='right-nav'>
                        <NavLink to={'/cart'}><FontAwesomeIcon icon={faCartShopping} size='xl' color="#fff" /></NavLink>
                        <NavLink to={'/account/personal-info'}><FontAwesomeIcon icon={faCircleUser} size='xl' color="#fff" /></NavLink>
                    </div>
                    <div className='menu'>
                        <Menu loading={loading} products={products} error={error} />
                    </div>
                </nav>
                <div className='header-title'>
                    <h1>Ride into the Future with VoltBike</h1>
                    <p>Your Eco-Friendly Electric Bike Destination!</p>
                    <button className='btn'>Learn more</button>
                </div>
            </header>
                {loading && <div>Loading</div>}
                {!loading && error ? <div>Error: {products.error}</div> : null}
                {!loading && products.length ? (
                    <section className='products'>
                        {products.map((product) => (
                            <div key={product.product_id} className={product.name === 'VB Spark' || product.name === 'VB Evo' ? 'img-2' : 'img'} style={{ backgroundImage: `url(${product.img})` }}>
                                <h3>{product.name}</h3>
                                <p>${product.price}</p>
                                <Link to={`/product/${product.product_id}`}><button className='btn-product'>Buy it</button></Link>
                            </div>
                        ))}
                    </section>
                ):(
                    null
                )}
            <section className='banner'>
                <img src='https://www.vanmoof.com/sites/default/files/2023-02/CTA-D-H01-v2.jpg' alt='banner-voltbike' className='banner-img' />
            </section>
            <footer>
                <h2>VoltBike</h2>
                <p>© 2024 VoltBike - Designed with passion by Gabriel Hazout. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Home;