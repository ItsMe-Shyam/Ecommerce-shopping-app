import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "../constants/userConstants";

// login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: { "content-type": "application/json" },
    };

    const { data } = await axios.post(
      "/api/login",
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err.response.data.message });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = { headers: { "content-type": "multipart/form-data" } };

    const { data } = await axios.post("/api/register", userData, config);

    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (err) {
    dispatch({ type: REGISTER_FAIL, payload: err.response.data.message });
  }
};

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("/api/me");

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (err) {
    dispatch({ type: LOAD_USER_FAIL, payload: err.response.data.message });
  }
};

// logout

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/logout");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (err) {
    dispatch({ type: LOGOUT_FAIL, payload: err.response.data.message });
  }
};

// update profile

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "content-type": "multipart/form-data" } };

    const { data } = await axios.put("/api/me/update", userData, config);

    await dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (err) {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: err.response.data.message });
  }
};

export const updatePassword = (newPass) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = {headers: { "content-type": "application/json" }};

    const { data } = await axios.put("/api/password/update", newPass, config);

    dispatch({type: UPDATE_PASSWORD_SUCCESS, payload: data.success});

  } catch (err) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const forgotPassword = (email) => async(dispatch) => {
  try {
    dispatch({type: FORGOT_PASSWORD_REQUEST});

    const config = {headers: {"content-type" : "application/json"}}
    
    const {data} = await axios.post("/api/password/forgot", email, config);
    
    dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: data.message});
    
  } catch (err) {
    if(err.response.data.message === "Please login first!") return;
    dispatch({type: FORGOT_PASSWORD_FAIL, payload: err.response.data.message});
  }
}

export const resetPassword = (token, passwords) => async(dispatch) => {
  try {
    dispatch({type: RESET_PASSWORD_REQUEST});

    const config = {headers: {"content-type": "application/json"}};

    const {data} = await axios.put(`/api/password/reset/${token}`, passwords, config );

    dispatch({type: RESET_PASSWORD_SUCCESS, payload: data.success});

  } catch (err) {
    dispatch({type: RESET_PASSWORD_FAIL, payload: err.response.data.message});

  }
}

export const getAllUsers = () => async(dispatch) => {

  try {
    dispatch({type: ALL_USER_REQUEST})
    const {data} = await axios.get('/api/admin/users');
    dispatch({type: ALL_USER_SUCCESS, payload: data.users})
  } catch(error) {
    dispatch({type: ALL_USER_FAIL, payload: error.response.data.message})
  }
}

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/admin/user/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/admin/user/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });

};