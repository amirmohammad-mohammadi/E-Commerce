import React from "react";
import "./style/HomePage.css";
import Main from "./Main";
import Slider from "./Slider";
import Footer from "./Footer";
export default function HomePage({
  searchInput,
  setSearchInput,
  isFormSubmitted,
}) {
  return (
    <>
      {/* <NavBar></NavBar> */}
      {!isFormSubmitted && <Slider />}
      <Main
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        isFormSubmitted={isFormSubmitted}
      />
      <Footer />
    </>
  );
}
