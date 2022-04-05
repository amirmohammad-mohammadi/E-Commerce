import React from "react";
import { Button, Form, Input } from "antd";

import "./style/PaymentStyle.css";

export default function PaymentPage() {
  const [form] = Form.useForm();

  const submitForm = () => {};

  return (
    <>
      <div className="payment-wrapper">
        <h1>نهایی کردن سبد خرید</h1>
        <Form
          style={{ direction: "rtl" }}
          form={form}
          layout="vertical"
          name="form_in_modal"
        >
          <Form.Item name="firstName" label="نام">
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="نام خانوادگی">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="آدرس">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="تلفن همراه">
            <Input />
          </Form.Item>
          <Form.Item name="date" label="تاریخ تحویل">
            <Input />
          </Form.Item>
        </Form>
        <Button type="primary" onClick={submitForm}>
          پرداخت
        </Button>
      </div>
    </>
  );
}
