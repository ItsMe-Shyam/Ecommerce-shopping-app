import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../actions/productActions";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Sidebar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import Loader from "../layout/Loader/Loader";

const UpdateProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    error: updateError,
    isUpdated,
    loading: deleteLoading,
  } = useSelector((state) => state.deleteProduct);
  const { error, product, loading } = useSelector((state) => state.productDetails);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState();
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "electronics",
    "clothing",
    "footwear",
    "accessories",
    "cosmetics",
    "skincare"
  ];

  const productId = match.params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(match.params.id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setDescription(product.description);
      setStock(product.stock);
      setOldImages(product.images);
    }
    if (error) {
      if(error === "Could not decode base64") alert.error("Please select files less than 1mb");
      else alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Product updated successfully!");
      history.push("/admin/dashboard");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [alert, isUpdated, error, dispatch, history, product, productId, match.params.id, updateError]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

   images.forEach((img) => {
      myForm.append("images", img);
    });

    dispatch(updateProduct(match.params.id, myForm));

  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setOldImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
          setImagesPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="New Product -- ADMIN" />
      <div className="dashboard">
        <div className="dashboardSide">
          <Sidebar />
        </div>
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              onSubmit={formSubmitHandler}
              encType="multipart/form-data"
              className="newProductForm"
            >
              <h1>Update Product</h1>
              <div>
                <SpellcheckIcon />
                <input
                  type="text"
                  required
                  value={name}
                  placeholder="Product Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <AttachMoneyIcon />
                <input
                  type="number"
                  required
                  value={price}
                  placeholder="Product price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div>
                <DescriptionIcon id="textAreaIcon" />
                <textarea
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                />
              </div>

              <div>
                <AccountTreeIcon />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories &&
                    categories.map((cate) => (
                      <option value={cate} key={cate}>
                        {cate}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <StorageIcon />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProductImagesChange}
                  multiple
                />
              </div>

              <div id="createProductFormImage">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img key={index} src={image.url} alt="old product Preview" />
                  ))}
              </div>

              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={deleteLoading ? true : false}
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
