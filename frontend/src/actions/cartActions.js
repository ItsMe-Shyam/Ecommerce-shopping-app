import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";
import axios from 'axios';

export const addItemToCart = (id, quantity) => async(dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`);
    dispatch({type: ADD_TO_CART, payload: {
        product: data.product._id,
        name: data.product.name,
        image: data.product.images[0].url,
        price: data.product.price,
        stock: data.product.stock,
        quantity
    }})

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (id) => async(dispatch, getState) => {

    dispatch({type: REMOVE_FROM_CART, payload: id});

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    
}

export const saveShippingInfo = (info) => async(dispatch) => {
    dispatch({type: SAVE_SHIPPING_INFO, payload: info});

    localStorage.setItem("shippingInfo", JSON.stringify(info));
}