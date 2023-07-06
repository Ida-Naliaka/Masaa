import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {useStripe, useElements, CardExpiryElement, CardCvcElement, CardNumberElement} from '@stripe/react-stripe-js';
import { clearCart } from "../redux/cartRedux";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      lineHeight: "27px",
      color: "#212529",
      fontSize: "15px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const PaymentCard = (props) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const [delivery, setDelivery] = useState("");
  const [address, setAddress] = useState("Store Pickup");
  const [deliveryPhone, setDeliveryphone] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
 
  
  const handleSubmit = async (event) => {
    event.preventDefault();
 
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    } else {
      setLoading(true);
      setErrorMsg('');
      const paymentMethodObj = {
        type: 'card',
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name,
          email
        },
      };
      await stripe.createPaymentMethod(paymentMethodObj).then((paymentMethodResult) => {
        stripePaymentMethodHandler({
        result: paymentMethodResult,
        amount: props.amount
      });
      })
      
    }
  };
   const handleResponse = (response) => {
     setLoading(false);
     if (response.error) {
       setErrorMsg(typeof response.error === 'string' ? response.error : response.error.message);
       return;
     } else {
       props.setPaymentCompleted(response.success ? true : false);
       navigate(`/success/${response.payment_txn_id}`, {
         state: {
           phone: deliveryPhone,
           products: cart,
           address: address,
           paid_amount: cart.total,
           txn_id: response.txn_id,
           orderid: response.orderid
         }
       })
      dispatch(clearCart());
     }
  };
  const stripePaymentMethodHandler = async (info) => {
  const  amount = info.amount;
  const  result = info.result;
  if (result.error) {
    // show error in payment form
    handleResponse(result);
  } else {
    const body = {
      payment_method_id: result.paymentMethod.id,
      name: result.paymentMethod.billing_details.name,
      email: result.paymentMethod.billing_details.email,
      amount: amount,
      products: cart,
      userid: user.userid,
      address: address,
      status: 'pending',
    };
    await axios.post('http://localhost/ecommerce/php-react-website-store/server/index.php?direct=paymentinit', body).then((res) => {
      handleResponse(res.data);
    })
  }
}
  
  useEffect(() => {
  delivery==="pickup" && setAddress("Store Pickup")
  }, [delivery])

  return (
    <div className="flex flex-col items-center">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h4>Enter Delivery Details</h4>
         <div className="flex md:flex-row flex-col justify-around items-center md:w-full w-[80%] h-fit">
          <select
            name="delivery"
            id="delivery"
            label="Enter Delivery Details"
            style={{ marginBottom: "10px" }}
            onChange={(e) => setDelivery(e.target.value)}
          >
            <option className="flex justify-center items-center w-[150px] m-2.5" value="pickup">
              Store Pickup
            </option>
            <option className="flex justify-center items-center w-[150px] m-2.5" value="delivery">
              Delivery
            </option>
          </select>
        </div>
        {delivery === "delivery" && (
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
              <label for="address" style={{ marginBottom: "10px" }}>
              Please Enter Your delivery address
            </label>
            <input
              id="address"
              type="text"
              placeholder="Your Apartments/hse number, off Known Road, Opposite Landmark, Your General Area"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              />
              <input
              id="phone"
              type="text"
              placeholder="Your Phone Number"
              value={deliveryPhone}
              onChange={(e) => setDeliveryphone(e.target.value)}
            />
            </div>
        </div>
      )}
      </div>
        <form>
          <label>Name on card</label>
          <input type="text" value={name} placeholder="Enter name" required="" autoFocus="" onChange={(e) => { setName(e.target.value) }} />
          <label>EMAIL</label>
          <input type="email" value={email} placeholder="Enter email" required="" onChange={(e) => { setEmail(e.target.value) }} />
          <label>CARD NUMBER</label>
          <CardNumberElement
              id="cc-number"
              options={CARD_ELEMENT_OPTIONS}
            />
          <label>CVC</label>
           <CardCvcElement
              id="cvc"
              options={CARD_ELEMENT_OPTIONS}
            />
          <label>Expiration MM/YY</label>
          <CardExpiryElement
              id="expiry"
              options={CARD_ELEMENT_OPTIONS}
          />
          <button
            className={loading?
              "w-full text-[white] font-semibold flex items-center cursor-pointer m-2.5 p-[5px] bg-[blue]":
              "w-full text-[white] font-semibold flex items-center cursor-pointer m-2.5 p-[5px] bg-[green]"} 
          disabled={!stripe || loading} onClick={(e)=>handleSubmit(e)}>CHECKOUT NOW</button>
           {errorMsg && <div  style={{color:"red"}}> {errorMsg}</div>}
        </form>
    </div>
  );
};

export default PaymentCard;
