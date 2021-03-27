import React from 'react';
import './Card.css';

const Card = ({cart, children}) => {
    const total = cart.reduce((total, pd) => total + pd.price * pd.quantity, 0);
    let shippingCost = 0;
    if (!total) {
        shippingCost = 0;
    }
    else if (total < 8) {
        shippingCost = 12.99;
    }
    else if (total < 50) {
        shippingCost = 8.99;
    }
    else if (total < 80) {
        shippingCost = 4.89;
    }
    else{
        shippingCost = 0.99;
    }
    const withoutTax = total + shippingCost;
    const tax = withoutTax * 0.1;
    const grandTotal = withoutTax + tax;

    const fixedNumber = num => Number(num.toFixed(2));
    return (
        <div>
            <h1 style={{textAlign: 'center'}} >Order Summary</h1>
            <h3 style={{textAlign: 'center'}}>Items ordered : {cart.length}</h3>
            <div className="prices">
                <div className="price-details">
                    <p>Product Price :</p>
                    <p>Shipping Cost :</p>
                    <p>Price Before Tax :</p>
                    <p>Tax/Vat :</p>
                    <h3 className="total">Total Price :</h3>
                </div>
                <div className="price">
                    <p>$ {fixedNumber(total)}</p>
                    <p>$ {shippingCost}</p>
                    <p>$ {fixedNumber(withoutTax)}</p>
                    <p>$ {fixedNumber(tax)}</p>
                    <h3 className="total">$ {Number(grandTotal.toFixed(2))}</h3>
                </div>
            </div>
            {children}
        </div>
    );
};

export default Card;