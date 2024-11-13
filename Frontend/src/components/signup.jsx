import React, { useState } from "react";
import "../styles/signup.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios"; // Make sure axios is imported
import { useDispatch } from "react-redux";
import { setSignupData } from "../slices/authSlice";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

const Signup = () => {
  const [formData, setFormData] = useState({
    role: "farmer",
    email: "",
    password: "",
    name: "",
    phno: "",
    state: "",
    city: "",
    pin: "",
  });
  
  const [loading, setLoading] = useState(false); // Add loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleErrors = (errorType) => {
    const errorMessages = {
      exist: "User Already Exists",
      pin: "Give a valid PIN code",
      phno: "Give a valid Phone Number",
      state: "Give a valid State Name",
      email: "Give a valid Email",
      password: "Give a valid Password",
      name: "Give a valid Name",
    };

    Swal.fire({
      icon: "warning",
      title: errorMessages[errorType] || "Invalid Credentials",
    });
  };

  const onSubmitSignUp = async () => {
    dispatch(setSignupData(formData));
    
    setLoading(true); // Set loading to true when request starts
    
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/sendotp",
        { email: formData.email }
      );
      
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.error("SENDOTP API ERROR:", error);
      toast.error("Could Not Send OTP");
    } finally {
      setLoading(false); // Set loading to false once the request completes
    }
  };

  return (
    <div className="container whole-body">
      <div className="form-container-signup mb-8">
        <p className="title">Sign Up</p>

        <div className="input-group mb-3 option_signup">
          <select
            className="form-select"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="phno">Phone Number</label>
          <input
            type="text"
            name="phno"
            placeholder="Enter your phone number"
            value={formData.phno}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            name="state"
            placeholder="Enter your state"
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            placeholder="Enter your city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="pin">PIN Code</label>
          <input
            type="text"
            name="pin"
            placeholder="Enter your PIN code"
            value={formData.pin}
            onChange={handleInputChange}
          />
        </div>

        <button className="sign" onClick={onSubmitSignUp} disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"} {/* Show loading text when loading */}
        </button>

        <p className="signup">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
