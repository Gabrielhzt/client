import React from "react";
import './wishlist.css'

const Wishlist = () => {
    return (
        <div className="info">
            <p>The wishlist page allows users to view and manage saved products. Users can add or remove items from their wishlist, which typically includes product name, image, description, and price. It offers a convenient way to track and organize products of interest.</p>
            <div className="wishlist">
                <div className='img' style={{ backgroundImage: `url(https://www.vanmoof.com/sites/default/files/2022-04/D_A5_Navigation.jpg)` }}>
                    <h3>VB Boost</h3>
                    <p>$1999</p>
                    <button className='btn-product'>Buy it</button>
                </div>
                <div className='img' style={{ backgroundImage: `url(https://www.vanmoof.com/sites/default/files/2022-04/D_A5_Navigation.jpg)` }}>
                    <h3>VB Boost</h3>
                    <p>$1999</p>
                    <button className='btn-product'>Buy it</button>
                </div>
            </div>
        </div>
    )
}

export default Wishlist;