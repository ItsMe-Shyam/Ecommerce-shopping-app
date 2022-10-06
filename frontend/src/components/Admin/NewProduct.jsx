import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, addNewProduct } from "../../actions/productActions";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Sidebar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = ({history}) => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const {error, success, loading} = useSelector(state => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "electronics",
    "clothing",
    "footwear",
    "accessories",
    "cosmetics",
    "skincare"
  ];

  useEffect(() => {

    if(error) {
      if(error === "Could not decode base64") alert.error("Please select files less than 1mb");
      else alert.error(error);
      dispatch(clearErrors());
    }
    if(success) {
      alert.success("Product created successfully!");
      history.push("/admin/dashboard")
      dispatch({type: NEW_PRODUCT_RESET});
    }
  }, [alert, success, error, dispatch, history])


  const formSubmitHandler = e => {
    e.preventDefault();
    
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach(img => {
      myForm.append("images", img);
    });

    dispatch(addNewProduct(myForm));
  }

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        if(reader.readyState === 2) {
          setImages(old => [...old, reader.result]);
          setImagesPreview(old => [...old, reader.result]);
        };
      }
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
          <form
            onSubmit={formSubmitHandler}
            encType="multipart/form-data"
            className="newProductForm"
          >
            <h1>Create Product</h1>
            <div>
                <SpellcheckIcon/>
                <input type="text" required value={name} placeholder="Product Name" onChange={e => setName(e.target.value)} />
            </div>

            <div>
                <AttachMoneyIcon/>
                <input type="number" required value={price} placeholder="Product price" onChange={e => setPrice(e.target.value)} />
            </div>

            <div>
                <DescriptionIcon id="textAreaIcon" />
                <textarea placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"/>
            </div>

            <div>
                <AccountTreeIcon/>
                <select onChange={e => setCategory(e.target.value)}>
                        <option value="">-- Choose a category --</option>
                    {categories && categories.map(cate => (
                        <option value={cate} key={cate}>{cate}</option>
                    ))}
                </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
