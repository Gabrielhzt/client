import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './product.css';
import Navbar from '../components/navbar/navbar';
import { addProductToCart, fetchCart } from '../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addInWishlist, getWishlist, removeFromWishlist } from '../features/wishlist/wishlistSlice';

const Product = ({ loading, products, error, loadingCart, cart, total, allQuantity, errorCart }) => {
  const { loadingWishlist, wishlist, errorWishlist } = useSelector((state) => state.wishlist);
  const { id } = useParams();
  const productId = parseInt(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  useEffect(() => {
    const foundProduct = products.find((product) => product.product_id === productId);
    setProduct(foundProduct);

    if (Array.isArray(wishlist) && wishlist.length > 0) {
      const isInWishlist = wishlist.some(item => item.product_id === productId);
      setIsInWishlist(isInWishlist);
    }
  }, [products, wishlist, productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addProductToCart({ productId: product.product_id, quantity: 1, price: product.price }))
      .then(() => {
        dispatch(fetchCart());
        navigate('/cart');
      });
    }
  };

  const handleAddToWishlist = () => {
    dispatch(addInWishlist({ productId: productId }))
    .then(() => {
      dispatch(getWishlist())
    })
  };

  const handleRemoveFromWishlist = () => {
    dispatch(removeFromWishlist({ productId: productId }))
    .then(() => {
      dispatch(getWishlist())
    })
  };

  

  return (
    <div>
      {error || !product || loading ? (
        <div className='description'>
          <div className='product-img' style={{backgroundColor: "#F5F5F5"}}></div>
          <div className='detail' style={{alignItems: "flex-start", width: "100%"}}>
            <div className='group'>
              <div className='title1'></div>
            </div>
            <div className='group'>
              <div className='text1'></div>
              <div className='text2'></div>
              <div className='text3'></div>
              <div className='text4'></div>
            </div>
            <div className='group'>
              <div className='text5'></div>
            </div>
            <div className='group2'>
              <button className='buy1'></button>
            </div>
          </div>
        </div>
      ): (
        <div className='description'>
          <img src={product.product_img} alt={product.name} className='product-img' />
          <div className='detail'>
            <div className='group'>
              <h1>{product.name}</h1>
              <p>{product.description}</p>
            </div>
            <div className='group'>
              <p>Color:</p>
              <div className={product.color === 'grey' ? 'color' : 'color2'}></div>
            </div>
            <div className='group'>
              <p>Price:</p>
              <p>${product.price}</p>
            </div>
            <div className='group2'>
              <button className='buy' onClick={handleAddToCart}>Add to cart</button>
              {isInWishlist ? (
                <button className='add' onClick={handleRemoveFromWishlist}>Remove from wishlist</button>
              ) : (
                <button className='add' onClick={handleAddToWishlist}>Add to wishlist</button>
              )}
            </div>
          </div>
        </div>
      )}
      <section className='banner'>
        <img src='https://www.vanmoof.com/sites/default/files/2023-02/CTA-D-H01-v2.jpg' alt='banner-voltbike' className='banner-img' />
      </section>
    </div>
  );
};

export default Product;