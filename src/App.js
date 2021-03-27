import { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import LogIn from './components/LogIn/LogIn';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Review from './components/Review/Review';
import Shipment from './components/Shipment/Shipment';
import Shop from './components/Shop/Shop';

export const userContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    user && setLoggedInUser(user);
    setIsRender(true);
  }, []);
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Shop />
            </Route>
            <Route path="/shop">
              <Shop />
            </Route>
            <Route path="/review">
              <Review />
            </Route>
            {isRender &&
            <PrivateRoute path="/inventory">
              <Inventory />
            </PrivateRoute>}
            {isRender &&
            <PrivateRoute path="/shipment">
              <Shipment />
            </PrivateRoute>}
            <Route path="/login">
              <LogIn />
            </Route>
            <Route path="/product/:productKey">
              <ProductDetails />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    </userContext.Provider>
  );
}

export default App;
