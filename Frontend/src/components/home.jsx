import React from "react";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero/hero";
import Navbar from "./navbar";
import Product from "./product/product";

const Home = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  function checkAuthJoin() {
    if (!token) {
      navigate("/signup");
    } else {
      navigate("/join");
    }
  }
  function checkAuthHost() {
    if (!token) {
      navigate("/signup");
    } else {
      navigate("/host");
    }
  }
  return (
    <>
      <Navbar />
      <Hero />
      <Product />
    </>
  );
};

export default Home;
