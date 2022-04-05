import React from "react";
import {Col, Row, Button, Checkbox, Typography, Card, message, Table, Tag, Space} from 'antd';

// import './style/NavBar.css';
import {Link} from "react-router-dom";

export default function Managebar() {

    return (
        <Row>
            <Col style={{marginLeft: '20px'}} span="flex">
                <h1 style={{margin: '20px'}}> پنل مدیریت فروشگاه</h1>
            </Col>
            <Col span={3}>
                <Link to="/ModiriyatKala">
                    <p style={{margin: '20px'}}>
                        <button>کالاها</button>
                    </p>
                </Link>
            </Col>
            <Col span={1}>

                <p style={{marginTop: '20px'}}> | </p>
            </Col>
            <Col span={4}>
                <Link to="/Management">
                    <p style={{margin: '20px'}}>
                        <button>موجودی و قیمتها</button>
                    </p>
                </Link>
            </Col>
            <Col span={1}>
                <p style={{marginTop: '20px'}}> | </p>
            </Col>
            <Col span={3}>
                <Link to="/ModiriyatSefaresh">
                    <p style={{margin: '20px'}}>
                        <button>سفارش ها</button>
                    </p>
                </Link>
            </Col>
            <Link to="/">
                <li className="">بازگشت به سایت</li>
            </Link>
        </Row>
    );
};