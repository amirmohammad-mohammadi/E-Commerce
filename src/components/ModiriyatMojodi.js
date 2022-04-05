import React, { useContext, useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import "./style/Login.css";
import Managebar from "./Managebar";
import { Col, Row, Button, Table, Form, Input } from "antd";

import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { style } from "@mui/system";

const EditableContext = React.createContext(null);

function Management() {
  const [data, setData] = useState([]);
  const [updated, setUpdated] = useState(false);

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        console.log("happened here!");
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };

    const checkEnteredValue = (_, value) => {
      if (parseInt(value) > 0) {
        return Promise.resolve();
      }

      return Promise.reject(new Error("مقدار عددی بیش از صفر وارد کنید"));
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              validator: checkEnteredValue,
            },
          ]}
        >
          <Input type="number" ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  let columns = [
    {
      title: "کالا",
      dataIndex: "name",
      key: "name",
      align: "right",
    },
    {
      title: "قیمت",
      dataIndex: "price",
      key: "price",
      align: "right",
      editable: true,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
      render: (price) => {
        return parseFloat(price).toLocaleString("en-US", 1);
      },
    },
    {
      title: "موجودی",
      dataIndex: "count",
      key: "count",
      align: "right",
      editable: true,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.count - b.count,
      render: (count) => {
        return parseFloat(count).toLocaleString("en-US", 1);
      },
    },
  ];

  const myColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    const handleSave = (row) => {
      console.log(row);
      const newData = [...data];
      const index = newData.findIndex((item) => row.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
      setData(newData);
    };

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  useEffect(() => {
    axios.get("http://localhost:3002/products", {}).then((response) => {
      let data = [];
      for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i]);
        data.push({
          key: response.data[i].firstName,
          id: response.data[i].id,
          name: response.data[i].firstName,
          price: response.data[i].price ? response.data[i].price : 0,
          count: response.data[i].count ? response.data[i].count : 0,
        });
      }
      console.log(data);
      setData(data);
    });
    // .catch((error) => {});
  }, [updated]);

  const saveTable = () => {
    let token = localStorage.getItem("token");
    data.forEach((product) => {
      axios
        .patch(`http://localhost:3002/products/${product.id}`, product, {
          headers: {
            token: `${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          setUpdated(!updated);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <div>
      <Managebar />

      <Row>
        <Col span={20} style={{ marginLeft: "100px" }}>
          <h3 style={{ margin: "20px" }}>مدیریت موجودی و قیمت ها</h3>
        </Col>
        <Col span={2} style={{ marginLeft: "1.8%" }}>
          <Button onClick={saveTable}>ذخیره </Button>
        </Col>
      </Row>

      <Table
        style={{ margin: "80px" }}
        components={components}
        columns={myColumns}
        dataSource={data}
      />
    </div>
  );
}

export default Management;
