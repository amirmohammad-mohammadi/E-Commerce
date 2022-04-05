import {Button, Typography, Table, Modal, Space, Radio} from "antd";
import Managebar from './Managebar';
import {useEffect, useState} from "react";
import axios from "axios";

const data = [
    {
        key: "1",
        name: "علی",
        sum: "25000000",
        date: "1400/02/10",
    },
    {
        key: "1",
        name: "علی",
        sum: "25000000",
        date: "1400/02/10",
    },
    {
        key: "1",
        name: "علی",
        sum: "25000000",
        date: "1400/02/10",
    },
    {
        key: "1",
        name: "علی",
        sum: "25000000",
        date: "1400/02/10",
    },
    {
        key: "1",
        name: "علی",
        sum: "25000000",
        date: "1400/02/10",
    },
    {
        key: "1",
        name: "علی",
        sum: "25000000",
        date: "1400/02/10",
    },
    {
        key: "1",
        name: "علی",
        sum: "25000000",
        date: "1400/02/10",
    },
    {
        key: "1",
        name: "علی",
        sum: "25000000",
        date: "1400/02/10",
    },
    {
        key: "1",
        name: "علی",
        sum: "25000000",
        date: "1400/02/10",
    },
    {
        key: "1",
        name: "علی",
        sum: "25000000",
        date: "1400/02/10",
    },
    {
        key: "1",
        name: "علی",
        sum: "25000000",
        date: "1400/02/10",
    },

];

const ModiriyatSefaresh = () => {

    const [checkModal, setCheckedModal] = useState(true);
    const [orders, setOrders] = useState(null);
    const [changed, setChanged] = useState(false);
    const [checkRadioButton, setRadioChecked] = useState(1);
    const [updated, setUpdated] = useState(false);

    const columns = [
        {
            title: "نام کاربر",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "مجموع مبلغ",
            dataIndex: "sum",
            key: "sum",
            render: (sum) => {
                return parseFloat(sum).toLocaleString("en-US", 1);
            },
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.sum - b.sum,
        },
        {
            title: "تاریخ سفارش",
            dataIndex: "date",
            key: "date",
        },

        {
            title: "عملیات",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        onClick={() => {
                            console.log(record);
                            Modal.info({
                                visible: {checkModal},
                                title: "جزییات سفارش",
                                okButtonProps: {
                                    style: {
                                        display: "none",
                                    },
                                },
                                closable: true,
                                content: (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <span>نام مشتری:{record.firstName}</span>
                                            <span>آدرس:{record.address}</span>
                                            <span>تلفن:{record.phone}</span>
                                            <span>زمان تحویل:{record.date}</span>
                                            <span>زمان سفارش:{new Date(record.createdAt).toLocaleDateString("en-US")}</span>
                                            {/* <span>نام خانوادگی:ببببب</span> */}
                                        </div>
                                        <Table
                                            dataSource={record.cart}
                                            columns={[
                                                {
                                                    title: "تعداد",
                                                    dataIndex: "quantity",
                                                    key: "quantity",
                                                },
                                                {
                                                    title: "قیمت",
                                                    dataIndex: "price",
                                                    key: "price",
                                                },
                                                {
                                                    title: "کالا",
                                                    dataIndex: "firstName",
                                                    key: "firstName",
                                                },
                                            ]}
                                        />
                                        {
                                            !record['sent'] ?
                                                <Button
                                                    onClick={() => changeStateToSent(record)}
                                                >
                                                    ارسال شده
                                                </Button>
                                                :
                                                <></>
                                        }
                                    </>
                                ),
                            });
                        }}
                    >
                        بررسی
                    </Button>

                </Space>
            ),
        },
    ];

    useEffect(() => {
        console.log("called");
        axios
            .get("http://localhost:3002/orders", {})
            .then((response) => {
                let data = [];
                for (let i = 0; i < response.data.length; i++) {

                    let total = 0;

                    let cart = response.data[i].cart;

                    for (let i = 0; i < cart.length; i++) {
                        total += parseFloat(cart[i].quantity) * parseFloat(cart[i].price);
                    }
                    response.data[i]['sum'] = total;
                    console.log(response.data[i]['sent']);
                    if (checkRadioButton === 1) {
                        if (response.data[i]['sent'] === true)
                            data.push(response.data[i]);
                    } else if (checkRadioButton === 2) {
                        if (response.data[i]['sent'] === false)
                            data.push(response.data[i]);
                    }
                }
                console.log(data);
                setOrders(data);
            })
    }, [checkRadioButton, updated]);

    const changeStateToSent = (record) => {
        let token = localStorage.getItem("token");

        record['sent'] = true;
        console.log(record);

        axios.patch(`http://localhost:3002/orders/${record.id}`, record, {
            headers: {
                'token': `${token}`
            }
        })
            .then(response => {
                console.log(response);
                setChanged(!changed);
            })
            .catch((error) => {
                console.log(error);
            });
        setCheckedModal(true);
        setUpdated(!updated);
    }

    return (
        <>
            <Managebar/>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 2em ",
                }}
            >
                <Typography.Title level={4}>سفارشات</Typography.Title>
                <Radio.Group onChange={(e) => {
                    setRadioChecked(e.target.value);
                }} value={checkRadioButton}>
                    <Radio value={1}>سفارش های تحویل داده شده </Radio>
                    <Radio value={2}>سفارش های در انتظار</Radio>
                </Radio.Group>{" "}
            </div>
            <Table style={{width: "100%"}} columns={columns} dataSource={orders}/>
        </>
    );
};
export default ModiriyatSefaresh;