import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const paswd = new RegExp("(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
    if (!name || !email || !password || !confirmPassword) {
      toast.warning("Please Fill all the Fields.");
      return;
    }
    if (password.match(paswd)) {
      if (password !== confirmPassword) {
        toast.warning("Passwords do not match.");
        return;
      }
      const credentials = {
        name: name,
        type: "Client",
        employeeid: "N/A",
        email: email,
        password: password,
        city: city,
        phone: phone,
        confirmationcode: "N/A",
        status: "active",
      };
      await axios
        .post(
          "http://localhost/ecommerce/php-react-website-store/server/index.php?direct=user",
          credentials
        )
        .then((res) => {
          if (res.data.status === 1) {
            navigate("/login");
          } else {
            toast.error(`Error Occured`);
            console.log(res.data);
          }
        });
    } else {
      toast.warning("Please set a strong password");
      return;
    }
  };
  return (
    <Container>
      <div className="md:w-[40%] w-[75%] p-5 bg-white">
        <h1 className="text-2xl font-light">CREATE AN ACCOUNT</h1>
        <form className="flex flex-wrap">
          <input
            className=" flex-1 min-width-[40%] mt-5 ml-2 mb-0 mr-0 p-2"
            placeholder="Full name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            isRequired
          />
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
          <div className="flex">
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
          <span className="text-xs mx-[20px] my-0">
            By creating an account, I consent to the processing of my personal
            data in accordance with the{" "}
            <b>
              <a href="https://github.com/Ida-Naliaka">PRIVACY POLICY</a>
            </b>
          </span>
          <button
            className="w-[40%] bg-teal-700 text-white cursor-pointer px-4 py-5"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            CREATE
          </button>
        </form>
        Already have an account? <Link to="/login"> Login</Link>
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

export default Signup;
