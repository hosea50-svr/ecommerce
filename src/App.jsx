import axios from 'axios';
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/Checkoutpage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/tracking/TrackingPage';
import { useEffect, useState, useCallback } from 'react';

function App() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // memoize function so it doesn't recreate on every render
  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('/api/cart-items?expand=product');
      setCart(response.data);

    } catch (err) {
      console.error('Error loading cart:', err);
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <>
      <Routes>
        <Route 
          index 
          element={
            <HomePage 
              cart={cart} 
              loadCart={loadCart}
              loading={loading}
              error={error}
            />
          } 
        />

        <Route 
          path='checkout' 
          element={<CheckoutPage cart={cart} loading={loading} />} 
        />

        <Route 
          path='orders' 
          element={<OrdersPage cart={cart} />} 
        />

        <Route 
          path='tracking' 
          element={<TrackingPage />} 
        />
      </Routes>
    </>
  );
}

export default App;