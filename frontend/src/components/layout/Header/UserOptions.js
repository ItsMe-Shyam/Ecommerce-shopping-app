import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";

import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userActions";
import Backdrop from '@material-ui/core/Backdrop';
import {useSelector} from 'react-redux';

import "./UserOptions.css";

const UserOptions = (props) => {
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const {cartItems} = useSelector(state => state.cart);

  const [open, setOpen] = useState(false);

  const dashboard = () => {
    history.push("/admin/dashboard");
  };

  const profile = () => {
    history.push("/account");
  };

  const orders = () => {
    history.push("/orders");
  };
  const cart = () => {
    history.push('/cart');
  }
  const logoutUser = () => {
    dispatch(logout());
    alert.success("Logged out successfully.");
    history.push("/");
  };

  const options = [
    { icon: <PersonIcon />, name: "Profile", func: profile },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    { icon: <ShoppingCartIcon style={{color: cartItems.length > 0 ? "tomato" : "sunset"}} />, name: `Cart(${cartItems.length})`, func: cart,  },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
  ];

  if (props.user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <Fragment>
        <Backdrop open={open} style={{zIndex: "10"}} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={props.user.avatar.url ? props.user.avatar.url : "/Profile.png"}
            alt="profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            style={{fontSize: "larger"}}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
