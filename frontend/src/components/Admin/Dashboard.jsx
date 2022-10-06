import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import Sidebar from "./Sidebar.jsx";
import './dashboard.css';
import {Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {Doughnut, Line} from 'react-chartjs-2'
import { useEffect } from "react";
import { getAllAdminProducts } from "../../actions/productActions.js";
import { allOrders } from "../../actions/orderActions.js";
import { getAllUsers } from "../../actions/userActions.js";
const Dashboard = () => {
  const {users
  } = useSelector(state => state.users);
  const {products} = useSelector(state => state.products);
  const {orders, totalAmount} = useSelector(state => state.orders);

  const dispatch = useDispatch();

  let outOfStock = 0;


  products &&
  products.forEach((item) => {
    if (item.stock === 0) {
      outOfStock += 1;
    }
  });
  
  const lineState =  {
    labels: ["Initial Amount", "Amount Earned"], 
    datasets: [
      {
        label: "Total Amount", 
        backgroundColor: ["Tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, parseInt(totalAmount)],

      }
    ]
  };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  useEffect(() => {
    dispatch(getAllAdminProducts());
    dispatch(getAllUsers());
    dispatch(allOrders());
  }, [dispatch])

  return (
    <div className="dashboard">
      <div className="dashboardSide">
        <Sidebar />
      </div>
      <div className="dashboardMain">
        <Typography component="h1" >Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>Total amount <br/> ₹{totalAmount}</p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Products</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
