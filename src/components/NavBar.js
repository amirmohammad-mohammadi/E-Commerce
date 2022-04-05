import React, { useEffect, useState } from "react";
import "./style/NavBar.css";
import { Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop, faUser } from "@fortawesome/free-solid-svg-icons";

export default function NavBar({
  searchInput,
  setSearchInput,
  isFormSubmitted,
  setIsFormSubmitted,
  numberKey,
}) {
  // console.log("searchInput is ", searchInput);
  const [bagNumber, setBagNumber] = useState(0);

  useEffect(() => {
    function updateBagNumber() {
      console.log("Inside update");
      const bag = JSON.parse(localStorage.getItem("cart"));
      console.log("Bag is", bag);
      if (bag) {
        setBagNumber(bag.length);
      }
    }

    updateBagNumber();

    // console.log("registering");
    // window.addEventListener("storage", updateBagNumber, false);

    // return () => {
    //   // unregistering
    //   window.removeEventListener("storage", updateBagNumber, false);
    // };
  }, [numberKey]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">
              <Link className="modiriyat" to="/admin">
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                <span className="ms-1">مدیریت</span>
              </Link>
            </Nav.Link>
            <Nav.Link href="/">
              <Link className="cart" to="/cart">
                <FontAwesomeIcon icon={faShop}></FontAwesomeIcon>
                <span>مدیریت سبد خرید</span>
                {bagNumber !== 0 && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      aspectRatio: "1 / 1",
                      borderRadius: "50%",
                      background: "red",
                      color: "#FFF",
                    }}
                  >
                    {bagNumber}
                  </span>
                )}
              </Link>
            </Nav.Link>
          </Nav>

          <Form
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              setIsFormSubmitted(true);
            }}
          >
            <FormControl
              //   type="search"
              placeholder="نام کالا..."
              className="me-2"
              aria-label="Search"
              defaultValue={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setIsFormSubmitted(false);
              }}
            />
            <Button variant="outline-success" type="submit">
              بگرد
            </Button>
          </Form>
        </Navbar.Collapse>

        <Navbar.Brand href="#home" className="ms-md-5">
          فروشگاه آنلاین
          <i className="bi bi-shop ms-2"></i>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
