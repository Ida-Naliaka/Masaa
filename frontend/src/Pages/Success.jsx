import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const url = window.location.href;
  var splitUrl = url.split("/");
  const pid = splitUrl[splitUrl.length - 1];
  const data = location.state;
  const address = data.address;
  const cart = data.products;
  const phone = data.phone;
  const txn_id = data.txn_id;
  const orderid = data.orderid;
  const paid_amount = data.paid_amount;
  const paid_amount_currency = "usd";
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center">
      <div
        className="md:p-5 p-2 flex flex-col items-center justify-center"
        style={{ border: "2px solid black" }}
      >
        {pid ? (
          <>
            <h1 className="font-light text-center">
              Order Created Successfully!
            </h1>
            <div className="flex justify-between md:flex-row flex-col">
              <b>Payment Information</b>
            </div>
            <div className="flex-[2] flex leading-[25px]">Payment Reference Number: {orderid}</div>
            <div className="flex-[2] flex leading-[25px]">Transaction ID: {txn_id}</div>
            <div className="flex-[2] flex leading-[25px]">
              Paid Amount:{paid_amount + "" + paid_amount_currency}
            </div>
            <div className="flex-[2] flex leading-[25px]">Payment Status: Success</div>

            <div className="flex justify-between md:flex-row flex-col">
              <b>Customer Information</b>
            </div>
            <div className="flex-[2] flex leading-[25px]">Name: {user.name}</div>
            <div className="flex-[2] flex leading-[25px]">Email:{user.email}</div>
            <div className="flex-[2] flex leading-[25px]">Phone:{phone}</div>
            <div className="flex-[2] flex leading-[25px]">Address:{address}</div>

            <div className="flex justify-between md:flex-row flex-col">
              <b>Product Information</b>
            </div>
            {cart.products.map((item) => (
              <>
                <div className="flex-[2] flex leading-[25px]">Name: {item.name + " -> " + item.quantity}</div>
                <div className="flex-[2] flex leading-[25px]">
                  Price:{" "}
                  {item.price * item.quantity + " " + paid_amount_currency}
                </div>
              </>
            ))}
          </>
        ) : (
          <>
            <h1 className=" font-light text-center error">
              Your Payment has failed!
            </h1>
            <div className="flex justify-between md:flex-row flex-col error">
              Order has not been created. Please try again{" "}
            </div>
          </>
        )}
        {orderid && (
          <b>
            Order has been created successfully. Your order number is ${orderid}
            . Check the status of your order{" "}
            <Link to="/statusupdate"> here </Link>
          </b>
        )}
        <Link to="/shop" style={{ padding: 10, marginTop: 20 }}>
          Return to Shop
        </Link>
      </div>
    </div>
  );
};

export default Success;
