import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { userContext } from "../../App";
import './LogIn.css';
import { createUser, fbProvider, gitProvider, googleProvider, handleSignIn, signInUserWithEmailAndPassword } from './logInManager';

const LogIn = () => {

    const [, setLoggedInUser] = useContext(userContext);

    const [newUser, setNewUser] = useState(false);

    const [admin, setAdmin] = useState({});

    const [userInput, setUserInput] = useState({});

    const [passwordType, setPasswordType] = useState({
        passwordTypes: 'password',
        passwordIcon: faEye
    });

    const [error, setError] = useState('');

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const signIn = (provider) => {
        updateUser(handleSignIn ,provider)
    }

    const updateUser = (User, user, create) => {
        User(user)
        .then(res => {
            if (res.email && !res.message) {
                if (create) {
                    updateUser(signInUserWithEmailAndPassword, user)
                }
                else{
                    if (res.email === admin.email) {
                        res.isAdmin = true;
                    }
                    setLoggedInUser(res);
                    localStorage.setItem('user', JSON.stringify(res));
                    history.replace(from);
                }
            }
            else{
                setError(res.message);
            }
        });
    };

    const handlePasswordType = () => {
        const {passwordTypes, passwordIcon} = passwordType;
        const changePassword = passwordTypes === 'password' ? 'text' : 'password';
        const changeIcon = passwordIcon === faEye ? faEyeSlash : faEye;
        const changedPassword = {
            passwordTypes: changePassword,
            passwordIcon: changeIcon
        }
        setPasswordType(changedPassword);
    };

    const handleSubmit = e => {
        const {email, password} = userInput;
        if (email && password && newUser) {
            updateUser(createUser, userInput, true)
        }
        if (email && password && !newUser) {
            updateUser(signInUserWithEmailAndPassword, userInput)
        }
        e.preventDefault();
    }

    const handleInput = e => {
        const {value, name} = e.target;
        let isValid = true;
        if (name === 'email') {
          isValid = /\S+@\S+\.\S+/.test(value);
        }
        if (name === 'password') {
          const passwordLength = value.length >= 6;
          const passwordHasNumber = /\d{1}/.test(value);
          isValid = passwordLength && passwordHasNumber;
        }
        if (isValid) {
          const validUser = {...userInput};
          validUser[name] = value;
          setUserInput(validUser);
        }
      }

      useEffect(() => {
        fetch('https://emma-jhons.herokuapp.com/emmaJhonsAdmin')
        .then(res=>res.json())
        .then(data => setAdmin(data))
      }, []);

      const {passwordTypes, passwordIcon} = passwordType;
    return (
        <div className="login">
            <div className='login-section'>
                <h1>Sign In</h1>
                <input onChange={()=> setNewUser(!newUser)} type="checkbox" id="newUser" />
                <label htmlFor="newUser">Sign Up</label>
                <br/>
                <br/>
                <form onSubmit={handleSubmit}>
                    {newUser &&
                    <input onBlur={handleInput} type="text" name="name" placeholder="Enter Name" required />}
                    <input onBlur={handleInput} type="email" name="email" placeholder="Enter your Email" required />
                    <div className='password-section'>
                        <input onBlur={handleInput} type={passwordTypes} name="password" placeholder="Enter your Password" required />
                        <FontAwesomeIcon onClick={handlePasswordType} className='eye' icon={passwordIcon} />
                    </div>
                    <input type="submit" value={newUser ? 'Sign up' : "Sign In"} required />
                </form>
                <p className="error">{error}</p>
                <FontAwesomeIcon onClick={()=> signIn(fbProvider)} className='icon fb' icon={faFacebook} />
                <FontAwesomeIcon onClick={()=> signIn(googleProvider)} className='icon google' icon={faGoogle} />
                <FontAwesomeIcon onClick={()=> signIn(gitProvider)} className='icon' icon={faGithub} />
            </div>
        </div>
    );
};

export default LogIn;