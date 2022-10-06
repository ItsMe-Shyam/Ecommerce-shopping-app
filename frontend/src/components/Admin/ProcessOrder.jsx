import React, { Fragment, useState } from "react";
import "../Orders/processOrder.css";
import Sidebar from "./Sidebar";
import Loader from "../layout/Loader/Loader";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { orderDetails, updateOrder, clearErrors } from "../../actions/orderActions";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = ({ match, history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(match.params.id, myForm))
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order updated successfully!");
      dispatch({type: UPDATE_ORDER_RESET})
      // history.push(`/admin/order/${match.params.id}`);
    }
    dispatch(orderDetails(match.params.id));
  }, [alert, error, dispatch, isUpdated, match.params.id, updateError]);

  return (
    <Fragment>
      <div className="dashboard">
        <div style={{ flex: "0 0 20%" }} className="dashboardSide">
          <Sidebar />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="updateOrderContainer">
            <div
              style={{
                borderLeft: "1px solid rgba(0, 0, 0, 0.363)",
              }}
              className="order-info"
            >
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
                    order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
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
                    order.orderStatus && order.orderStatus === "delivered"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order.orderStatus && order.orderStatus}
                </b>
              </div>
              <h1>Your cart Items :</h1>
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
            <div
            style={{display: order.orderStatus === 'delivered' ? "none": "block"}}
            >
              <form
                className="updateOrderForm"
                onSubmit={updateOrderSubmitHandler}
              >
                <h1>Process Order</h1>

                <div>
                  <AccountTreeIcon />
                  <select onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Choose Category</option>
                    {order.orderStatus === "processing" && (
                      <option value="shipped">Shipped</option>
                    )}

                    {order.orderStatus === "shipped" && (
                      <option value="delivered">Delivered</option>
                    )}
                  </select>
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={
                    loading ? true : false || status === "" ? true : false
                  }
                >
                  Process
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
