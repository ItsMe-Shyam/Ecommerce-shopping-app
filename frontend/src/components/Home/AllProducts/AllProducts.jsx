import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../../layout/Loader/Loader";
import { clearErrors, getProducts } from "../../../actions/productActions";
import Slider from "@material-ui/core/Slider";
import MetaData from "../../layout/MetaData";
import Pagination from "react-js-pagination";

import Product from "../Product/Product";

import "./AllProducts.css";

const AllProducts = ({ match }) => {
  const {
    products,
    loading,
    error,
    resultPerPage,
    productCount,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = (e) => {
    setShowFilters((prev) => !prev);
  };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceChangeHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const dispatch = useDispatch();
  const alert = useAlert();
  let count = filteredProductsCount;
  const categories = [
    "Electronics",
    "Innerwears",
    "Shirts",
    "Jeans",
    "Footwears",
  ];

  useEffect(() => {
    if (error) {
      dispatch(clearErrors);
      alert.error(error);
    }
    dispatch(getProducts(match.params.keyword, currentPage, price, category));
  }, [alert, dispatch, error, match.params.keyword, currentPage, price, category]);

  return (
    <Fragment>
      <MetaData title="All Products -- BAGGED" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
            <h1 className="all-products">Products</h1>
            <div className="filterBoxContainer">
              <button onClick={toggleFilters} className="filterBoxToggler">
                Filters
              </button>
              <div className={`filter-box ${showFilters? "showFilters": ""}`}>
                <h2 className="filter-heading">Price</h2>
                <Slider
                  value={price}
                  onChange={priceChangeHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={25000}
                />
                <h2 className="filter-heading">Categories</h2>
                <ul className="category-ul">
                  {categories.map((category) => (
                    <li
                      className="category-item"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
                <div className="rating-heading-container">
                  <h1 className="rating-heading">Ratings above</h1>
                  <div className="slider-container">
                    <Slider
                      value={ratings}
                      onChange={(e, newRating) => setRatings(newRating)}
                      aria-labelledby="continuous-slider"
                      min={0}
                      max={5}
                    />
                  </div>
                </div>
              </div>
            </div>
          <div className="all-products-container">
            {products.length ? (
              products.map((item) => (
                <Product
                  id={item._id}
                  key={item._id}
                  name={item.name}
                  images={item.images}
                  price={item.price}
                  numberOfReviews={item.numberOfReviews}
                  rating={item.averageRating}
                />
              ))
            ) : (
              <h1>No products found.</h1>
            )}
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default AllProducts;
