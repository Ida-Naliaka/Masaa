import React, { useState } from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetOrders } from "../../redux/apiCalls";
import "./Myorders.scss";
import { deleteOrderFailure, deleteOrderStart, deleteOrderSuccess, updateOrderFailure, updateOrderStart, updateOrderSuccess } from '../../redux/orderRedux';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Myorders = () => {
    
    const [status, setStatus] = useState('in Progress')
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);
    
  useEffect(() => {
    GetOrders(dispatch);
    // eslint-disable-next-line
  }, []);

  const handleDelete = (id) => {
    try {
      dispatch(deleteOrderStart());
      axios.delete(`http://localhost/reactphp/server/index.php?direct=order&orderid=${id}`).then((res) => {
        if (res.data.status) {
          dispatch(deleteOrderSuccess(id));
          toast.success(res.data.message);
          GetOrders(dispatch);
          } else {
            dispatch(deleteOrderFailure());
            toast.error(res.data.message);
          }
        
    });
    } catch (error) {
      dispatch(deleteOrderFailure());
      toast.error(error);
    }
    
  };
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
            <select onChange={(e) => { setStatus(e.target.value) }}>
              <option value="">--</option>
              <option value="pending">pending</option>
              <option value="In progress">In Progress</option>
              <option value="fulfilled">Fulfilled</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
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
              onClick={() => handleStatusChange(params.row.orderid)}>
            Update
            </button>
          </>
        );
      },
    },
   
    {
      field: "action",
      headerName: "Action",
      width: 50,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="orderListDelete"
              onClick={() => handleDelete(params.row.orderid)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="orderList">
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

export default Myorders;
