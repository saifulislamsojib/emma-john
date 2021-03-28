import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png';
import { handleSignOut } from '../LogIn/logInManager';
import './Header.css';

const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    const signOut = () => {
        handleSignOut()
        .then(res => {
            setLoggedInUser(res);
            localStorage.removeItem('user');
        })
    }
    return (
        <div className="header">
            <div className="header-img">
                <img src={logo} alt=""/>
            </div>
            <nav>
                <Link className='link' to="/">Shop</Link>
                <Link className='link' to="/review">Order review</Link>
                <Link className='link' to="/inventory">Manage Inventory</Link>
                { loggedInUser?.email ? <button className="signOut-button" onClick={signOut}>Sign out</button>:
                    <Link to="/login">
                        <button className="signIn-button">Sign in</button>
                    </Link>
                }
            </nav>
        </div>
    );
};

export default Header;