import React, { Fragment } from "react";
import "./Cart.css";
import CartItem from "./CartItem.jsx";
import { useSelector } from "react-redux";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import {Link} from 'react-router-dom';

const Cart = ({history}) => {
  const { cartItems } = useSelector((state) => state.cart);

  const checkOutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Fragment>
      {!cartItems.length ? (
          <div className="no-item">
              <RemoveShoppingCartIcon/>
              <h1>No Items in your cart.</h1>
              <Link to="/products">View Products</Link>
          </div>
      ) : (
        <div className="cartContainer">
          <ul className="cartHeader">
            <li>Product</li>
            <li>Quantity</li>
            <li>Subtotal</li>
          </ul>
          <div className="cartMain">
            {cartItems &&
              cartItems.map((i) => <CartItem key={i.product} item={i} />)}
          </div>
          <div className="cartTotal">
            <div>
              <p>Gross Total</p>
              <h3>₹{cartItems.reduce(   // the reduce method applies the functionality to every element of the array
                (acc, item) => acc + item.price * item.quantity, 0
              )}</h3>
            </div>
            <button onClick={checkOutHandler}>Check Out</button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Cart;
