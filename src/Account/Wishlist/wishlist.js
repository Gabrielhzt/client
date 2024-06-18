import React, { useEffect } from "react";
import './wishlist.css'
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "../../features/wishlist/wishlistSlice";
import { Link } from "react-router-dom";

const Wishlist = () => {
    const dispatch = useDispatch();
    const { loadingWishlist, wishlist, errorWishlist } = useSelector((state) => state.wishlist);

    useEffect(() => {
        dispatch(getWishlist())
    }, [dispatch])

    return (
        <div className="info">
            <p>The wishlist page allows users to view and manage saved products. Users can add or remove items from their wishlist, which typically includes product name, image, description, and price. It offers a convenient way to track and organize products of interest.</p>
            {loadingWishlist || errorWishlist ? (
                <p>Loading...</p>
            ):(
                <div className="wishlist">
                    {wishlist.map((item) => (
                        <div key={item.product_id} className={item.name === 'VB Spark' || item.name === 'VB Evo' ? 'img-2' : 'img'} style={{ backgroundImage: `url(${item.img})` }}>
                            <h3>{item.name}</h3>
                            <p>{item.price}</p>
                            <Link to={`/product/${item.product_id}`}><button className='btn-product'>Buy it</button></Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Wishlist;