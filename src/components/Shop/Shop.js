import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import spinner from '../../images/Spinner.svg';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Card from '../Card/Card';
import Product from '../Product/Product';
import './Shop.css';

const Shop = ({products}) => {
    
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCard = getDatabaseCart();
        const keys = Object.keys(savedCard);

        fetch("https://emma-jhons.herokuapp.com/productsByKeys", {
            method: "POST",
            body: JSON.stringify(keys),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(data => {
            const matchedProducts = data.map(product => {
                product.quantity = savedCard[product.key];
                return product;
            });
            setCart(matchedProducts);
        })
        .catch(err => console.log (err));
    }, []);

    const handleProduct = (product) => {
        const addedProduct = cart.find(pd => pd.key === product.key);
        let newCart;
        if (addedProduct) {
            addedProduct.quantity = addedProduct.quantity + 1;
            const otherProducts = cart.filter(pd => pd.key !== product.key);
            newCart = [...otherProducts, addedProduct];
            addToDatabaseCart(product.key, addedProduct.quantity);
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
            addToDatabaseCart(product.key, product.quantity);
        }
        setCart(newCart);
    }

    return (
        <div className="shop-review">
            <div className="products">
                {products.length === 0 &&
                <div className="spinner">
                    <img src={spinner} alt=""/>
                </div>}
                {
                    products.map(product => <Product product={product} handleProduct={handleProduct} key={product.key} /> )
                }
            </div>
            <div className="cart">
                <Card cart={cart}>
                <Link to="/review">
                    <button className="add-cart-btn">Review Your Order</button>
                </Link>
                </Card>
            </div>
        </div>
    );
};

export default Shop;