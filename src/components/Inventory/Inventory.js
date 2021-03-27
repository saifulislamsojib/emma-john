import React, { useContext, useState } from 'react';
import { userContext } from '../../App';
import { DeleteUserAccount, handleSignOut } from '../LogIn/logInManager';

const Inventory = () => {

    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const {displayName, email, photoURL, name, photo} = loggedInUser;
    const [warn, setWarn] = useState(false);

    const DeleteAccount = ()=> {
        DeleteUserAccount()
        ?.then(()=> {
            handleSignOut()
            .then(res => {
            setLoggedInUser(res);
            localStorage.removeItem('user');
        })
        })
        .catch(()=> {

        })
    }

    return (
        <div className='inventory'>
            <h1>Hi! {name || displayName}</h1>
            <h3>Your Email: {email}</h3>
            <img src={photo || photoURL} alt=""/>
            <button onClick={()=> setWarn(true)} className="signOut-button delete">Delete Account</button>
            {warn && <>
                <p className='error'>Are you sure you want to delete this account?</p>
                <button onClick={DeleteAccount} className='yseNo signOut-button'>Yes</button>
                <button onClick={()=> setWarn(false)} className='yseNo signIn-button'>No</button>
            </>}
        </div>
    );
};

export default Inventory;