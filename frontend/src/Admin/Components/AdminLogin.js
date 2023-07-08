import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { VisibilityOutlined } from "@material-ui/icons";
import { useEffect } from "react";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
} from "../../redux/userRedux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://firebasestorage.googleapis.com/v0/b/ecommerce-php-d25c1.appspot.com/o/HD-wallpaper-time-still-life-leaves-green-clock.jpg?alt=media&token=3a4da8d8-c535-4eae-9c73-84c3168809e1")
      center;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AdminLogin = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [guest, setGuest] = useState(false);
  const [recoveryemail, setRecoveryEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [forgot, setForgot] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logout());
    // eslint-disable-next-line
  }, []);

  const { isFetching, error } = useSelector((state) => state.user);
  
  const handleClick = async () => {
    dispatch(loginStart());
    try {
      const credentials = { employeeId: employeeId, password: password, type:"Admin" };
      const guestcred = { employeeId: 'TL001Masaa001', password: 'zyxwvu@963', type:"Admin" };
      await axios
        .post("https://masaawatches.000webhostapp.com/server/index.php?direct=user", guest? guestcred: credentials)
        .then((res) => {
          if (res.data.success) {
            dispatch(loginSuccess(res.data.user));
            if (res.data.user.type==="Admin"){
            navigate("/admin/product/display");
          } else {
            toast.error('User is not authorized!');
            navigate('/');
          }
            
          } else {
            toast.error(res.data.message)
             dispatch(loginFailure());
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    } catch (error) {
      dispatch(loginFailure());
    }
  };
  useEffect(() => {
    guest && handleClick()
    // eslint-disable-next-line
  },[guest])
  const handleRecover = async () => {
    try {
      const credentials = { email: recoveryemail };
      await axios.post(`/api/auth/recover`, credentials).then(() => {
        toast.success("Check your email");
      });
    } catch (error) {
      toast.error("error occured");
    }
  };

  return (
    <Container>
      <div className="md:w-3/12 w-9/12 bg-[white] p-5">
        <h1 className="text-2xl font-light"> ADMIN SIGN IN</h1>
        <form className="flex flex-col">
          <input className="flex-1 min-w-[40%] mx-0 my-2.5 p-2.5 border-[black] border-[1px] border-solid"
            placeholder="Employee Id"
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <div className="flex">
            <input className="flex-1 min-w-[40%] mx-0 my-2.5 text-center p-2.5 border-[black] border-[1px] border-solid"
              placeholder="Password"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="fit text-[inherit] mt-2.5 p-2.5 absolute"
              onClick={(e) => {
                setShow(!show);
                e.preventDefault();
              }}
            >
              <VisibilityOutlined style={{ fontSize: "20px", color: "gray" }} />
            </div>
          </div>
          {forgot && (
            <>
              <label className="text-[red]">Recover your Account</label>
              <input className="flex-1 min-w-[40%] mx-0 my-2.5 p-2.5 border-[black] border-[1px] border-solid"
                placeholder="Enter Email Address"
                type="email"
                value={recoveryemail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
              />
              <button className="w-2/5 bg-[teal] text-[white] cursor-pointer mb-2.5 px-5 py-[15px] border-[none] disabled:text-[green] disabled:cursor-not-allowed"
                onClick={(e) => {
                  e.preventDefault();
                  handleRecover();
                }}
              >
                Submit
              </button>
            </>
          )}
          <div className= "flex justify-around">
          <button className="w-2/5 bg-[teal] text-[white] cursor-pointer mb-2.5 px-5 py-[15px] border-[none] disabled:text-[green] disabled:cursor-not-allowed"
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
            disabled={isFetching}
          >
            LOGIN
          </button>
          <button className="w-2/5 bg-[teal] text-[white] cursor-pointer mb-2.5 px-5 py-[15px] border-[none] disabled:text-[green] disabled:cursor-not-allowed"
            onClick={(e) => {
              e.preventDefault();
              setGuest(true)
            }}
            disabled={isFetching}
          >
          GUEST LOGIN
            </button>
          </div>
          {error && <span className="text-[red]">Something went wrong...</span>}
          <div onClick={() => setForgot(true)} style={{ cursor: "pointer" }}>
            <u>Don't remember your Password?</u>
          </div>
          <Link
            to="/adminsignup"
            className="text-xs underline cursor-pointer mx-[0px] my-[5px]"
          >
            CREATE A NEW ACCOUNT
          </Link>
        </form>
      </div>
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
    </Container>
  );
};

export default AdminLogin;
