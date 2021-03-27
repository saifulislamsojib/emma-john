import React from 'react';
import { Link } from 'react-router-dom';
import './ReviewItem.css'

const ReviewItem = ({product, removeItem}) => {
    const {name, price, quantity, key} = product;
    return (
        <div className="review-item">
            <h3><Link className='product-name' to={`/product/${key}`}>{name}</Link></h3>
            <h4>price: ${price}</h4>
            <h4>Quantity: {quantity}</h4>
            <button onClick={() => removeItem(key)} className='add-cart-btn'>Remove</button>
        </div>
    );
};

export default ReviewItem;