import "./Product.css";
import { Rating } from "@material-ui/lab";
import { Link } from "react-router-dom";

const Product = (props) => {
  const options = {
    size: "large",
    value: props.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="reactLink" to={`product/${props.id}`}>
      <div className="product-container">
        <div>
          <img src={props.images[0].url} alt="product" />
        </div>
        <div className="details">
          <h2>{props.name.toUpperCase()}</h2>
          <div className="react-star">
            <Rating {...options} />{" "}
          </div>
          <p>{props.numberOfReviews} reviews</p>
          <h1>₹{props.price}</h1>
        </div>
      </div>
    </Link>
  );
};

export default Product;
