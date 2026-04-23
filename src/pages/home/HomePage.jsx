import './HomePage.css';
// import { formatMoney } from '../../utils/money';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductGrid } from './ProductsGrid';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function HomePage({ cart }) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  let isMounted = true;

  const getHomeData = async () => {
    try {
      const response = await axios.get('/api/products');
      if (isMounted) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  getHomeData();

  return () => {
    isMounted = false;
  };
}, []);
 

  return (
    <>
      <title>Ecommerce</title>

      <Header cart={cart} /> 
      <div className="home-page">
          {loading
                    ? Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="product-container">
        
                          <div className="product-image-container">
                            <Skeleton height={200} />
                          </div>
        
                          <div className="product-name">
                            <Skeleton count={2} />
                          </div>
        
                          <div className="product-rating-container">
                            <Skeleton width={100} />
                          </div>
        
                          <div className="product-price">
                            <Skeleton width={80} />
                          </div>
        
                          <div className="product-quantity-container">
                            <Skeleton height={30} />
                          </div>
        
                          <div className="product-spacer"></div>
        
                          <Skeleton height={40} />
                        </div>
                      ))
      
        :<ProductGrid products={products}/>
        }
      </div>
    </>
  );
}