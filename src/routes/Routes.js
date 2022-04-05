import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import HomePage from "../components/HomePage";
import Product from "../components/Product";
import NavBar from "../components/NavBar";
import CategoryProductPage from "../components/CategoryProductPage";
import Cart from "../components/Cart";
import SubmitCart from "../components/SubmitCart";
import Login from "../components/Admin";
import Management from "../components/ModiriyatMojodi";
// import AdminHeader from "../components/AdminHeader";
import ModiriyatKala from "../components/ModiriyatKala";
import ModiriyatSefaresh from "../components/ModiriyatSefaresh";
import PaymentPage from "../components/PaymentPage";
import { useState } from "react";
import Paypanel from "../components/Paypanel";

// import NavBar from "../NavBar";

function RoutePages() {
  const [searchInput, setSearchInput] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [numberKey, setNumberKey] = useState(0);

  return (
    <>
      <NavBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        isFormSubmitted={isFormSubmitted}
        setIsFormSubmitted={setIsFormSubmitted}
        numberKey={numberKey}
      />
      <Routes>
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/paypanel" element={<Paypanel />} />
        <Route path="/submit-cart" element={<SubmitCart />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/category-product-page/:catName"
          element={<CategoryProductPage />}
        />
        <Route
          path="/product/:id"
          element={<Product setNumberKey={setNumberKey} />}
        />

        <Route path="/admin" element={<Login />} />

        <Route path="/management" element={<Management />} />
        {/* <Route path="/AdminHeader" element={<AdminHeader/>}/> */}
        <Route path="/ModiriyatKala" element={<ModiriyatKala />} />
        <Route path="/ModiriyatSefaresh" element={<ModiriyatSefaresh />} />
        {/* <Route path="/NavBar" element={<NavBar/>}/> */}
        <Route
          exact
          path="/"
          element={
            <HomePage
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              isFormSubmitted={isFormSubmitted}
            />
          }
        />
      </Routes>
    </>
  );
}

export default RoutePages;
