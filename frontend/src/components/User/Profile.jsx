import React, {Fragment, useEffect} from "react";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import {Link} from "react-router-dom";

import MetaData from '../layout/MetaData';

import "./Profile.css";

const Profile = ({history}) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if(isAuthenticated === false) {
            history.push("/login")
        }
    }, [isAuthenticated, history])

  return (
    <Fragment>
      <MetaData title={`${user.name}'s Profile`} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="profile-container">
            <div className="profile-img">
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt="Profile" />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div className="profile-details">
              <div>
                <h2>Full Name</h2>
                <p>{user.name}</p>
              </div>
              <div>
                <h2>Email</h2>
                <p>{user.email}</p>
              </div>
              <div>
                <h2>Joined On</h2>
                <p>{String(user.createAt).substr(0, 10)}</p>
              </div>
              <div>
                <Link to="/orders">Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
