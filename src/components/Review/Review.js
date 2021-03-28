import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Card from '../Card/Card';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';

const Review = () => {
    const [card, setCart]= useState([]);

    const [totalProducts, setTotalProducts] = useState(0);

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
            const products = data.map((product, i) => {
                product.quantity = counts[i];
                return product;
            })
            const total = products.reduce((total, product)=> total + product.quantity,0);
            setTotalProducts(total);
            setCart(products);
        })
        .catch(err => console.log (err));
    }, []);

    const removeItem = key => {
        const newCart = card.filter(product=>product.key!==key);
        setCart(newCart);
        removeFromDatabaseCart(key);
        const total = newCart.reduce((total, product)=> total + product.quantity,0);
        setTotalProducts(total);
    }

    const history =  useHistory();
    const handleProceedCheckout = () => {
        history.push('/shipment');
    }

    return (
        <div className='review shop-review'>

            <div className='products'>
                <div>
                    <h1>Order Items : {card.length}</h1>
                    <h2>Total Products : {totalProducts}</h2>
                </div>
                {
                    card.map(product=> <ReviewItem product={product} key={product.key} removeItem={removeItem} />)
                }
            </div>

            <div className='cart'>
                <Card cart={card}>
                    { card.length !== 0 && <button onClick={handleProceedCheckout} className="add-cart-btn">Proceed Checkout</button>}
                </Card>
            </div>
            
        </div>
    );
};

export default Review;