import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./check.css";
import BASE_URL from "../../Server/base_url";
import Swal from "sweetalert2";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const data = location.state.data;
  const totalPrice = location.state.totalPrice;
  const shipping = location.state.shipping;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [PHno, setPHno] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [activeButton, setActiveButton] = useState(null);

  const handleNewAddressClick = () => {
    setActiveButton("new");
  };

  const handleDefaultAddressClick = () => {
    setActiveButton("default");
  };

  const States = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", 
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep", 
    "Puducherry"
  ];

  const onNameChange = (event) => setName(event.target.value);
  const onPHnoChange = (event) => setPHno(event.target.value);
  const onStateChange = (event) => setState(event.target.value);
  const onCityChange = (event) => setCity(event.target.value);
  const onPinChange = (event) => setPin(event.target.value);

  const validateName = () => name.length >= 3;
  const validatePHno = () => /^\d{10}$/.test(PHno);
  const validateCity = () => city.trim() !== "";
  const validateState = () => States.includes(state.trim());
  const validatePin = () => /^\d{6}$/.test(pin);

  function inputHandel(e) {
    e.preventDefault();
  }

  const goCart = () => navigate("/cart");

  const onContinue = () => {
    if (
      validateCity() && validateName() && validatePin() && validateState() && validatePHno() && activeButton === "new"
    ) {
      placeOrder();
    } else if (activeButton === "default") {
      placeOrder();
      console.log(data);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Select Address",
        text: "",
      });
    }
  };

  const placeOrder = async () => {
    try {
      let products = [];
      data.forEach((item) => {
        const updatedPrice = shipping ? item.price + 5 : item.price;
        products.push({
          productId: item.productId,
          productName: item.productName,
          price: updatedPrice,
          quantity: item.quantity,
          description: item.description,
          farmer_id: item.farmer_id,
          image: item.image,
          shipping: shipping,
        });
      });
      

      const details={
        address: activeButton,
        name: name,
        PHno: PHno,
        state: state,
        city: city,
        pin: pin,
        price: data.price,
        cat: data.cat,
        buyer_id: data.buyer_id,
        buyerName: data.buyerName,
        date: data.date,
        products: products
      }

      localStorage.setItem('details', JSON.stringify(details));
      const response = await axios.post(`${BASE_URL}/api/pay/create-payment-intent`, {
        address: activeButton,
        name: name,
        PHno: PHno,
        state: state,
        city: city,
        pin: pin,
        price: data.price,
        cat: data.cat,
        buyer_id: data.buyer_id,
        buyerName: data.buyerName,
        date: data.date,
        products: products,
      });
  
      console.log("Response from server:", response);
  
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "redirecting to checkout page",
          showConfirmButton: false,
          timer: 1500,
        });
        
        // Corrected redirection syntax
        window.location.href = response.data.url;
      } else {
        Swal.fire({
          icon: "warning",
          title: "Not Listed",
          text: "",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: "There was an error placing your order. Please try again later.",
      });
    }
  };
  
  return (
    <section className="cartSection mb-5 checkoutPage">
      <div className="container">
        <form>
          <div className="row check_body">
            <div className="col-md-8">
              <div className="address_body">
                <h1 className="address_heading container">Delivery Address</h1>
                <form className="container list_body" onClick={inputHandel}>
                  <div className="form-row list_main row">
                    <div className="col-sm-12 col-md-6">
                      <label htmlFor="validationServer01">Name</label>
                      <input
                        type="text"
                        className={validateName() ? "form-control is-valid" : "form-control is-invalid"}
                        id="validationServer01"
                        placeholder="Name"
                        required
                        onChange={onNameChange}
                      />
                    </div>

                    <div className="col-sm-12 col-md-6">
                      <label htmlFor="validationServer02">Phone No.</label>
                      <input
                        type="text"
                        className={validatePHno() ? "form-control is-valid" : "form-control is-invalid"}
                        id="validationServer02"
                        placeholder="10-Digit"
                        onChange={onPHnoChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row row">
                    <div className="col-sm-12">
                      <label htmlFor="validationServer03">City</label>
                      <input
                        type="text"
                        className={validateCity() ? "form-control is-valid" : "form-control is-invalid"}
                        id="validationServer03"
                        placeholder="City"
                        required
                        onChange={onCityChange}
                      />
                    </div>
                  </div>

                  <div className="form-row row">
                    <div className="col-sm-12 col-md-6">
                      <label htmlFor="validationServer04">State</label>
                      <input
                        type="text"
                        className={validateState() ? "form-control is-valid" : "form-control is-invalid"}
                        id="validationServer04"
                        placeholder="State"
                        required
                        onChange={onStateChange}
                      />
                    </div>

                    <div className="col-sm-12 col-md-6">
                      <label htmlFor="validationServer05">Pin Code</label>
                      <input
                        type="text"
                        className={validatePin() ? "form-control is-valid" : "form-control is-invalid"}
                        id="validationServer05"
                        placeholder="Pin Code"
                        required
                        onChange={onPinChange}
                      />
                    </div>
                  </div>

                  <div className="address_btn">
                    <button
                      type="button"
                      className={`btn btn-outline-success address_buttons ${activeButton === "new" ? "active" : ""}`}
                      onClick={handleNewAddressClick}
                    >
                      Use New Address
                    </button>
                    <button
                      type="button"
                      className={`btn btn-outline-success address_buttons ${activeButton === "default" ? "active" : ""}`}
                      onClick={handleDefaultAddressClick}
                    >
                      Use Default Address
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-md-4 cartRightBox">
              <div className="container proceed-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 black_color">Subtotal</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold black_color">
                    <span className="text-g black_color">{totalPrice}</span>
                  </h3>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 black_color">Shipping Fee</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold black_color">
                    <span className="black_color">{!shipping ? "FREE" : 5}</span>
                  </h3>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <h5 className="mb-0 black_color">Total</h5>
                  <h3 className="ml-auto mb-0 font-weight-bold black_color">
                    <span className="black_color">{shipping ? totalPrice + 5 : totalPrice}</span>
                  </h3>
                </div>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="confirm_button"
                  onClick={onContinue}
                >
                  Continue
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  className="confirm_button mt-3"
                  onClick={goCart}
                >
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
