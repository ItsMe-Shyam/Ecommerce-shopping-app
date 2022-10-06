import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  loadUser,
  updatePassword,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

import Loader from "../layout/Loader/Loader";

import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import "./UpdatePassword.css";

const UpdatePassword = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { isUpdated, loading, error } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Password updated Successfully.");

      dispatch(loadUser());

      history.push("/account");

      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [alert, dispatch, error, history, user, isUpdated]);

  return loading ? (
    <Loader />
  ) : (
    <Fragment>
      <div className="update-password-container">
        <div className="update-password-box">
          <div className="update-user-heading">
            <h1>Update Password</h1>
          </div>
          <form
            className="update-form"
            onSubmit={updatePasswordSubmit}
          >
            <div>
              <VpnKeyIcon />
              <input
                type="password"
                value={oldPassword}
                required
                className="form-input"
                placeholder="Old Password"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div>
              <LockOpenIcon />
              <input
                type="password"
                value={newPassword}
                required
                className="form-input"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
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
};

export default UpdatePassword;
