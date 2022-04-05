import axios from "axios";
import React, {useRef, useState} from "react";
import "./style/Paypanel.css";

const Paypanel = () => {
    const cartRef = useRef();
    const [cartNumber, setCartNumber] = useState();
    const pardakht = () => {
        const values = JSON.parse(localStorage.getItem("infooo"));
        console.log(values);
        pay(values);
    };

    const pay = (values) => {
        // let formData = new FormData();
        //
        // for (let key in values) {
        //     formData.append(key, values[key]);
        // }

        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart === null) cart = [];
        values["cart"] = cart;
        values["sent"] = false;
        // formData.append("cart", cart);
        console.log("Received values of form: ", values);
        axios
            .post("http://localhost:3002/orders", values)
            .then((response) => {
                console.log("carrrrt");
                console.log(cart);
                cart.forEach((product) => {
                    let productCount = parseInt(product.count);
                    let cartCount = parseInt(product.quantity);
                    product.count = productCount - cartCount;
                    delete product['quantity'];
                    console.log("payment is done");
                    console.log(product.count);
                    console.log(product);
                    axios.patch(`http://localhost:3002/products/${product.id}`, product)
                        .then(response => {
                            console.log(response);
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                });
                localStorage.setItem("cart", null);
                window.location = "/";
            })
            .catch((error) => {
                console.log(error);
            });
        // setShowModal(false);
    };

    return (
        <div class="container pt-5">
            <div class="row justify-content-center">
                <div class="col-xs-12 col-md-6 col-md-offset-4">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <div class="row">
                                <h3 class="text-center">درگاه پرداخت</h3>
                                <div class="inlineimage">
                                    {" "}
                                    <img
                                        class="img-responsive images"
                                        src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Mastercard-Curved.png"
                                    />{" "}
                                    <img
                                        class="img-responsive images"
                                        src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Discover-Curved.png"
                                    />{" "}
                                    <img
                                        class="img-responsive images"
                                        src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/Paypal-Curved.png"
                                    />{" "}
                                    <img
                                        class="img-responsive images"
                                        src="https://cdn0.iconfinder.com/data/icons/credit-card-debit-card-payment-PNG/128/American-Express-Curved.png"
                                    />{" "}
                                </div>
                            </div>

                            <div class="panel-body">
                                <form role="form">
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <div class="form-group">
                                                {" "}
                                                <label>شماره کارت:</label>
                                                <div class="input-group">
                                                    {" "}
                                                    <input
                                                        ref={cartRef}
                                                        type="text"
                                                        maxLength="16"
                                                        class="form-control"
                                                        placeholder="0000 0000 0000 0000"
                                                        value={cartNumber}
                                                        onChange={(e) => {
                                                            setCartNumber(
                                                                e.target.value.replace(/[^0-9]/gi, ""),
                                                            );
                                                        }}
                                                    />{" "}
                                                    <span class="input-group-addon">
                            <span class="fa fa-credit-card"></span>
                          </span>{" "}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-7 col-md-7">
                                            <div class="form-group">
                                                {" "}
                                                <label>
                                                    <span class="hidden-xs">تاریخ</span>
                                                    <span class="visible-xs-inline"></span> انقضا
                                                </label>{" "}
                                                <input
                                                    type="number"
                                                    // type="tel"
                                                    class="form-control"
                                                    placeholder="MM / YY"
                                                />{" "}
                                            </div>
                                        </div>
                                        <div class="col-xs-5 col-md-5 pull-right">
                                            <div class="form-group">
                                                {" "}
                                                <label>ccv2</label>{" "}
                                                <input
                                                    type="number"
                                                    // type="tel"
                                                    class="form-control"
                                                    placeholder="CVC"
                                                />{" "}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-xs-12 mb-3">
                                            <div class="form-group">
                                                {" "}
                                                <label>
                                                    <span class="hidden-xs">رمز</span>
                                                    <span class="visible-xs-inline"></span> پویا:
                                                </label>{" "}
                                                <input
                                                    type="number"
                                                    // type="tel"
                                                    class="form-control"
                                                    placeholder="** ** **"
                                                />
                                                <button className="btn btn-secondary">
                                                    درخواست رمز پویا
                                                </button>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-xs-12">
                                                <div class="form-group">
                                                    {" "}
                                                    <label>
                                                        <span class="hidden-xs">ایمیل</span>
                                                        <span class="visible-xs-inline"></span> (اختیاری):
                                                    </label>{" "}
                                                    <input
                                                        type="tel"
                                                        class="form-control"
                                                        placeholder="example@gmail.com"
                                                    />{" "}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="panel-footer mt-2">
                                <div class="row">
                                    <div class="col-6">
                                        <button
                                            class="btn btn-success btn-block"
                                            onClick={() => pardakht()}
                                        >
                                            پرداخت
                                        </button>
                                    </div>

                                    <div class="col-6">
                                        <button
                                            class="btn btn-warning btn-block"
                                            onClick={() => (window.location = "/cart") }
                                        
                                        >
                                            انصراف
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Paypanel;
