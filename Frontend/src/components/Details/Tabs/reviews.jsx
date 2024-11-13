import React from "react";
import { useState } from "react";
import "../details.css";

import Rating from "@mui/material/Rating";

import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import Swal from "sweetalert2";
import BASE_URL from "../../../Server/base_url";

const Reviews = (props) => {
   const data = props.data;
   console.log("reviews ",props)
  // const {price,image,owner_id,_id,curQuantity,productName} = props;

  {/* const onSubmit = async () => {
    if (reviewFields.rating > 0 && reviewFields.review.length > 0) {
      try {
        const response = await fetch(`${BASE_URL}/api/review/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            rating: reviewFields.rating,
            review: reviewFields.review,
            productId: item.productId,
            orderId: item._id,
            farmer_id: item.farmer_id,
            product_name: item.productName,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
          }),
        });

        const json = await response.json();
        if (json.success) {
          Swal.fire({
            icon: "success",
            title: "Review Submitted",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please Enter Review & Rating",
        text: "",
      });
    }
  }; */}

  return (
    <div className="tabContent">
      <div className="row">
        <div className="col-md-4 pl-5 reviewBox">
          <h4>Customer reviews</h4>

          <div className="d-flex align-items-center mt-2">
            <Rating
              name="half-rating-read"
              defaultValue={2}
              precision={0.5}
              readOnly
            />
            <strong className="ml-3">{data.rating} out of 5</strong>
          </div>

          <br />

          <div className="progressBarBox d-flex align-items-center">
            <span className="mr-3">5 star</span>
            <div class="progress" style={{ width: "85%", height: "20px" }}>
              <div
                class="progress-bar bg-success"
                style={{ width: "75%", height: "20px" }}
              >
                75%
              </div>
            </div>
          </div>

          <div className="progressBarBox d-flex align-items-center">
            <span className="mr-3">4 star</span>
            <div class="progress" style={{ width: "85%", height: "20px" }}>
              <div
                class="progress-bar bg-success"
                style={{ width: "50%", height: "20px" }}
              >
                50%
              </div>
            </div>
          </div>

          <div className="progressBarBox d-flex align-items-center">
            <span className="mr-3">3 star</span>
            <div class="progress" style={{ width: "85%", height: "20px" }}>
              <div
                class="progress-bar bg-success"
                style={{ width: "55%", height: "20px" }}
              >
                55%
              </div>
            </div>
          </div>

          <div className="progressBarBox d-flex align-items-center">
            <span className="mr-3">2 star</span>
            <div class="progress" style={{ width: "85%", height: "20px" }}>
              <div
                class="progress-bar bg-success"
                style={{ width: "35%", height: "20px" }}
              >
                35%
              </div>
            </div>
          </div>

          <div className="progressBarBox d-flex align-items-center">
            <span className="mr-3">1 star</span>
            <div class="progress" style={{ width: "85%", height: "20px" }}>
              <div
                class="progress-bar bg-success"
                style={{ width: "25%", height: "20px" }}
              >
                25%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
