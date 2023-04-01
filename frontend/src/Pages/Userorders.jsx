import React, { useState } from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetOrders } from "../redux/apiCalls";
import "../Admin/Components/Myorders.scss";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateOrderFailure, updateOrderStart, updateOrderSuccess } from '../redux/orderRedux';

const Userorders = () => {
    
    const [status, setStatus] = useState('')
    const [orders, setOrders] = useState([])
    const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const GetUserOrders = () => {
    try {
      axios.get(`http://localhost/reactphp/server/index.php?direct=order&userid=${user.userid}`).then((res) => {
        setOrders(res.data);
      });
    } catch (err) {
      console.log(err);
    }
};
    
  useEffect(() => {
    GetUserOrders();
    // eslint-disable-next-line
  }, []);


  const handleStatusChange = (id) => {
    if (status.length) {

    const updatedOrder = {
      'column': 'order_status',
      'status': status
      };
      
    try {
      dispatch(updateOrderStart());
      axios
        .put(`http://localhost/reactphp/server/index.php?direct=order&orderid=${id}`, updatedOrder)
        .then((res) => {
          const response = res.data;
          if (response.status) {
            dispatch(updateOrderSuccess());
            toast.success(response.message);
            setStatus("")
            GetOrders(dispatch);
          } else {
            dispatch(updateOrderFailure());
            toast.error(response.message);
          }
        });
    } catch (error) {
      dispatch(updateOrderFailure());
      toast.error(error);
    }
    } else {
      toast.warning('No status change!');
    }
  }

  const columns = [
    { field: "orderid", headerName: "ID", width: 80 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.product_name}
          </div>
        );
      },
    },
     {
      field: "quantity",
      headerName: "Quantity",
      width: 80,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.product_quantity}
          </div>
        );
      },
    },
    {
      field: "customer",
      headerName: "Customer",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.customer_name}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.customer_email}
          </div>
        );
      },
    },
     {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.product_price}
          </div>
        );
      },
    },
      {
      field: "description",
      headerName: "Description",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.description}
          </div>
        );
      },
    },
    { field: "status", headerName: "Status", width: 200,
    renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.order_status}
          {params.row.order_status==='pending' &&  <select onChange={(e)=>{setStatus(e.target.value)}}>
                <option value="">--</option>
                <option value="cancelled">Cancel Order</option>
            </select>}
          </div>
        );
      },
    },
     {
      field: "update",
      headerName: "Update",
      width: 80,
      renderCell: (params) => {
        return (
          <>
            <button className="orderListUpdate"
              onClick={() => handleStatusChange(params.row.orderid)} disabled={params.row.order_status==='pending'?true:false}>
            Update
            </button>
          </>
        );
      },
    },
  ];

  return (
      <div className="orderList">
          My Orders
      <DataGrid
        autoHeight {...orders}
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row.orderid}
        pageSize={15}
        checkboxSelection
      />
       <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Userorders;
