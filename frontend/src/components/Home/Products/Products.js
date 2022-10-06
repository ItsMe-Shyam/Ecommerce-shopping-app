import Product from "../Product/Product";
import "./Products.css";
import { Fragment } from "react";

const Products = (props) => {
  return (
    <Fragment>
      <div className="featured-container">
        <h1 className="featured-products">Featured Products</h1>
      </div>
      <div id="products-container" className="products-container">
        { props.products && props.products.map(item => (
          <Product
            id={item._id}
            key={item._id}
            name={item.name}
            images={item.images}
            price={item.price}
            numberOfReviews={item.numberOfReviews}
            rating={item.averageRating}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default Products;
