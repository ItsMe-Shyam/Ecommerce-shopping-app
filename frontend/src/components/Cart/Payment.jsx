import React, {Fragment, useRef, useEffect} from 'react';
import { Typography } from '@material-ui/core';
import CheckoutSteps from './CheckoutSteps';
import {useSelector, useDispatch} from 'react-redux';
// import MetaData from '../layout/MetaData';
import {useAlert} from 'react-alert';
import {CardNumberElement, CardCvcElement, useStripe, useElements, CardExpiryElement} from '@stripe/react-stripe-js';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import EventIcon from '@material-ui/icons/Event';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import './Payment.css';
import axios from 'axios';

import {clearErrors, newOrder} from '../../actions/orderActions';

const Payment = ({history}) => {
  const paymentInfo = JSON.parse(sessionStorage.getItem("paymentInfo"));

  const alert = useAlert();
  const elements = useElements();
  const stripe = useStripe();
  const dispatch = useDispatch();
  const {cartItems, shippingInfo} = useSelector(state => state.cart);
  const {user} = useSelector(state => state.user)
  const {error} = useSelector(state => state.newOrder);
  
  const btnRef = useRef(null);

  const paymentSubmitHandler = async(e) => {
    e.preventDefault();
    btnRef.current.disabled = true;

    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: paymentInfo.subtotal,
      taxPrice: paymentInfo.tax,
      shippingPrie: paymentInfo.charges,
      totalPrice: paymentInfo.total,
    }

    const paymentData = {
      amount: Math.round(paymentInfo.total * 100) // we are multiplying with 100 because it requires the amount to be in "paise" 
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const {data} = await axios.post("/api/payment/process", paymentData, config);

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        btnRef.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(newOrder(order));

          history.push("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      btnRef.current.disabled = false;
      alert.error(error.response.data.message);
    }
  }
  useEffect(() => {
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error])

  return (
    <Fragment>
      <CheckoutSteps activesteps={2} />
      <form onSubmit={paymentSubmitHandler} className="payment-form">
        <Typography>Card Info</Typography>
        <div>
          <CreditCardIcon/>
          <CardNumberElement className='payment-input' />
        </div>
        <div>
          <EventIcon />
          <CardExpiryElement className='payment-input' />
        </div>
        <div>
          <VpnKeyIcon/>
          <CardCvcElement className="payment-input" />
        </div>
        <input ref={btnRef} type="submit" className='submit-button' value={`Pay - ${paymentInfo && paymentInfo.total}`} />
      </form>
    </Fragment>
  )
}

export default Payment