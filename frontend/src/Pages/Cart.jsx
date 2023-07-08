import React, { useState } from "react";
import { Add, Remove } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PaymentCard from "../Components/PaymentCard";
import { removeProduct, addQuantity, reduceQuantity } from "../redux/cartRedux";
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ShopNavbar from "../Components/ShopNavbar";

//calling `loadStripe` outside of the component’s render to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51LwigmHrQFfXoYu84CCBlCE3mtcuVgKzjmhCIpZpa9AILk2lMQROB6ShCU406iNd2zBoUItr2JgGKWBBpxXqH3E400xGdBuIDe');

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  //eslint-disable-next-line
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleAdd=(item) => {
    dispatch(addQuantity(item));
  }
  const handleRemove=(item) => {
    cart.products.map((prod) =>
    prod.sku === item.sku && 
      prod.quantity>1 ? dispatch(reduceQuantity(item)) : dispatch(removeProduct(item)))
  }
  return (
    user && (
      <div>
        <ShopNavbar />
        <div className="md:p-5 p-2.5 mt-[10%]">
              <h1 className="font-light text-center">YOUR CART</h1>
              <div className="flex items-center justify-between p-5">
                <Link to="/shop">
                  {" "}
                  <button className="font-semibold cursor-pointer bg-[black] text-[white] p-2.5">
                    CONTINUE SHOPPING
                  </button>
                </Link>
                <div className="md:flex hidden">
                  <span className="underline cursor-pointer mx-2.5 my-0">Shopping cart({cart.products.length})</span>
                  <span className="underline cursor-pointer mx-2.5 my-0">Your Wishlist (0)</span>
                </div>
                <button className="font-semibold cursor-pointer bg-[black] text-[white] p-2.5">CHECKOUT NOW</button>
              </div>
              <div className="flex md:flex-row flex-col justify-between">
                <div className="flex-3">
                  {cart.products.map((product) => (
                    <div className="flex md:flex-row flex-col justify-between" key={product.sku}>
                      <div className="flex-1 flex flex-col items-center justify-center">
                        <img className="w-[200px]" src={product.img} alt={product.name} />
                        <div className="flex flex-col justify-around p-5">
                          <span>
                            <b>Product:</b> {product.name}: {product.color}
                          </span>
                          <span>
                            <b>ID:</b> {product.sku}
                          </span>
                          <span>
                            <b>Description:</b>{product.description}
                          </span>
                          <span>
                            <b>Quantity</b>{product.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="flex items-center mb-5">
                          <Add style={{ cursor: "pointer" }} onClick={() => handleAdd(product)} />
                          <div className="text-2xl md:mx-[5px] mx-[15px] my-[5px] ">
                            {product.quantity}
                          </div>
                          <Remove style={{ cursor: "pointer" }}
                            onClick={() => handleRemove(product)}
                          />
                        </div>
                        <div className="text-3xl font-extralight md:mb-0 mb-5">
                          $ {product.price * product.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                  <hr className="bg-[#eee] h-px border-[none]" />
                  {!cart.products.length &&
                  <div className="flex md:flex-row flex-col justify-center items-center text-[25px] font-normal text-[blue] pt-[30%]">
                    Cart is empty!
                  </div>}
                </div>
                <div className="flex-1 h-fit mt-5 p-5 rounded-[10px] border-[0.5px] border-solid border-[lightgray]">
                  <h1 className="font-extralight">ORDER SUMMARY</h1>
                  <div className="flex justify-between mx-0 my-[30px]">
                    <span>Subtotal</span>
                    <span>$ {cart.total}</span>
                  </div>
                  <div className="flex justify-between mx-0 my-[30px]">
                    <span>Estimated Shipping</span>
                    <span>$ 5.90</span>
                  </div>
                  <div className="flex justify-between mx-0 my-[30px]">
                    <span>Shipping Discount</span>
                    <span>$ -5.90</span>
                  </div>
                  <div className="flex justify-between font-medium text-2xl mx-0 my-[30px]" type="total">
                    <span>Total</span>
                    <span>$ {cart.total}</span>
                  </div>
                  <Elements stripe={stripePromise}>
                    <PaymentCard amount={cart.total} setPaymentCompleted={setPaymentCompleted} />
                  </Elements>
                </div>
              </div>
        </div>
      </div>
    )
  );
};

export default Cart;
