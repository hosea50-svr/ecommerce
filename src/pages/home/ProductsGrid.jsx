// import axios from 'axios';
// import { formatMoney } from "../../utils/money";
// import { useState } from 'react';
import { Product } from './Product';

export function ProductGrid({products,loadCart}){
  
    return(
        <div className="products-grid">

         {products.map((product) => {
                return(
                  <Product key={product.id} product={product} loadCart= {loadCart} ></Product>
                )
             } )}
            
        </div>
    );
}