import React,{Fragment} from 'react';
import {useSelector} from 'react-redux';
import './ConfirmOrder.css';
import CheckoutSteps from './CheckoutSteps';

const ConfirmOrder = ({history}) => {
    const {shippingInfo, cartItems} = useSelector(state => state.cart);
    const {user} = useSelector(state => state.user)
    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price,
     0)
    const tax = 0.18 * subtotal;

    const charges = subtotal > 1000 ? 0 : 200;

    const total = subtotal + tax + charges;

    const paymentHandler = () => {
        const data = {
            subtotal,
            tax,
            charges,
            total
        }
        sessionStorage.setItem("paymentInfo", JSON.stringify(data));
        history.push('/process/payment');
    }
  return (
    <Fragment>
        <CheckoutSteps activesteps={1} />
        <div className="confirm-container">
            <div className='confirm-info'>
                <h1>Shipping Info</h1>
                <div>
                    <b>Name :</b>
                    <span>{user.name}</span>
                </div>
                <div>
                    <b>Phone number :</b>
                    <span>{shippingInfo.phoneNo}</span>
                </div>
                <div>
                    <b>Address :</b>
                    <span>{shippingInfo.address}, {shippingInfo.state}, {shippingInfo.city}, {shippingInfo.pincode}, {shippingInfo.country}</span>
                </div>
                <h1>Cart Items :</h1>
                {
                    cartItems.map(item => (
                        <div key={item.name} className='confirm-item-container'> 
                            <img src={item.image} alt="" />
                            <span>{item.name}</span>
                            <p>{item.quantity} X {item.price} = <b>₹{item.quantity*item.price}</b></p>
                        </div>
                    ))
                }
            </div>
            <div className='confirm-total'>
                <h1>Order Summary</h1>
                <div>
                    <p>Subtotal:</p>
                    <p>{subtotal}</p>
                </div>
                <div>
                    <p>GST:</p>
                    <p>{tax}</p>
                </div>
                <div>
                    <p>Shipping charges:</p>
                    <p>{charges}</p>
                </div>
                <div>
                    <b>Total:</b>
                    <b>{total}</b>
                </div>
                <button onClick={paymentHandler}>Proceed To Pay</button>
            </div>
        </div>
    </Fragment>
  )
}

export default ConfirmOrder