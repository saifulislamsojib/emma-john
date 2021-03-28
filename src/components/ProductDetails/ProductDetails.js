import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import Product from '../Product/Product';

const ProductDetails = () => {
    const { productKey } = useParams();
    const [product, setProduct] =  useState({});

    useEffect(() => {
        fetch(`https://emma-jhons.herokuapp.com/product/${productKey}`)
        .then(res => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.log(err));
    }, [productKey])

    return (
        <div>
            { product.key ? <div>
                <h1>Your Product Details:</h1>
                <Product product={product} />
            </div> : <NotFound />}
        </div>
    );
};

export default ProductDetails;