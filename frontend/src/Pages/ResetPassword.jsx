import React, { useState } from "react";
import styled from "styled-components";
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
        await axios
          .post(
            `http://localhost/ecommerce/php-react-website-store/server/index.php?direct=user?direction=resetPassword`,
            credentials
          )
          .then((res) => {
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
      <div className="md:w-[40%] w-[75%] p-5 bg-white">
        <h1 className="text-2xl font-light">Recover Your Account</h1>
        <form className="flex flex-wrap">
          <input
            className=" flex-1 min-width-[40%] mt-5 ml-2 mb-0 mr-0 p-2"
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
            <input
              className=" flex-1 min-width-[40%] mt-5 ml-2 mb-0 mr-0 p-2"
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
            <input
              className=" flex-1 min-width-[40%] mt-5 ml-2 mb-0 mr-0 p-2"
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
          <input
            className=" flex-1 min-width-[40%] mt-5 ml-2 mb-0 mr-0 p-2"
            placeholder="Phone Number"
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            isRequired
          />
          <input
            className=" flex-1 min-width-[40%] mt-5 ml-2 mb-0 mr-0 p-2"
            placeholder="City"
            type="city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            isRequired
          />
          <button
            className="w-[40%] bg-teal-700 text-white cursor-pointer px-4 py-5"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            SUBMIT
          </button>
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

export default Reset;
