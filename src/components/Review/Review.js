import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import fakeData from '../../fakeData';
import orderedImg from '../../images/giphy.gif';
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
        let total = 0;
        const products = keys.map(key => {
            const product = fakeData.find(product => product.key === key);
            const count = savedCard[key];
            product.quantity = count;
            total = total + count;
            return product;
        });
        setTotalProducts(total);
        setCart(products);

    }, []);

    const removeItem = key => {
        const newCart = card.filter(product=>product.key!==key);
        setCart(newCart);
        removeFromDatabaseCart(key);
        const total = newCart.reduce((total, product)=> total + product.quantity,0);
        setTotalProducts(total);
    }
    const [ordered] = useState(false);
    // const handleOrderNow = () => {
    //     setCart([]);
    //     setOrdered(true);
    //     processOrder();
    // }

    const history =  useHistory();
    const handleProceedCheckout = () => {
        history.push('/shipment');
    }
    const congratsOrder = <div style={{textAlign: 'center'}}>
                            <h1 style={{color: '#3d43f5'}}>Thank You for Order</h1>
                            <img style={{maxWidth: '100%'}} src={orderedImg} alt=""/>
                        </div>
    return (
        <div className='review shop-review'>
            <div className='products'>
                { !ordered && <div>
                    <h1>Order Items : {card.length}</h1>
                    <h2>Total Products : {totalProducts}</h2>
                </div>}
                {
                    card.map(product=> <ReviewItem product={product} key={product.key} removeItem={removeItem} />)
                }
                <div style={{textAlign: 'center'}}>
                    { ordered && congratsOrder }
                </div>
            </div>
            <div className='cart'>
                <Card cart={card}>
                    { card.length !== 0 && !ordered && <button onClick={handleProceedCheckout} className="add-cart-btn">Proceed Checkout</button>}
                </Card>
            </div>
        </div>
    );
};

export default Review;