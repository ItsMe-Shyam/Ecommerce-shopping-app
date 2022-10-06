import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  loadUser,
  updateProfile,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

import Loader from "../layout/Loader/Loader";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";

import "./UpdateProfile.css";

const UpdateProfile = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { isUpdated, loading, error } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
      const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile updated Successfully.");

      dispatch(loadUser());

      history.push("/account");

      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [alert, dispatch, error, history, user, isUpdated]);


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="login-signup-container">
          <div className="login-signup-box">
            <div className="update-user-heading">
              <h1>Update Profile</h1>
            </div>
            <form
              className="update-form"
              encType="multipart/form-data"
              onSubmit={updateProfileSubmit}
            >
              <div className="update-name">
                <FaceIcon />
                <input
                  name="name"
                  type="Name"
                  value={name}
                  required
                  className="form-input"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="update-email">
                <MailOutlineIcon />
                <input
                  name="email"
                  type="email"
                  value={email}
                  required
                  className="form-input"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="update-image">
                <img src={avatarPreview} alt="avatar-preview" />
                <input
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={updateProfileDataChange}
                />
              </div>
              <input value="Update" className="submit-btn" type="submit" />
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
