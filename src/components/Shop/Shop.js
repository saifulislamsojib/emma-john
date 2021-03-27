import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Card from '../Card/Card';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products] = useState(first10);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCard = getDatabaseCart();
        const keys = Object.keys(savedCard);
        const products = keys.map(key => {
            const product = fakeData.find(product => product.key === key);
            const count = savedCard[key];
            product.quantity = count;
            return product;
        });
        setCart(products);
    }, []);

    const handleProduct = (product) => {
        const addedProduct = cart.find(pd => pd.key === product.key);
        let newCart;
        if (addedProduct) {
            addedProduct.quantity = addedProduct.quantity + 1;
            const otherProducts = cart.filter(pd => pd.key !== product.key);
            newCart = [...otherProducts, addedProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, product.quantity);
    }

    return (
        <div className="shop-review">
            <div className="products">
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