import React, { useEffect, useState } from "react";

import "./style/Product.css";

import productt from "../assets/product.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { InputNumber } from "antd";
import { Carousel } from "react-bootstrap";

export default function Product({ setNumberKey }) {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/products/${params["id"]}`)
      .then((response) => {
        setProduct(response.data);
      });
  }, []);

  const addToCart = () => {
    console.log(localStorage.getItem("cart"));
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart === null) cart = [];
    let id = product.id;
    let firstName = product.firstName;
    let price = product.price;
    let image = product.images;
    let count = product.count;

    let found = cart.findIndex((pro) => pro.firstName === firstName);

    if (found !== -1) {
      cart.splice(found);
    }

    let item = {
      id,
      firstName,
      price,
      quantity,
      image,
      count,
    };

    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    setNumberKey(Date.now());
  };

  const updateQuantity = (value) => {
    setQuantity(value);
  };

  return (
    <>
      {product !== null ? (
        <div className="product-holder">
          <div className="product-header">
          {/* <div className="product-img">
              <img src={`/uploads/${product.images[0]}`} alt="not-loaded" />
            </div> */}
            <Carousel>
              {product.images.map((image) => {
                return (
                  <Carousel.Item>
                    <img
                      className="d-block w-100 img-fluid"
                      src={`/uploads/${image}`}
                      alt="First slide"
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
            <div className="product-info">
              <h1>{product.firstName}</h1>
              <h2>{product.price} تومان</h2>
              <div>
                {product.count <= 0 ? (
                  "اتمام موجودی"
                ) : (
                  <>
                    <InputNumber
                      min={1}
                      max={product.count}
                      defaultValue={1}
                      onChange={updateQuantity}
                    />
                    <button onClick={addToCart}>افزودن به سبد خرید</button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="product-footer">
            <p>{product.desc}</p>
          </div>
        </div>
      ) : (
        "nothing"
      )}
    </>
  );
}
