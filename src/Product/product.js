import React from 'react';
import { useParams } from 'react-router-dom';
import { Products } from '../assets/data/productdata';
import './product.css';
import Navbar from '../components/navbar/navbar';

const Product = () => {
  const { id } = useParams();
  const product = Products.find((product) => product.id === id);

  if (!product) {
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
            <button className='add'>Add to cart</button>
            <button className='buy'>Buy now</button>
          </div>
        </div>
      </div>
      <section className='banner'>
        <img src='https://www.vanmoof.com/sites/default/files/2023-02/CTA-D-H01-v2.jpg' className='banner-img' />
      </section>
      <footer>
        <h2>VoltBike</h2>
        <p>© 2024 VoltBike - Designed with passion by Gabriel Hazout. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Product;
