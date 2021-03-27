import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = ({product, handleProduct}) => {
    const { name, img, seller, price, stock, key } = product;
    return (
        <div className="product">
            <div className='product-img'>
                <img src={img} alt=""/>
            </div>
            <div className='product-info'>
                { handleProduct ? <h3><Link className='product-name' to={`/product/${key}`}>{name}</Link></h3> : <h3 className='product-name'>{name}</h3> }
                <p>by : {seller}</p>
                <h4>$ {price}</h4>
                <p>only {stock} left in stock - order soon</p>
                { handleProduct && <button onClick={() => handleProduct(product)} className="add-cart-btn">
                    <FontAwesomeIcon icon={faShoppingCart} style={{marginRight: "3px"}} /> 
                    add to cart
                </button>}
            </div>
        </div>
    );
};

export default Product;