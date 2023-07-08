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
    url("https://firebasestorage.googleapis.com/v0/b/ecommerce-php-d25c1.appspot.com/o/HD-wallpaper-time-still-life-leaves-green-clock.jpg?alt=media&token=3a4da8d8-c535-4eae-9c73-84c3168809e1")
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
  const [passErr, setPassErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const paswd = new RegExp("(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
    if (!name || !email || !password || !confirmPassword) {
      toast.warning("Please Fill all the Fields.");
      return;
    }
    if (password.match(paswd)) {
      setPassErr(false)
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
          "https://masaawatches.000webhostapp.com/server/index.php?direct=user",
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
      setPassErr(true)
      toast.warning("Please set a strong password");
      return;
    }
  };
  return (
    <Container>
      <div className="md:w-[40%] w-[80%] p-5 bg-white">
        <h1 className="text-2xl font-light">CREATE AN ACCOUNT</h1>
        <form className="flex flex-wrap items-center justify-center">
          <input
            className=" flex-1 min-w-[40%] mt-5 ml-2 mb-0 mr-0 p-2 border-[black] border-[1px] border-solid"
            placeholder="Full name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            isRequired
          />
          <input
            className=" flex-1 min-w-[40%] mt-5 ml-2 mb-0 mr-0 p-2 border-[black] border-[1px] border-solid"
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            isRequired
          />
          <div className="flex">
            <input
              className=" flex-1 min-w-40%] mt-5 ml-2 mb-0 mr-0 p-2 text-center border-[black] border-[1px] border-solid"
              placeholder="password"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="h-fit mt-5 p-2.5 absolute"
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
              className=" flex-1 min-w-[40%] mt-5 ml-2 mb-0 mr-0 p-2 text-center border-[black] border-[1px] border-solid"
              placeholder="Confirm Password"
              type={show ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              isRequired
            />
            <div className="h-fit mt-5 p-2.5 absolute"
              onClick={(e) => {
                setShow(!show);
                e.preventDefault();
              }}
            >
              <VisibilityOutlined style={{ fontSize: "20px", color: "gray" }} />
            </div>
            
          </div>
          {passErr && <div className="mt-2.5 text-[red]">
            Password must contain at least 7 characters, one digit and a
            special character
          </div>}
          <input
            className=" flex-1 min-w-[40%] mt-5 ml-2 mb-0 mr-0 p-2 border-[black] border-[1px] border-solid"
            placeholder="Phone Number"
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            isRequired
          />
          <input
            className=" flex-1 min-w-[40%] mt-5 ml-2 mb-0 mr-0 p-2 border-[black] border-[1px] border-solid"
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
        Already have an account? <Link to="/login"><u>Login</u></Link>
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
