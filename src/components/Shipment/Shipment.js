import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { userContext } from '../../App';
import './Shipment.css';

const Shipment = () => {

    const [loggedInUser] = useContext(userContext);
    const {displayName, email, name} = loggedInUser;
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div className='shipment'>
            <h1>Shipment Form</h1>
            <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                <input name="name" defaultValue={displayName || name} ref={register({ required: true })} placeholder='Your Name..' />
                {errors.name && <span className="error">This field is required</span>}

                <input name="email" defaultValue={email} ref={register({ required: true })} placeholder='Your Email..' />
                {errors.email && <span className="error">This field is required</span>}

                <input type="number" name="phone" ref={register({ required: true })} placeholder='Your Phone Number..' />
                {errors.phone && <span className="error">This field is required</span>}

                <input name="city" ref={register({ required: true })} placeholder='Your City..' />
                {errors.city && <span className="error">This field is required</span>}

                <input name="address" ref={register({ required: true })} placeholder='Your Detail Address..' />
                {errors.address && <span className="error">This field is required</span>}
                <input type="submit" />
            </form>
        </div>
    );
};

export default Shipment;