import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './product.css';
import Navbar from '../components/navbar/navbar';
import { addProductToCart, fetchCart, updateTotalPrice } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const Product = ({ loading, products, error, loadingCart, cart, total, allQuantity, errorCart }) => {
  const { id } = useParams();
  const productId = parseInt(id);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find((product) => product.product_id === productId);
    setProduct(foundProduct);
  }, [products, productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addProductToCart({ productId: product.product_id, quantity: 1, price: product.price }))
      .then(() => {
        dispatch(fetchCart());
        navigate('/cart');
      });
    }
  };

  if (error || !product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Navbar />
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
            <button className='add'>Add to wishlist</button>
          </div>
        </div>
      </div>
      <section className='banner'>
        <img src='https://www.vanmoof.com/sites/default/files/2023-02/CTA-D-H01-v2.jpg' alt='banner-voltbike' className='banner-img' />
      </section>
      <footer>
        <h2>VoltBike</h2>
        <p>© 2024 VoltBike - Designed with passion by Gabriel Hazout. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Product;
