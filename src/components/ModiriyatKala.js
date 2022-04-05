import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Typography,
  Upload,
  Popconfirm,
  message,
} from "antd";
import { useEffect, useState } from "react";
import Managebar from "./Managebar";
import axios from "axios";
// import { confirm } from "react-confirm-box"

const ModiriyatKala = () => {
  const [fileList, setFileList] = useState([]);
  const [categories, setCategory] = useState(null);
  const [product, setProduct] = useState(-1);
  const [changed, setChanged] = useState(false);
  const [data, setData] = useState(null);
  const [images, setImages] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();

  // const uploadProps = {
  //     name: 'images',
  //     action: 'http://localhost:3002/products',
  //     headers: {
  //         token: localStorage.getItem("token")
  //     },
  //     multiple: false,
  // };

  const confirm = (record) => {
    removeProduct(record);
    message.success("کالا با موفقیت حذف شد.");
  };

  const columns = [
    {
      title: "تصویر",
      dataIndex: "images",
      key: "images",
      render: (theImageURL) => {
        return (
          <img
            width="100px"
            height="100px"
            alt={`/uploads/${theImageURL[0]}`}
            src={`/uploads/${theImageURL[0]}`}
          />
        );
      },
    },
    {
      title: "نام",
      dataIndex: "firstName",
      key: "name",
    },
    {
      title: "دسته بندی",
      dataIndex: "category",
      key: "category",
    },

    {
      title: "عملیات",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={(e) => editProduct(record)}>ویرایش</Button>
          <Popconfirm
            title="کالا برای همیشه از سیستم حذف خواهد شد، آیا مطمئن هستید؟"
            onConfirm={() => confirm(record)}
            okText="بله"
            cancelText="خیر"
          >
            <Button>حذف</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const editProduct = (record) => {
    setShowModal(true);
    form.setFieldsValue(record);
    setImages(record.images);
    setProduct(record);
  };

  const uploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const removeProduct = (record) => {
    let token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3002/products/${record.key}`, {
        headers: {
          token: `${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setChanged(!changed);
      })
      .catch((error) => {
        console.log(error);
      });
    setChanged(!changed);
  };

  const UploadImage = async (data, config) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/upload",
        data,
        config
      );
      return response;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const onCreate = async (values) => {
    let token = localStorage.getItem("token");
    console.log("real values");
    console.log(values);
    let formData = new FormData();

    for (let key in values) {
      formData.append(key, values[key]);
    }
    // formData.append("images", fileList.originFileObj);

    const reqConfig = {
      headers: {
        "content-type": "multipart/form-data",
        token,
      },
    };
    let uploadedPhotos = [];
    for (let i = 0; i < fileList.length; i++) {
      let formData = new FormData();
      formData.append("image", fileList[i].originFileObj);
      await UploadImage(formData, reqConfig).then((res) => {
        uploadedPhotos.push(res.data.filename);
      });
    }

    if (product === -1) {
      const allFormData = {
        images: uploadedPhotos,
        firstName: values.firstName,
        price: values.price,
        count: values.count,
        createdAt: new Date().getTime(),
        category: values.category,
        desc: values.desc,
      };
      axios
        .post("http://localhost:3002/products", allFormData, {
          headers: {
            token: `${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          setChanged(!changed);
        })
        .catch((error) => {
          console.log(error);
        });
      setShowModal(false);
    } else {
      const allFormData = {
        images: [...images, ...uploadedPhotos],
        firstName: values.firstName,
        price: values.price,
        count: values.count,
        createdAt: values.createdAt,
        category: values.category,
        desc: values.desc,
      };
      axios
        .patch(`http://localhost:3002/products/${product.key}`, allFormData, {
          headers: {
            token: `${token}`,
          },
        })
        .then((response) => {
          setChanged(!changed);
        })
        .catch((error) => {
          console.log(error);
        });
      setShowModal(false);
      setProduct(-1);
    }
    setFileList([]);
  };

  useEffect(() => {
    axios.get("http://localhost:3002/products", {}).then((response) => {
      let data = [];
      response.data
        .slice(0)
        .reverse()
        .forEach((item) => {
          data.push({
            key: item.id,
            images: item.images,
            firstName: item.firstName,
            price: item.price,
            count: item.count,
            desc: item.desc,
            category: item.category,
          });
        });
      setData(data);
    });

    axios.get("http://localhost:3002/category", {}).then((response) => {
      let cat = [];
      for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i]);
        cat.push(response.data[i].name);
      }
      setCategory(cat);
    });
    // .catch((error) => {});
  }, [changed]);

  const checkFirstName = (_, value) => {
    if (value.length > 0) {
      return Promise.resolve();
    }

    return Promise.reject(new Error("نمیتواند خالی باشد"));
  };

  const checkDesc = (_, value) => {
    if (value.length > 0) {
      return Promise.resolve();
    }

    return Promise.reject(new Error("نمیتواند خالی باشد"));
  };

  return (
    <>
      <Managebar />
      <Modal
        visible={showModal}
        title="ویرایش / ایجاد کالا"
        okText="انجام"
        cancelText="لغو"
        onCancel={() => {
          form.resetFields();
          setImages([]);
          setFileList([]);
          setShowModal(false);
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onCreate(values);
              setImages([]);
              setFileList([]);
              form.resetFields();
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          style={{ direction: "rtl" }}
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            firstName: "",
            desc: "",
            category: "تارتان",
            images: [],
          }}
        >
          <Form.Item name="images" label="عکس ها">
            {/* <Input style={{ width: "70%" }} /> */}
            <div
              style={{ width: "100%", display: "flex", marginBottom: "10px" }}
            >
              {images?.map((item, index) => {
                return (
                  <div style={{ position: "relative" }} key={`images-${index}`}>
                    <img
                      width="60px"
                      height="60px"
                      style={{ margin: "0 10px" }}
                      alt={`/uploads/${item}`}
                      src={`/uploads/${item}`}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "10px",
                        color: "white",
                        fontSize: "18px",
                        cursor: "pointer",
                        padding: "0 5px",
                      }}
                      onClick={() => {
                        let filteredImages = images.filter(
                          (image) => image !== item
                        );
                        setImages(filteredImages);
                      }}
                    >
                      x
                    </div>
                  </div>
                );
              })}
            </div>
            <Upload
              fileList={fileList}
              onChange={uploadChange}
              // beforeUpload={() => false}
              style={{ width: "30%" }}
            >
              <Button>آپلود</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="firstName"
            label="نام کالا"
            rules={[
              {
                validator: checkFirstName,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="price" label="قیمت" >
            <Input type="number"/>
          </Form.Item>
          <Form.Item name="count" label="تعداد" >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="category" label={"دسته بندی"}>
            <Select>
              {categories != null ? (
                categories.map((cat) => {
                  return <Select.Option value={cat}>{cat}</Select.Option>;
                })
              ) : (
                <Select.Option value="سایر">سایر</Select.Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item
            name="desc"
            label={"توضیحات"}
            rules={[
              {
                validator: checkDesc,
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 2em ",
        }}
      >
        <Typography.Title level={4}>کالاها</Typography.Title>
        <Button
          type="primary"
          onClick={() => {
            setShowModal(true);
          }}
        >
          افزودن کالا
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};
export default ModiriyatKala;
