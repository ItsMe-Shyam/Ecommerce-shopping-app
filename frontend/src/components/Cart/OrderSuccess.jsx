import React from "react";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import './OrderSuccess.css';

const OrderSuccess = () => {
  return (
    <div className="success-container">
      <CheckCircleIcon />
      <h1>Your Order has been successfully placed.</h1>
      <Link to="/orders">
        <button>Your Orders</button>
      </Link>
    </div>
  );
};

export default OrderSuccess;
