import { useNavigate } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import axios from "axios";
import {
  addOrderFailure,
  addOrderStart,
  addOrderSuccess,
  deleteOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  getOrderFailure,
  getOrderStart,
  getOrderSuccess,
  updateOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
} from "./orderRedux";
import { useSelector } from "react-redux";

export const UserLogin = async (dispatch, user) => {
  dispatch(loginStart());
  const navigate = useNavigate();

  try {
    const res = await axios.post("https://masaawatches.000webhostapp.com/server/index.php?direct=user", user);
    dispatch(loginSuccess(res.data));
    navigate("/shop");
  } catch (error) {
    dispatch(loginFailure());
  }
};
export const AddOrder = async (order, dispatch) => {
  const user = useSelector((state) => state.user.currentUser);

  dispatch(addOrderStart());
  if (!order.userId || !order.products || !order.amount || !order.status || !order.address) {
    alert("Please Fill All the Fields!");
    return;
  }
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios.post("https://masaawatches.000webhostapp.com/server/index.php?direct=order", order, config).then((res) => {
      dispatch(addOrderSuccess(res.data));
      alert("Product Added Successfully");
    });
  } catch (error) {
    dispatch(addOrderFailure());
    alert("error occured" + error);
  }
};

export const GetOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    await axios.get('https://masaawatches.000webhostapp.com/server/index.php?direct=order').then((res) => {
      dispatch(getOrderSuccess(res.data));
    });
  } catch (err) {
    dispatch(getOrderFailure());
  }
};

export const UpdateOrder = async (orderId, updatedOrder, dispatch) => {
  const user = useSelector((state) => state.user.currentUser);

  dispatch(updateOrderStart());
  if (!updatedOrder) {
    alert("Please Fill in Field to Update!");
    return;
  }
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios
      .put(`https://masaawatches.000webhostapp.com/server/index.php?direct=order?id=${orderId}`, updatedOrder, config)
      .then((res) => {
        const response = res.data;
        dispatch(updateOrderSuccess({ orderId, response }));
      });
  } catch (error) {
    dispatch(updateOrderFailure());
    alert("error occured" + error);
  }
};
export const DeleteOrder = async (id, dispatch) => {
  const user = useSelector((state) => state.user.currentUser);

  dispatch(deleteOrderStart());
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios.delete(`https://masaawatches.000webhostapp.com/server?direct=order?orderid=${id}`, config).then(() => {
      dispatch(deleteOrderSuccess(id));
    });
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};
/*
export const FindCart = async () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  try {
    const res = await axios.get("/api/carts/findcart", { userId: user._id });
    dispatch(cartSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};
export const UpdateCart = async (dispatch, product, quantity) => {
  const user = useSelector((state) => state.user.currentUser);
  try {
    await axios
      .put(`/api/carts/${user._id}`, { product: product, quantity: quantity })
      .then((res) => {
        if (res.data) dispatch(cartSuccess(res.data));
      });
  } catch (error) {
    alert("error");
    console.log(error);
  }
};
export const CreateCart = async (dispatch, product, quantity) => {
  const user = useSelector((state) => state.user.currentUser);
  try {
    const newCart = {
      userId: user._id,
      products: [{ product: product, quantity: quantity }],
    };
    await axios.put(`/api/carts`, newCart).then((res) => {
      if (res.data) dispatch(cartSuccess(res.data));
    });
  } catch (error) {
    alert("error");
    console.log(error);
  }
};
export const  = async (dispatch) => {
  const user = useSelector((state) => state.user.currentUser);
  try {
    await axios.delete(`/api/carts/${user._id}`).then(() => {
      dispatch(cartDeleted());
    });
  } catch (error) {
    alert("error");
    console.log(error);
  }
};
*/
