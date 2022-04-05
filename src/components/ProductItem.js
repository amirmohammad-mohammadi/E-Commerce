import React from "react";

import "./style/ProductItem.css";

import product from "../assets/product.png";

export default function ProductItem(props) {
  return (
    <div className="product-item-holder text-center d-flex flex-column align-items-center justify-content-center">
      <div className="product-item-img">
        <img src={`/uploads/${props.prod.images[0]}`} alt="product" />
      </div>
      <div className="product-item-info">
        <div className="product-item-info">
          <p>{props.prod.firstName}</p>

          <span>
            <span className="ml-2">قیمت:</span>
            {props.prod.price}
            <span className="ms-1">تومان</span>
          </span>
        </div>
      </div>
    </div>
  );
}
