import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./style/Login.css";
import { Form, Input, Button, Checkbox, Typography, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";

function Login() {
  const [isCheckingTokenFinished, setIsCheckingTokenFinished] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    axios
      .post("http://localhost:3002/auth/login", {
        password: values.password,
        username: values.username,
      })
      .then((response) => {
        if (response.status === 200) {
          //message.success("Logged in!")
          let token = response.data.token;
          localStorage.setItem("username", values.username);
          localStorage.setItem("token", token);
          window.location = "/Management";
        } else {
          message.error("Wrong Credentials");
        }
      })
      .catch((error) => {
        message.error("This account is not activated");
        console.log(error);
      });
  };

  useEffect(() => {
    const tokenInLocal = localStorage.getItem("token");
    // "http://localhost:3002/auth/login";
    if (tokenInLocal) {
      axios
        .post("http://localhost:3002/auth/refresh-token", undefined, {
          headers: {
            token: tokenInLocal,
          },
        })
        .then((resp) => {
          console.log("my useEffect, resp is", resp.data.token);
          // Updating the token in localStorage with the new generated one (refresh token)
          localStorage.setItem("token", resp.data.token);
          window.location.assign("/Management");
        })
        .catch((error) => {
          // message.error("Backend could not refresh the token bcz it is expired. wtf!!!");
          console.log("We have error in refresh-token api. The error is : ", {
            error,
          });
          setIsCheckingTokenFinished(true);
        });
    } else {
      setIsCheckingTokenFinished(true);
    }
  }, []);

  if (!isCheckingTokenFinished) {
    return (
      <div
        style={{
          height: "calc(100vh - 60px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        در حال چک کردن توکن...
      </div>
    );
  }

  return (
    <Card
      className="login-card pt-5 pb-5 d-flex align-items-center justify-content-center"
      bodyStyle={
        {
          // position: "relative",
          // top: "50%",
          // left: "50%",
          // transform: `translate(-50%, -50%)`,
        }
      }
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <div className="form-group">
            <Input
              id="username"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="نام کاربری"
            />
          </div>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <div className="form-group">
            <Input
              id="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="رمز عبور"
            />
          </div>
        </Form.Item>

        <Form.Item>
          <div className="form-group">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              ورود
            </Button>
            <Typography>
              <a className="login-form-register" href="/">
                بازگشت به سایت
              </a>
            </Typography>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Login;
