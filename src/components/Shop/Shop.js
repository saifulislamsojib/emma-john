import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Card from '../Card/Card';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://emma-jhons.herokuapp.com/products')
        .then(res => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.log(err));
    }, []);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCard = getDatabaseCart();
        const keys = Object.keys(savedCard);
        const counts = Object.values(savedCard);

        fetch("https://emma-jhons.herokuapp.com/productsByKeys", {
            method: "POST",
            body: JSON.stringify(keys),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(data => {
            const matchedProducts = data.map((product, i) => {
                product.quantity = counts[i];
                return product;
            })
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