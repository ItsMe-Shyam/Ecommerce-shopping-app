import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { deleteOrder, allOrders, clearErrors } from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const AllOrders = ({history}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, orders } = useSelector((state) => state.orders);

  const {error: deleteError, isDeleted} = useSelector(state => state.order);

  const deleteButtonHandler = (id) => {
    dispatch(deleteOrder(id));
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
      alert.success("Order deleted Successfully!");
      dispatch({type: DELETE_ORDER_RESET});
      history.push("/admin/orders")
    }
    dispatch(allOrders());
  }, [alert, error, dispatch, isDeleted, deleteError, history]);


  const columns = [
    {
        field: "id",
        headerName: "Order id",
        minWdith: 300,
        flex: 1,
  
      },
      {
        field: "itemsQty",
        headerName: "Quantity",
        minWdith: 150,
        type: "number",
        flex: 0.4,
  
      },
      {
        field: "status",
        fieldName: "Status",
        minWdith: 150,
        flex: 0.5,
  
        cellClassName: (params) => {
          return params.getValue(params.id, "status") === "processing" ? "redColor" : "greenColor"
        }
      },
      {
        field: "amount",
        type: "number",
        headerName: "Amount",
        minWdith: 270,
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
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
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


  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
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
          <h1 id="productListHeading">ALL ORDERS</h1>

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

export default AllOrders;
