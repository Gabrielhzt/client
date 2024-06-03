import React from 'react';
import { useParams } from 'react-router-dom';
import { Products } from '../assets/data/productdata';
import './product.css';

const Product = () => {
  const { id } = useParams();
  const product = Products.find((product) => product.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='description'>
      <img src={product.product_img} alt={product.name} />
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Color: {product.color}</p>
        <p>Price: ${product.price}</p>
      </div>
    </div>
  );
};

export default Product;
