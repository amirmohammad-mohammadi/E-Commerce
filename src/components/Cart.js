import React, { useEffect, useState } from "react";

import "./style/Cart.css";
import { Link } from "react-router-dom";
import { Button, Modal, Popconfirm, Space, Table } from "antd";
// import { confirm } from "react-confirm-box";

export default function Cart() {
  const columns = [
    {
      title: "عکس",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return <img src={`/uploads/${image[0]}`} width="50px" height="50px" alt="product" />;
      },
    },
    {
      title: "کالا",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "قیمت",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return parseFloat(price).toLocaleString("en-US", 1);
      },
    },
    {
      title: "تعداد",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => {
        return parseFloat(quantity).toLocaleString("en-US", 1);
      },
    },

    {
      title: "عملیات",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="کالا برای همیشه از سیستم حذف خواهد شد، آیا مطمئن هستید؟"
            onConfirm={() => removeItem(record)}
            okText="بله"
            cancelText="خیر"
          >
            <Button>حذف</Button>
          </Popconfirm>
          
          <Button onClick={() => increaseOne(record)}>+</Button>
          <Button
            onClick={() => decreaseOne(record)}
            disabled={Number(record.quantity) === 1}
          >
            -
          </Button>
        </Space>
      ),
    },
  ];

  const [cartItems, setCartItems] = useState(null);
  const [total, setTotal] = useState(0);

  function increaseOne(record) {
    if (Number(record.quantity) + 1 > Number(record.count)) return;
    const localBag = JSON.parse(localStorage.getItem("cart"));

    const foundItem = localBag.find((el) => el.firstName === record.firstName);

    const manipulatedFoundItem = {
      ...foundItem,
      quantity: Number(foundItem.quantity) + 1,
    };

    // removing the existing item from bag
    const newBag = localBag.filter((el) => el.firstName !== record.firstName);
    // Adding
    const finalBag = [...newBag, manipulatedFoundItem];
    localStorage.setItem("cart", JSON.stringify(finalBag));
    setCartItems(finalBag);
  }

  function decreaseOne(record) {
    const localBag = JSON.parse(localStorage.getItem("cart"));

    const foundItem = localBag.find((el) => el.firstName === record.firstName);

    const manipulatedFoundItem = {
      ...foundItem,
      quantity: Number(foundItem.quantity) - 1,
    };

    // removing the existing item from bag
    const newBag = localBag.filter((el) => el.firstName !== record.firstName);
    // Decreasing
    const finalBag = [...newBag, manipulatedFoundItem];
    localStorage.setItem("cart", JSON.stringify(finalBag));
    setCartItems(finalBag);
  }

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart === null) cart = [];
    setCartItems(cart);
    let sum = 0;
    for (const item of cart) {
      if (!parseFloat(item.price)) item.price = 0;

      sum += parseFloat(item.price) * parseFloat(item.quantity);
    }
    setTotal(sum);
  }, []);

  const removeItem = (record) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart === null) cart = [];

    let newCartList = cart.filter((pro) => pro.id !== record.id);
    
    localStorage.setItem("cart", JSON.stringify(newCartList));
    setCartItems(newCartList);
  };

  return (
    <>
      <div className="cart-holder">
        <h1>سبد خرید</h1>
        <Table
          style={{ width: "100%" }}
          dataSource={cartItems}
          columns={columns}
        />
        <div className="cart-footer">
          <span>جمع {total.toLocaleString("en-US", 1)} تومان</span>
          {cartItems !== null && cartItems.length > 0 ? (
            <Link to="/submit-cart">
              <button>نهایی کردن سبد خرید</button>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
