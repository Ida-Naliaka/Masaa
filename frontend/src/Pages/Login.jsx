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
} from "../redux/userRedux";
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
    url("https://firebasestorage.googleapis.com/v0/b/ecommerce-clientside-6ebf6.appspot.com/o/background%20gucci.jpg?alt=media&token=9f3a3cdc-62f1-4356-aa53-61b655125e7d")
      center;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Login = () => {
  const [email, setEmail] = useState("");
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
      const credentials = { email: email, password: password };
      const guestcred = { email: 'guestuser@gmail.com', password: 'zyxwvu@963' };
      await axios
        .post("http://localhost/ecommerce/php-react-website-store/server/index.php?direct=user", guest? guestcred: credentials)
        .then((res) => {
          if (res.data.success) {
            dispatch(loginSuccess(res.data.user));
            navigate("/shop");
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
        <h1 className="text-2xl font-light">SIGN IN</h1>
        <form className="flex flex-col">
          <input className="flex-1 min-w-[40%] mx-0 my-2.5 p-2.5"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ display: "flex" }}>
            <input className="flex-1 min-w-[40%] mx-0 my-2.5 p-2.5"
              placeholder="Password"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ textAlign: "center" }}
            />
            <div
              style={{
                height: "fit-content",
                color: "inherit",
                marginTop: "10px",
                padding: "10px",
                position: "absolute",
              }}
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
              <label style={{ color: "red" }}>Recover your Account</label>
              <input className="flex-1 min-w-[40%] mx-0 my-2.5 p-2.5"
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
                style={{ background: "black" }}
              >
                Submit
              </button>
            </>
          )}
          <div style={{display:'flex', justifyContent:'space-around'}}>
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
            to="/signup"
            style={{
              margin: "5px 0px",
              fontSize: "12px",
              textDecoration: "underline",
              cursor: "pointer",
            }}
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

export default Login;
