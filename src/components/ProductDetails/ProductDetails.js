import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import NotFound from '../NotFound/NotFound';
import Product from '../Product/Product';

const ProductDetails = () => {
    const { productKey } = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    return (
        <div>
            { product ? <div>
                <h1>Your Product Details:</h1>
                <Product product={product} />
            </div> : <NotFound />}
        </div>
    );
};

export default ProductDetails;