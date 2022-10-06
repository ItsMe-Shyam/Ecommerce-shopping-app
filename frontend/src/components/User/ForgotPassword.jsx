import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  forgotPassword,
  clearErrors,
} from "../../actions/userActions";

import Loader from "../layout/Loader/Loader";

import MailOutlineIcon from "@material-ui/icons/MailOutline";

import "./ForgotPassword.css";

const ForgotPassword = ({history}) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
      history.push("/login");

    }
  }, [alert, message, error, dispatch, history]);
                                                                                                                                                                                                                                                                                                                        
  return loading ? (
    <Loader />
  ) : (
    <Fragment>
      <div className="forgot-password-container">
        <div className="forgot-password-box">
          <div className="update-user-heading">
            <h1>Forgot Password</h1>
          </div>
          <form className="update-form" onSubmit={forgotPasswordSubmit}>
            <div>
              <MailOutlineIcon />
              <input
                type="email"
                value={email}
                required
                className="form-input"
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input value="Send" className="submit-btn" type="submit" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
