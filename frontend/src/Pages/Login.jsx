import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
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

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
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
        .post("http://localhost/reactphp/server/index.php?direct=user", guest? guestcred: credentials)
        .then((res) => {
          if (res.data.success) {
            dispatch(loginSuccess(res.data.user));
            console.log(res.data);
            navigate("/shop");
          } else {
            toast.error(res.data.message)
            console.log(res.data);
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
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ display: "flex" }}>
            <Input
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
              <Input
                placeholder="Enter Email Address"
                type="email"
                value={recoveryemail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
              />
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleRecover();
                }}
                style={{ background: "black" }}
              >
                Submit
              </Button>
            </>
          )}
          <div style={{display:'flex', justifyContent:'space-around'}}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
            disabled={isFetching}
          >
            LOGIN
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setGuest(true)
            }}
            disabled={isFetching}
          >
          GUEST LOGIN
            </Button>
          </div>
          {error && <Error>Something went wrong...</Error>}
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
        </Form>
      </Wrapper>
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
