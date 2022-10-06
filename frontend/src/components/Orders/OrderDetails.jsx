import React, { Fragment, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
// import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, orderDetails } from "../../actions/orderActions";
import "./OrderDetails.css";

const OrderDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, order, loading } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(orderDetails(match.params.id));
  }, [alert, error, dispatch, match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="order-info">
          <h1>Shipping Info</h1>
          <div>
            <b>Name :</b>
            <span>{order.user && order.user.name}</span>
          </div>
          <div>
            <b>Phone number :</b>
            <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
          </div>
          <div>
            <b>Address :</b>
            <span>
              {order.shippingInfo &&
                `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}
            </span>
          </div>
          <h1>Payment Info</h1>
          <div>
            <b>Status :</b>
            <span
              className={
                order.paymentInfo && order.paymentInfo.status === "succeeded"
                  ? "greenColor"
                  : "redColor"
              }
            >
              {order.paymentInfo && order.paymentInfo.status === "succeeded"
                ? "PAID"
                : "NOT PAID"}
            </span>
          </div>
          <div>
            <b>Amount :</b>
            <span>{order.totalPrice && order.totalPrice}</span>
          </div>
          <h1>Order Status</h1>
          <div>
            <b
              className={
                order.orderStatus && order.orderStatus === "Delivered"
                  ? "greenColor"
                  : "redColor"
              }
            >
              {order.orderStatus && order.orderStatus}
            </b>
          </div>
          <h1>Order Items :</h1>
          {order.orderItems &&
            order.orderItems.map((item) => (
              <div key={item.name} className="orderItemsContainer">
                <img src={item.image} alt="" />
                 <div>
                    <b>{item.name}</b>
                    <p>
                      {item.quantity} X {item.price} ={" "}
                      <b>₹{item.quantity * item.price}</b>
                    </p>
                  </div>
              </div>
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default OrderDetails;
