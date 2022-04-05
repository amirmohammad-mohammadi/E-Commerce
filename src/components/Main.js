import React, { useEffect, useState } from "react";

import "./style/Main.css";
import CategoryProduct from "./CategoryProducts";
import axios from "axios";

export default function Main({ searchInput, setSearchInput, isFormSubmitted }) {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3002/category").then((response) => {
      let data = [];
      for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i]);
        data.push(response.data[i].name);
      }
      console.log("foo", data);
      setCategory(data);
    });
    // .catch((error) => {});
  }, [searchInput]);

  // onCHANGE
  // useEffect(() => {
  //   if (searchInput) {
  //     axios
  //       .get(
  //         `http://localhost:3002/products?category=${props.categoryName}&_limit=8`,
  //         {},
  //       )
  //       .then((response) => {
  //         let data = [];
  //         for (let i = 0; i < response.data.length; i++) {
  //           console.log(response.data[i]);
  //           data.push(response.data[i]);
  //         }
  //         console.log(data);
  //         setProducts(data);
  //       });
  //   }
  // }, [searchInput]);

  return (
    <>
      <main>
        {category !== null
          ? category.map((category) => {
              return (
                <CategoryProduct
                  categoryName={category}
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  isFormSubmitted={isFormSubmitted}
                />
              );
            })
          : "nothing"}
      </main>
    </>
  );
}
