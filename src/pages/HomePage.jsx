import './HomePage.css';
import { formatMoney } from '../utils/money';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function HomePage({ cart }) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
 

  return (
    <>
      <title>Ecommerce</title>

      <Header cart={cart} />

      <div className="home-page">
        <div className="products-grid">

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

            : products.map((product) => (
                <div key={product.id} className="product-container">

                  <div className="product-image-container">
                    <img
                      className="product-image"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>

                  <div className="product-name limit-text-to-2-lines">
                    {product.name}
                  </div>

                  <div className="product-rating-container">
                    <img
                      className="product-rating-stars"
                      src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                      alt="rating"
                    />
                    <div className="product-rating-count link-primary">
                      {product.rating.count}
                    </div>
                  </div>

                  <div className="product-price">
                    {formatMoney(product.priceCents)}
                  </div>

                  <div className="product-quantity-container">
                    <select>
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="product-spacer"></div>

                  <button className="add-to-cart-button button-primary">
                    Add to Cart
                  </button>

                </div>
              ))
          }

        </div>
      </div>
    </>
  );
}