import { Header } from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import {CheckoutHeader} from "../../components/Checkout-header"
import "./Checkout.css";
import { OrderSummary } from "./Ordersummary";
import { PaymentSummary } from "./PaymentSummary";




export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary,setPaymentSummary] = useState(null)

  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get("/api/delivery-options?estimatedDeliveryTime")
        setDeliveryOptions(response.data);
        
    response = await axios.get("/api/payment-summary")
        setPaymentSummary(response.data)
    }
    fetchCheckoutData()
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
            <PaymentSummary paymentSummary={paymentSummary}/>
          </div>
        </div>
      </>
  );
}
