import React from "react";

import "./style/SubmitCart.css";
import { Button, Form, Input, message, Select, Upload } from "antd";
import axios from "axios";

export default function SubmitCart() {
  const [form] = Form.useForm();

  const submitForm = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("hi", values);
        localStorage.setItem("infooo", JSON.stringify(values));
        // pay(values);
        form.resetFields();
        window.location = "/paypanel";
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const checkFirstName = (_, value) => {
    if (
      !new RegExp(/[`0123456789!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(
        value,
      )
    ) {
      return Promise.resolve();
    }

    return Promise.reject(new Error("تنها حروق الفبا مجاز هستند"));
  };

  const checkLastName = (_, value) => {
    if (!new RegExp(/[`0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(value)) {
      return Promise.resolve();
    }

    return Promise.reject(new Error("تنها حروق الفبا مجاز هستند"));
  };

  const checkPhoneNumber = (_, value) => {
    if (new RegExp(/[`0-9]/).test(value) && value.length > 0) {
      return Promise.resolve();
    }

    return Promise.reject(new Error("تنها عدد وارد شود"));
  };

  const checkAddress = (_, value) => {
    if (value.length > 0) {
      return Promise.resolve();
    }

    return Promise.reject(new Error("نمیتواند خالی باشد"));
  };

  const checkDate = (_, value) => {
    if (value.length > 0) {
      return Promise.resolve();
    }

    return Promise.reject(new Error("نمیتواند خالی باشد"));
  };

  return (
    <>
      <div className="submit-cart-holder">
        <h1>نهایی کردن سبد خرید</h1>
        <Form
          style={{ direction: "rtl" }}
          form={form}
          layout="vertical"
          name="form_in_modal"
        >
          <Form.Item
            name="firstName"
            label="نام"
            rules={[
              {
                validator: checkFirstName,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="نام خانوادگی"
            rules={[
              {
                validator: checkLastName,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="آدرس"
            rules={[
              {
                validator: checkAddress,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="تلفن همراه"
            rules={[
              {
                validator: checkPhoneNumber,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="تاریخ تحویل"
            rules={[
              {
                validator: checkDate,
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
        <Button type="primary" onClick={submitForm}>
          پرداخت
        </Button>
      </div>
    </>
  );
}
