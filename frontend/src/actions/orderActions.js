import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";
import axios from 'axios';


export const newOrder = (details) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/orders/new", details, config);
    dispatch({ type: ORDER_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({ type: ORDER_FAIL, error: error.response.data.message });
  }
};

export const myOrders = () => async (dispatch) => {

    try {
        dispatch({type: MY_ORDER_REQUEST})
        const { data } = await axios.get("/api/myOrders");
        dispatch({type: MY_ORDER_SUCCESS, payload: data.orders});
    } catch(error) {
        dispatch({type: MY_ORDER_FAIL, payload: error.response.data.message})
    }
    
};

export const orderDetails = (id) => async(dispatch) => {
  try {
      dispatch({type: ORDER_DETAILS_REQUEST})
      const {data} = await axios.get(`/api/orders/${id}`);
      dispatch({type: ORDER_DETAILS_SUCCESS, payload: data.order})
  } catch(error) {
    dispatch({type: ORDER_DETAILS_FAIL, payload: error.response.data.message})
  }
}

export const allOrders = () => async(dispatch) => {
  try {
      dispatch({type: ALL_ORDERS_REQUEST})
      const {data} = await axios.get('/api/admin/orders');
      dispatch({type: ALL_ORDERS_SUCCESS, payload: data})
  } catch(error) {
    dispatch({type: ALL_ORDERS_FAIL, payload: error.response.data.message})
  }
}

export const updateOrder = (id, details) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/orders/${id}`, details, config);
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_ORDER_FAIL, error: error.response.data.message });
  }
};

export const deleteOrder = (id) => async(dispatch) => {
  try {
      dispatch({type: DELETE_ORDER_REQUEST})
      const {data} = await axios.delete(`/api/admin/orders/${id}`);
      dispatch({type: DELETE_ORDER_SUCCESS, payload: data.success})
  } catch(error) {
    dispatch({type: DELETE_ORDER_FAIL, payload: error.response.data.message})
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
