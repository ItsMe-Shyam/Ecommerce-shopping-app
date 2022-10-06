import React, { Fragment, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import "./LoginSignup.css";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userActions";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";

const LoginSignup = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const { name, email, password } = user;

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error && error !== "Please login first!") { 
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [alert, dispatch, error, isAuthenticated, history, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.add("display-none");
      loginTab.current.classList.remove("display-none");
    }
    if (tab === "signup") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.remove("display-none");
      loginTab.current.classList.add("display-none");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="login-signup-container">
          <div className="login-signup-box">
            <div>
              <div className="login-signup-toggle">
                <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                <p onClick={(e) => switchTabs(e, "signup")}>Signup</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form ref={loginTab} className="login-form" onSubmit={loginSubmit}>
              <div className="login-email">
                <MailOutlineIcon />
                <input
                  type="email"
                  value={loginEmail}
                  required
                  className="form-input"
                  placeholder="Email"
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="login-password">
                <LockOpenIcon />
                <input
                  type="password"
                  value={loginPassword}
                  required
                  className="form-input"
                  placeholder="Password"
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link className="forgot-link" to="/password/forgot">
                Forgot Password ?
              </Link>{" "}
              <input value="Login" className="submit-btn" type="submit" />
            </form>
            <form
              className="register-form"
              encType="multipart/form-data"
              ref={registerTab}
              onSubmit={registerSubmit}
            >
              <div className="register-name">
                <FaceIcon />
                <input
                  name="name"
                  type="Name"
                  value={name}
                  required
                  className="form-input"
                  placeholder="Name"
                  onChange={registerDataChange}
                />
              </div>
              <div className="register-email">
                <MailOutlineIcon />
                <input
                  name="email"
                  type="email"
                  value={email}
                  required
                  className="form-input"
                  placeholder="Email"
                  onChange={registerDataChange}
                />
              </div>
              <div className="register-password">
                <LockOpenIcon />
                <input
                  name="password"
                  type="password"
                  value={password}
                  required
                  className="form-input"
                  placeholder="Password"
                  onChange={registerDataChange}
                />
              </div>
              <div className="register-image">
                <img src={avatarPreview} alt="avatar-preview" />
                <input
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <input value="Register" className="submit-btn" type="submit" />
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default LoginSignup;
