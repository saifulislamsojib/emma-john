import React, { useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { userContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {

    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        user && setLoggedInUser(user);
      }, [setLoggedInUser]);
    return (
        <div>
            <Route
            {...rest}
            render={({ location }) =>
                loggedInUser?.email ? (
                children
                ) : (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: location }
                    }}
                />
                )
            }
            />
        </div>
    );
};

export default PrivateRoute;