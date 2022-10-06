import React, { Fragment } from "react";
import { Rating } from "@material-ui/lab";

import "./Review.css";

const Review = (props) => {

  const options = {
    size: "large",
    value: props.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Fragment>
        <div className="review-container">
          <div className="user-profile">
            <img
              className="user-img"
              src={props.user.avatar.url}
              alt="user profile"
            />
          </div>
          <div className="user-review">
            <h1>{props.name}</h1>
            <div>
              <Rating {...options} />
            </div>
            <p>{props.comment}</p>
          </div>
        </div>
    </Fragment>
  );
};
export default Review;
