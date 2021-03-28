import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { userContext } from '../../App';
import orderedImg from '../../images/giphy.gif';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {

    const [loggedInUser] = useContext(userContext);
    const {email, name} = loggedInUser;
    const { register, handleSubmit, errors } = useForm();

    const [shipmentError, setShipmentError] = useState("");

    const [ordered, setOrdered] = useState(false);

    const onSubmit = data => {
        const savedCard = getDatabaseCart();
        const keys = Object.keys(savedCard);

        if (keys.length) {
            const orderDetails = {...loggedInUser, products: savedCard, shipment: data, orderDate: new Date().toDateString("dd/MM/yyyy"), orderTime: new Date().toTimeString()};
            fetch('https://emma-jhons.herokuapp.com/placeOrder', {
                method: 'POST',
                body: JSON.stringify(orderDetails),
                headers: {"Content-Type": "application/json"}
            })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    processOrder();
                    setOrdered(true);
                }
            });
        }
        else{
            setShipmentError("You must select a product");
        };
    };

    const congratsOrder = <div style={{textAlign: 'center'}}>
                            <h1 style={{color: '#3d43f5'}}>Thank You for Order</h1>
                            <img style={{maxWidth: '95%', borderRadius: '10px'}} src={orderedImg} alt=""/>
                        </div>

    return (
        <div className='shipment'>
            {!ordered && <>
            <h1>Shipment Form</h1>
            <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                <input name="name" defaultValue={name} ref={register({ required: true })} placeholder='Your Name..' />
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
            <p className='error'>{shipmentError}</p>
            </>}
            <div style={{textAlign: 'center'}}>
                    { ordered && congratsOrder }
            </div>
        </div>
    );
};

export default Shipment;