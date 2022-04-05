import React, { useEffect, useState } from "react";

import "./style/CategoryProductPage.css";
import { Link, useParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import MenuItem from "./MenuItem";
import axios from "axios";
// import PaginatedItems from "./Paginate"

export default function CategoryProductPage() {
  const params = useParams();
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState();
  const [catWithSubs, setCatWithSubs] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3002/products?category=${params["catName"]}`, {})
      .then((response) => {
        let data = [];
        for (let i = 0; i < response.data.length; i++) {
          console.log(response.data[i]);
          data.push(response.data[i]);
        }
        console.log(data);
        setProducts(data);
      });
  }, [window.location.pathname]);

  useEffect(() => {
    axios.get("http://localhost:3002/category").then((response) => {
      let data = [];
      for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i]);
        data.push(response.data[i].name);
      }
      console.log("categories are", data);
      setCategories(data);
    });
    // .catch((error) => {});
  }, []);

  function fetchCategoriesWithTheirSubItems() {
    for (let category of categories) {
      axios
        .get(`http://localhost:3002/products?category=${category}&_limit=8`, {})
        .then((response) => {
          //   console.log("response came");
          let data = [];
          for (let i = 0; i < response.data.length; i++) {
            data.push(response.data[i]);
          }
          setCatWithSubs((prev) => ({ ...prev, [category]: data }));
        });
    }
  }

  useEffect(() => {
    if (categories) {
      fetchCategoriesWithTheirSubItems();
    }
  }, [categories]);

  return (
    <>
      {/* <NavBar></NavBar> */}

      <div className="c-p-p-holder">
        <div className="c-p-menu">
          {Object.keys(catWithSubs).length !== 0 &&
            Object.keys(catWithSubs).map((categoryName, index) => {
              return (
                <MenuItem
                  key={index}
                  categoryTitle={categoryName}
                  subItems={catWithSubs[categoryName]}
                />
              );
            })}
        </div>
        <div className="c-p-items-holder">
          <h1>{params["catName"]}</h1>
          <div className="c-p-items">
            {products != null
              ? products.map((prod) => {
                  let url = `/product/${prod.id}`;
                  return (
                    <Link to={url}>
                      <ProductItem prod={prod} />
                    </Link>
                  );
                })
              : "nothing"}

            {/* <PaginatedItems
                            url={ '/' }
                            author={ 'adele' }
                            perPage={ 6 }
                        /> */}
          </div>
        </div>
      </div>
    </>
  );
}
