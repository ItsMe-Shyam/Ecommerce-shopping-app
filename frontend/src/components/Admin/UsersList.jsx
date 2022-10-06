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
import { DELETE_USER_RESET, UPDATE_USER_RESET } from "../../constants/userConstants";
import { deleteUser, getAllUsers, clearErrors } from "../../actions/userActions";

const UsersList = ({history}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, users } = useSelector((state) => state.users);

  const {error: deleteError, isDeleted, isUpdated} = useSelector(state => state.profile);

  const deleteButtonHandler = (id) => {
    dispatch(deleteUser(id));
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
    if(isUpdated) {
        alert.success("User updated Successfully!");
        dispatch({type: UPDATE_USER_RESET})
    }
    if(isDeleted) {
      alert.success("User deleted Successfully!");
      dispatch({type: DELETE_USER_RESET});
      history.push("/admin/dashboard")
    }
    dispatch(getAllUsers());
  }, [alert, error, dispatch, isDeleted, deleteError, history, isUpdated]);


  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 1 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 270,
      flex: 0.5,
      cellClassName: params => {
        return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor"
      }
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
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
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


  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <div className="dashboardSide">
          <SideBar />
        </div>
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

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

export default UsersList;
