import { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import React from "react";
import Products from "./Products/Products";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";

import { clearErrors, getProducts } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";

import { useAlert } from "react-alert";

import "./Home.css";

const Home = () => {
  const { error, allProducts, loading } = useSelector((state) => state.products);
  const alert = useAlert();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProducts());
  }, [dispatch, alert, error]);
  return (
    <Fragment>
      <MetaData title="Home -- BAGGED" />
      <div className="home-container">
        <div className="home">
          <h2>Welcome to Ecommerce!</h2>
          <p>Your wishlist at your doorstep.</p>
          <div>
            <a
              className="btn btn--animated btn--red"
              href="#products-container"
            >
              Discover
            </a>
            <div>
              <CgMouse />
            </div>
          </div>
        </div>
      </div>

      {loading && <Loader />}
      {!loading && <Products products={allProducts} />}
    </Fragment>
  );
};

export default Home;
