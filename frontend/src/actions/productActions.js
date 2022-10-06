import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  ADMIN_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  PRODUCT_REVIEWS_REQUEST,
  PRODUCT_REVIEWS_SUCCESS,
  PRODUCT_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
} from "../constants/productConstants";
import axios from "axios";

export const getProducts = (keyword="", currentPage = 1, price=[0, 25000], category) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });

    let link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

    if(category) {
      link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
    }

    const { data } = await axios.get(link);
    dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getAllAdminProducts = () => async(dispatch) => {
  try {
    dispatch({type: ADMIN_PRODUCTS_REQUEST})
    const {data} = await axios.get("/api/admin/products");
    dispatch({type: ADMIN_PRODUCTS_SUCCESS, payload: data.products})
  } catch(error) {
    dispatch({type: ADMIN_PRODUCTS_FAIL, payload: error.response.data.message});
  }
}

export const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const {data} = await axios.get(`/api/products/${productId}`);  

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const addNewReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const {data} = await axios.put(`/api/products/${reviewData.productId}/reviews/new`, reviewData, config);  

    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (err) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getProductReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REVIEWS_REQUEST });

    const {data} = await axios.get(`/api/products/${productId}/reviews`);  

    dispatch({ type: PRODUCT_REVIEWS_SUCCESS, payload: data.reviews });
  } catch (err) {
    dispatch({
      type: PRODUCT_REVIEWS_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const deleteReview = (productId, reviewId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const {data} = await axios.delete(`/api/products/${productId}/reviews/${reviewId}`);  

    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data.success });
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const addNewProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const {data} = await axios.post(`/api/products/new`, productData, config);  

    dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const {data} = await axios.delete(`/api/admin/products/${productId}`);  

    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const updateProduct = (productId, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "content-type": "application/json"
      }
    }

    const {data} = await axios.put(`/api/admin/products/${productId}`, productData, config);  

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: err.response.data.message,
    });
  }
};



// Clearing errors

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
