import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VisibilityOutlined } from "@material-ui/icons";
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
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 10px 10px;
  margin-top: 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Reset = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const paswd = new RegExp("(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
    if (!email || !password || !confirmPassword || !phone || !city) {
      toast.warning("Please Fill all the Fields.");
      return;
    }
    if (password.match(paswd)) {
      if (password !== confirmPassword) {
        toast.warning("Passwords do not match.");
        return;
      }
      try {
        const credentials = {
          email: email,
          password: password,
          phone: phone,
          city: city,
        };
        await axios.post(`http://localhost/reactphp/server/index.php?direct=user?direction=resetPassword`, credentials).then((res) => {
          if (res.data)
            toast.success("Account Recovery Successful! Please Log in");
          navigate("/login");
        });
      } catch (error) {
        toast.error(`Error Occured`);
      }
    } else {
      toast.warning("Please set a strong password");
      return;
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>Recover Your Account</Title>
        <Form>
          <Input
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            isRequired
          />
          <label style={{ marginTop: "10px", marginBottom: "0px" }}>
            [Password must contain at least 7 characters, one digit and a
            special character]
          </label>
          <div style={{ display: "flex" }}>
            <Input
              placeholder="password"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              style={{ textAlign: "center" }}
            />
            <div
              style={{
                height: "fit-content",
                marginTop: "20px",
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
          <div style={{ display: "flex" }}>
            <Input
              placeholder="Confirm Password"
              type={show ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              isRequired
              style={{ textAlign: "center" }}
            />
            <div
              style={{
                height: "fit-content",
                marginTop: "20px",
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
          <Input
            placeholder="Phone Number"
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            isRequired
          />
          <Input
            placeholder="City"
            type="city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            isRequired
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            SUBMIT
          </Button>
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

export default Reset;
