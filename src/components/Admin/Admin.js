import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Admin.css';

const Admin = () => {

    const { register, handleSubmit, errors } = useForm();

    const [isUploaded, setIsUploaded] = useState(false);

    const onSubmit = data => {
        fetch('https://emma-jhons.herokuapp.com/addProduct', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(result=>setIsUploaded(result));
    };

    return (
        <div className='admin'>
            <h1>Admin Panel</h1>
            <form className="admin-form" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name="name" placeholder="Product Name" ref={register({ required: true })} />
                {errors.name && <span className="error">This field is required</span>}
                <input type="number" name="price" placeholder="Product Price" ref={register({ required: true })} />
                {errors.price && <span className="error">This field is required</span>}
                <input type="text" name="seller" placeholder="Product Company" ref={register({ required: true })} />
                {errors.seller && <span className="error">This field is required</span>}
                <input type="number" name="stock" placeholder="Product Stock" ref={register({ required: true })} />
                {errors.stock && <span className="error">This field is required</span>}
                <input type="file" name="img" />
                <input type="text" name="key" placeholder="Product Key" ref={register({ required: true })} />
                {errors.key && <span className="error last-error">This field is required</span>}
                <button type='submit' className='btn-primary'>Add Product</button>
            </form>
            {isUploaded && <h3 className='success'>Uploaded Successfully</h3>}
        </div>
    );
};

export default Admin;