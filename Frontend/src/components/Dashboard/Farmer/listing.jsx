import React, { useState } from "react";
import "./listing.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BASE_URL from "../../../Server/base_url";

const Listing = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [cat, setCat] = useState("vegetable");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [image, setImage] = useState(null);
  const States = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];

  const navigate = useNavigate();

  // Input change handlers
  const onQuantityChange = (event) => setQuantity(event.target.value);
  const onCatChange = (event) => setCat(event.target.value);
  const onNameChange = (event) => setName(event.target.value);
  const onDescriptionChange = (event) => setDescription(event.target.value);
  const onPriceChange = (event) => setPrice(event.target.value);
  const onStateChange = (event) => setState(event.target.value);
  const onCityChange = (event) => setCity(event.target.value);
  const onPinChange = (event) => setPin(event.target.value);

  const onImageChange = (event) => {
    console.log("entered image")
    setImage(event.target.files[0]);
  };

  // Validation functions
  const validateName = () => name.length >= 3;
  const validateDescription = () => description.length >= 10;
  const validateQuantity = () => !isNaN(quantity) && quantity >= 1 && quantity <= 100;
  const validatePrice = () => !isNaN(price) && price >= 1 && price <= 10000;
  const validateCity = () => city.trim() !== "";
  const validateState = () => States.includes(state.trim());
  const validatePin = () => /^\d{6}$/.test(pin);


  const uploadImageToS3 = async (file) => {
    try {
      const response = await fetch(`${BASE_URL}/api/add/getPresignedUrl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });

      const { url } = await response.json();
      console.log("url ",url);
      const s3Upload = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (s3Upload.ok) {
        console.log("Image successfully uploaded to S3!");
        return url.split("?")[0];
      } else {
        throw new Error("Failed to upload image to S3");
      }
    } catch (error) {
      console.error("Error uploading image to S3", error);
      throw error;
    }
  };


  const onList = async () => {
    console.log("entered ")
    try {
      if (
        validateDescription() &&
        validateName() &&
        validatePrice() &&
        validateQuantity()
      ) {
        let imageUrl = "";
        if (image) {
          imageUrl = await uploadImageToS3(image);
        }
        const response = await fetch(`${BASE_URL}/api/product/listing`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            productName: name,
            quantity: quantity,
            description: description,
            price: price,
            cat: cat,
            state: state,
            city: city,
            pin: pin,
            image: imageUrl,
          }),
        });

        const json = await response.json();

        if (json.success) {
          Swal.fire({
            icon: "success",
            title: "Product added successfully",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/");
        } else {
          Swal.fire({
            icon: "warning",
            title: "Not Listed",
            text: "",
          });
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Fill all the fields",
          text: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <h1 className="list_heading container">List A New Product</h1>
      <form className="container list_body">
        <div class="form-row list_main row">
          <div class="col-sm-12 col-md-6 ">
            <label for="validationServer01">Product name</label>
            <input
              type="text"
              className={
                validateName()
                  ? "form-control is-valid"
                  : "form-control is-invalid"
              }
              id="validationServer01"
              placeholder="Name of the product"
              required
              onChange={onNameChange}
            />
            {!validateName() ? (
              <div className="invalid-feedback">
                Name must be at least 3 characters long.
              </div>
            ) : (
              <div class="valid-feedback">Looks good!</div>
            )}
          </div>
          <div class="col-sm-12 col-md-6 list_option">
            <label for="validationServer01">Category</label>
            <select
              className="form-select is-valid"
              id="inputGroupSelect03"
              aria-label="Example select with button addon"
              onChange={onCatChange}
              required
            >
              <option value="vegetable">Vegetable</option>
              <option value="fruit">Fruit</option>
              <option value="flours">Atta & Flours</option>
              <option value="masala">Masala & Spices</option>
              <option value="rice">Rice & Rice products</option>
              <option value="dal">Dal & pulses</option>
            </select>
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="col-sm-12 col-md-6 ">
            <label for="validationServer02">Product Quantity</label>
            <input
              type="text"
              className={
                validateQuantity()
                  ? "form-control is-valid"
                  : "form-control is-invalid"
              }
              id="validationServer02"
              placeholder="KG"
              onChange={onQuantityChange}
              required
            />
            {!validateQuantity() ? (
              <div className="invalid-feedback">
                Quantity must be a number between 1 and 100.
              </div>
            ) : (
              <div class="valid-feedback">Looks good!</div>
            )}
          </div>
          <div class="col-sm-12 col-md-6 ">
            <label for="validationServer02">Product Price</label>
            <input
              type="text"
              className={
                validatePrice()
                  ? "form-control is-valid"
                  : "form-control is-invalid"
              }
              id="validationServer02"
              placeholder="Rs./KG"
              onChange={onPriceChange}
              required
            />
            {!validatePrice() ? (
              <div className="invalid-feedback">
                Price must be a number between 1 and 10000.
              </div>
            ) : (
              <div class="valid-feedback">Looks good!</div>
            )}
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <label htmlFor="productImage">Upload Image</label>
          <input
            type="file"
            id="productImage"
            className="form-control"
            onChange={onImageChange}
            accept="image/*"
          />
        </div>
        <div class="col-sm-12 col-md-12 ">
          <label htmlFor="validationServer01">Product Description</label>
          <input
            type="text"
            className={
              validateDescription()
                ? "form-control is-valid"
                : "form-control is-invalid"
            }
            id="validationServer01"
            placeholder="Description"
            required
            onChange={onDescriptionChange}
          />
          {!validateDescription() ? (
            <div className="invalid-feedback">
              Description must be at least 10 characters long.
            </div>
          ) : (
            <div class="valid-feedback">Looks good!</div>
          )}
        </div>
        <button className="btn btn-primary list_btn" onClick={(event) => { event.preventDefault(); onList(); }}>
          List Product
        </button>
      </form>
    </div>
  );
}


export default Listing;