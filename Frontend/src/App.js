import React from "react";

import Navbar from "./components/Navbar/nav.jsx";
import Navbar2 from "./components/Navbar/nav2.jsx";
//import Footer from "./components/footer.jsx";
import Home from "./components/home.jsx";
import Login from "./components/login.jsx";
import Signup from "./components/signup";
import ContactUs from "./components/contact_us";
import About from "./components/about";
import FarmerDashboard from "./components/Dashboard/Farmer/main.jsx";
import BuyerDashboard from "./components/Dashboard/Buyer/main.jsx";
import Cart from "./components/cart/cart.jsx";
import Checkout from "./components/checkout/check.jsx";
import Detail from "./components/Details/details.jsx";
import AddReview from "./components/addReview/addReview.jsx";
import Payment from "./components/payment/payment.jsx";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { createContext } from "react";
import VerifyEmail from "./components/verifyemail.jsx";
import Better from "./components/Home/Home.jsx";
import Footer from "./components/Home/Footer.jsx";
import Productslist from "./components/list/productslist.jsx";
import BestSellers from "./components/product/BestSeller.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SuccessPage from "./components/checkout/success.jsx";

const MyContext = createContext();
const stripePromise = loadStripe("pk_test_51PSJcmSF49XkwZQgcmYSC18cuvNqTCWksKEubird5EXq2GlvSpaB6CCKXhCGsG0xk5uBf3IbBlnyQnOrr49EC9hO00QbVDEov4");

function App() {
  return (
    <Elements stripe={stripePromise}>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/bestseller"
          element={
            <>
              <Navbar2/>
              <BestSellers />
              <Footer />
            </>
          }
        />

        <Route
          path="/success"
          element={
            <>
              <SuccessPage />
            </>
          }
        />

        <Route
          path="/signup"
          element={
            <>
              <Navbar2 />
              <Signup />
            </>
          }
        />
         <Route
          path="/list"
          element={
            <>
              <Navbar2 />
              <Productslist/>
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar2 />
              <Login />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar2 />
              <About />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar2 />
              <ContactUs />
            </>
          }
        />

        <Route
          path="/farmerProfile"
          element={
            <>
               {/* <Navbar /> */}
              <FarmerDashboard />
            </>
          }
        />
        <Route
          path="/buyerProfile"
          element={
            <>
              {/* <Navbar /> */}
              <BuyerDashboard />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Navbar2 />
              <Cart />
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <>
              <Navbar2 />
              <Checkout />
            </>
          }
        />
        <Route 
          path="/verify-email"
          element={
            <VerifyEmail/>
          }
        />
        <Route
          path="/details"
          element={
            <>
              <Navbar2 />
              <Detail />
            </>
          }
        />
        <Route
          path="/addReview"
          element={
            <>
              <Navbar />
              <AddReview />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <Better />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Navbar />
              <Payment />
            </>
          }
        />
      </Routes>
    </Router>
    </Elements>
  );
}

export default App;

export { MyContext };
