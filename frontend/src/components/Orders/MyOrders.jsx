import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderActions";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { DataGrid } from "@material-ui/data-grid";
import {Link} from 'react-router-dom';
import LaunchIcon from '@material-ui/icons/Launch';

import './MyOrders.css';
import { Typography } from "@material-ui/core";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    {
      field: "id",
      headerName: "Order id",
      flex: 1,

    },
    {
      field: "qty",
      headerName: "Quantity",
      type: "number",
      flex: 0.3,

    },
    {
      field: "status",
      fieldName: "Status",
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "processing" ? "redColor" : "greenColor"
      }
    },
    {
      field: "amount",
      type: "number",
      headerName: "Amount",
      flex: 0.4,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      type: "number",
      renderCell: (params) => {
        return (
          <Link to={`/orders/${params.getValue(params.id, "id")}`}>
            <LaunchIcon/>
          </Link>
        )
      }
    }
  ];

  const rows = [];
  orders && orders.forEach((item, index) => {
    rows.push({
      qty: item.orderItems.length,
      id: item._id,
      amount: item.totalPrice,
      status: item.orderStatus
    })
  })


  useEffect(
    () => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      dispatch(myOrders());
    },[error, alert, dispatch]
  );

  return (
    <Fragment>
      <MetaData title={`${user.name} - ORDERS`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="orders-container">
          <DataGrid
          style={{fontSize: "1.5rem"}}
          rows={rows}
          columns={columns}
          disableSelectionOnClick
          className="order-grid"
          autoHeight
          />
          <Typography id='myOrdersHeading'>{user.name}'s orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
