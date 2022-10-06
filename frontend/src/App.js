import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";

import AllProducts from "./components/Home/AllProducts/AllProducts";
import Search from "./components/Search/Search";
import LoginSignup from "./components/User/LoginSignup";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping.jsx";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Orders/MyOrders";
import OrderDetails from "./components/Orders/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductsList from "./components/Admin/ProductsList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import AllOrders from "./components/Admin/AllOrders";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import store from "./store";
import { loadUser } from "./actions/userActions";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";

import ProtectedRoute from "./components/Route/ProtectedRoute";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  const getApiKey = async () => {
    const { data } = await axios.get("/api/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  };
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getApiKey();
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path="/" component={Home} />
      <Route path="/product/:productId" component={ProductDetails} />
      <Route exact path="/products" component={AllProducts} />
      <Route path="/products/:keyword" component={AllProducts} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/login" component={LoginSignup} />
      <Route exact path="/cart" component={Cart} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />
      <ProtectedRoute exact path="/shipping" component={Shipping} />
      <ProtectedRoute exact path="/orders" component={MyOrders} />
      <ProtectedRoute exact path="/success" component={OrderSuccess} />

      <ProtectedRoute
        isAdmin
        exact
        path="/admin/dashboard"
        component={Dashboard}
      />
      <ProtectedRoute
        isAdmin
        exact
        path="/admin/products"
        component={ProductsList}
      />
      <Switch>
        <ProtectedRoute
          isAdmin
          exact
          path="/admin/products/new"
          component={NewProduct}
        />
        <ProtectedRoute
          isAdmin
          exact
          path="/admin/products/:id"
          component={UpdateProduct}
        />
      </Switch>
      <ProtectedRoute
        isAdmin
        exact
        path="/admin/orders"
        component={AllOrders}
      />
      
      <ProtectedRoute
        isAdmin
        exact
        path="/admin/order/:id"
        component={ProcessOrder}
      />

      <ProtectedRoute
        isAdmin
        exact
        path="/admin/users"
        component={UsersList}
      />

      <ProtectedRoute
        isAdmin
        exact
        path="/admin/user/:id"
        component={UpdateUser}
      />

      <ProtectedRoute
        isAdmin
        exact
        path="/admin/reviews"
        component={ProductReviews}
      />

      <Switch>
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute path="/order/:id" component={OrderDetails} />
      </Switch>

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />
      <Footer />
    </Router>
  );
}

export default App;
