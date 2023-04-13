import { Smartphone } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
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

const Choice = styled.option`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  margin: 10px;
`;
const Selector = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: fit-content ${mobile({ width: "80%", flexDirection: "column" })};
`;
const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MpesaButton = styled.div`
  width: 100%;
  padding: 10px;
  margin: 10px;
  background-color: green;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Button = styled.button`
  width: 100%;
  padding: 5px;
  margin: 10px;
  background-color: ${(props) => props.isloading? 'blue': 'green'};
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const PaymentCard = (props) => {
  const [payment, setPayment] = useState("");
  const [delivery, setDelivery] = useState("");
  const [address, setAddress] = useState("Store Pickup");
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const [phone, setPhone] = useState(user.phone);
  const [deliveryPhone, setDeliveryphone] = useState();
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [err, setErr] = useState(false);
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
     setMessage(false);
     if (response.error) {
       setErrorMsg(typeof response.error === 'string' ? response.error : response.error.message);
       payment === 'mpesa' && setErr(true);
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
      description:desc || "None",
      userid: user.userid,
      address: address,
      status: 'pending',
    };
    await axios.post('https://pastrybox.000webhostapp.com/server/index.php?direct=paymentinit', body).then((res) => {
      handleResponse(res.data);
    })
  }
}
  
  useEffect(() => {
  delivery==="pickup" && setAddress("Store Pickup")
  }, [delivery])

  
  const Lipanampesa = async () => {
    const body = {
      phone: phone,
      name: user.name,
      email:user.email,
      amount: cart.total,
      products: cart,
      description: desc || "None",
      userid: user.userid,
      address: address,
      status: 'pending',
    };
   if (phone) {
    setMessage(true);
    axios.post("https://pastrybox.000webhostapp.com/server/index.php?direct=mpesa", body,).then((res) => {
        handleResponse(res.data);
    })
   } else {
     setErr(true);
   }
  };

  return (
    <ColumnDiv>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label for="address" style={{ marginBottom: "10px" }}>
              Please enter any requirements for your order, 
            </label>
            <input
              id="desc"
              type="text"
              placeholder="Allergies, design etc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              />
        <h4>Enter Delivery Details</h4>
         <Selector>
          <select
            name="delivery"
            id="delivery"
            label="Enter Delivery Details"
            style={{ marginBottom: "10px" }}
            onChange={(e) => setDelivery(e.target.value)}
          >
            <Choice value="pickup">Store Pickup</Choice>
            <Choice value="delivery">Delivery</Choice>
          </select>
        </Selector>
        {delivery === "delivery" && (
        <ColumnDiv>
          <ColumnDiv>
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
            </ColumnDiv>
        </ColumnDiv>
      )}
        <h4>Choose payment method below</h4>
        <Selector>
          <select
            name="payment"
            id="payment"
            label="Select a Payment Method"
            style={{ marginBottom: "10px" }}
            onChange={(e) => setPayment(e.target.value)}
          >
            <Choice value="">Select Payment Method</Choice>
            <Choice value="card">Pay {cart.total} with Card</Choice>
            <Choice value="mpesa">Pay {cart.total} with Mpesa </Choice>
          </select>
        </Selector>
      </div>
      {payment === "mpesa" && (
        <ColumnDiv>
          <form  onSubmit={Lipanampesa}>
          <ColumnDiv>
            <label for="phone" style={{ marginBottom: "10px" }}>
              Please Enter Your Mpesa Number
            </label>
            <input
              id="phone"
              type="text"
              placeholder="+25471234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </ColumnDiv>
          <Selector>
            <MpesaButton type='submit'>
              Proceed to Payment
              <Smartphone />
            </MpesaButton>
            { message && <div style={{color:"green"}}>Please complete payment on your phone as prompted </div>}
           { err && <div style={{color:"red"}}>Payment not complete</div>}
            </Selector>
            </form>
        </ColumnDiv>
      )}
      {payment === "card" && (
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
          <Button disabled={!stripe || loading} isloading={loading} onClick={(e)=>handleSubmit(e)}>CHECKOUT NOW</Button>
           {errorMsg && <div  style={{color:"red"}}> {errorMsg}</div>}
        </form>
      )}
    </ColumnDiv>
  );
};

export default PaymentCard;
