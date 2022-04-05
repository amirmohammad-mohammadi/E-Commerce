import React, { useEffect, useState } from "react";

import "./style/CategoryProduct.css";

import ProductItem from "./ProductItem";

import { Link } from "react-router-dom";
import axios from "axios";

export default function CategoryProduct(props) {
  const [products, setProducts] = useState(null);
  let catUrl = `/category-product-page/${props.categoryName}`;

  useEffect(() => {
    axios
      .get(
        `http://localhost:3002/products?category=${props.categoryName}&_limit=8`,
        {},
      )
      .then((response) => {
        let data = [];
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i]);
          data.push(response.data[i]);
        }
        console.log(data);
        setProducts(data);
      });
  }, []);

  if (
    props.isFormSubmitted &&
    !!props.searchInput &&
    !products?.find((el) => el.firstName.includes(props.searchInput))
  )
    return null;
  console.log("p are ", products);

  return (
    <>
      {/* <NavBar></NavBar> */}
      <section className="category-product">
        <div className="c-p-title">
          <Link to={catUrl}>{props.categoryName}</Link>
        </div>
        <div className="category-product-holder">
          {!!props.searchInput && props.isFormSubmitted
            ? products
                ?.filter((el) => el.firstName.includes(props.searchInput))
                .map((prod) => {
                  let url = `/product/${prod.id}`;
                  return (
                    <Link to={url}>
                      <ProductItem prod={prod} />
                    </Link>
                  );
                })
            : // we have items for the writen search input
            products
            ? products.map((prod) => {
                let url = `/product/${prod.id}`;
                return (
                  <Link to={url}>
                    <ProductItem prod={prod} />
                  </Link>
                );
              })
            : "nothing"}
        </div>
      </section>
    </>
  );
}
