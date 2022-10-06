import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import './ProductReviews.css';
import {
  getProductReviews,
  deleteReview,
  clearErrors,
} from "../../actions/productActions";

const ProductReviews = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [productId, setProductId] = useState("");
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const deleteButtonHandler = (reviewId) => {
    dispatch(deleteReview(productId, reviewId));
  };

  const getReviewsForm = (e) => {
    e.preventDefault();
    dispatch(getProductReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getProductReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review deleted Successfully!");
      dispatch({ type: DELETE_REVIEW_RESET });
      history.push("/admin/reviews");
    }
  }, [alert, error, dispatch, isDeleted, deleteError, history, productId]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 1 },

    {
      field: "user",
      headerName: "Name",
      minWidth: 350,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Comment",
      type: "comment",
      minWidth: 150,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      minWidth: 270,
      flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteButtonHandler(params.getValue(params.id, "id"))
              }
            >
              {/* always pass a arrow function to a onClick/onChange function which requires an argument */}
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.name,
        comment: item.comment,
        rating: item.rating,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <div className="dashboardSide">
          <Sidebar />
        </div>
        <div className="searchReviews">
          <form
            onSubmit={getReviewsForm}
            encType="multipart/form-data"
            className="searchReviewsForm"
          >
            <h1>Search reviews</h1>
            <div>
              <Star />
              <input
                type="text"
                required
                value={productId}
                placeholder="Product Id"
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="searchReviewBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <div className="">
              <h1 id="productListHeading">All reviews</h1>

              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </div>
          ) : (
            <h1 className="noReviewsHeading">No reviews currently.</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
