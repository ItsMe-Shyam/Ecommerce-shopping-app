import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAllAdminProducts, deleteProduct } from "../../actions/productActions";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = ({history}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, products } = useSelector((state) => state.products);

  const {error: deleteError, isDeleted} = useSelector(state => state.deleteProduct);

  const deleteButtonHandler = (id) => {
    dispatch(deleteProduct(id));
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if(isDeleted) {
      alert.success("Product deleted Successfully!");
      dispatch({type: DELETE_PRODUCT_RESET});
      history.push("/admin/dashboard")
    }
    dispatch(getAllAdminProducts());
  }, [alert, error, dispatch, isDeleted, deleteError, history]);


  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 1 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
            <Link to={`/admin/products/${params.getValue(params.id, "id")}`}>
              <EditIcon/>
            </Link>

            <Button onClick={() => deleteButtonHandler(params.getValue(params.id, "id"))}> {/* always pass a callback function to any attribute function which requires an argument */}
              <DeleteIcon  />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];


  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <div className="dashboardSide">
          <SideBar />
        </div>
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
