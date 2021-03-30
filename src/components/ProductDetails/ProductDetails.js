import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import spinner from '../../images/Spinner.svg';
import NotFound from '../NotFound/NotFound';
import Product from '../Product/Product';

const ProductDetails = () => {
    const { productKey } = useParams();
    const [product, setProduct] =  useState({});
    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(() => {
        fetch(`https://emma-jhons.herokuapp.com/product/${productKey}`)
        .then(res => res.json())
        .then((data) => {
            setProduct(data)
            setShowSpinner(false);
        })
        .catch((err) => {
            console.log(err);
            setShowSpinner(false);
        });
    }, [productKey]);

    return (
        <div>
            { product.key ?
            <div>
                <h1>Your Product Details:</h1>
                <Product product={product} />
            </div> : showSpinner ? 
            <div className="spinner">
                <img src={spinner} alt=""/>
            </div>
            : <NotFound />}
        </div>
    );
};

export default ProductDetails;