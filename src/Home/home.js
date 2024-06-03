import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './home.css';

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
        </div>
    )
}

export default Home;