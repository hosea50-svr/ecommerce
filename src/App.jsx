import axios from 'axios';
import './App.css'
import { Routes,Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/Checkoutpage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import { useEffect,useState } from 'react';


function App() {
  const [cart, setCart] = useState([]);
  useEffect(()=>{
    axios('/api/cart-items')
            .then((response) => {
                setCart(response.data);
            })
  },[])

  return (
      <>
         <Routes>
            <Route index element={<HomePage cart={cart}/>} />
            <Route path='checkout' element={ <CheckoutPage cart={cart}/> } />
            <Route path='orders' element={ <OrdersPage /> } />
            <Route path='tracking' element={ <TrackingPage /> } />
          </Routes>
      </>
  )
}

export default App
