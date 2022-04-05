import React from "react";
import { Link } from "react-router-dom";

import "./style/MenuItem.css";

export default function MenuItem({ categoryTitle, subItems = [] }) {
  console.log("subItems is", subItems);
  return (
    <ul className="menu-item-holder">
      <Link to={`/category-product-page/${categoryTitle}`}>
        {categoryTitle}
      </Link>
      {subItems.map((subItem) => {
        let url = `/product/${subItem.id}`;
        return (
          <Link to={url}>
            <li>{subItem.firstName}</li>
          </Link>
        );
      })}
    </ul>
  );
}
