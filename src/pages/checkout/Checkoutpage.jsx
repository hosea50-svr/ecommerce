import { Header } from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import {CheckoutHeader} from "../../components/Checkout-header"
import "./Checkout.css";
import { OrderSummary } from "./Ordersummary";




export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary,setPaymentSummary] = useState(null)

  useEffect(() => {
    axios.get("/api/delivery-options?estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });
      
    axios.get("/api/payment-summary")
      .then((response)=>{
        setPaymentSummary(response.data)
      })
  
  }, []);

  return (
    <>
      <Header />
      <title>Checkout</title>
      
    <CheckoutHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
            <OrderSummary cart={cart} deliveryOptions={deliveryOptions}/>
            <paymentSummary paymentSummary={paymentSummary}/>
          </div>
        </div>
      </>
  );
}
