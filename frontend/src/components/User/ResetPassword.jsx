import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  resetPassword,
  clearErrors,
} from "../../actions/userActions";

import Loader from "../layout/Loader/Loader";

import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";

import "./ResetPassword.css";

const ResetPassword = ({ history, match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { message, loading, error } = useSelector((state) => state.forgotPassword);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, myForm));
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success("Password updated Successfully.");

      history.push("/login");

    }
  }, [alert, dispatch, error, message, history]);
  return loading ? (
    <Loader />
  ) : (
    <Fragment>
      <div className="reset-password-container">
        <div className="reset-password-box">
          <div className="update-user-heading">
            <h1>Reset Password</h1>
          </div>
          <form
            className="reset-form"
            onSubmit={resetPasswordSubmit}
          >
            <div>
              <LockOpenIcon />
              <input
                type="password"
                value={password}
                required
                className="form-input"
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <LockIcon />
              <input
                type="password"
                value={confirmPassword}
                required
                className="form-input"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <input value="Update" className="submit-btn" type="submit" />
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default ResetPassword;