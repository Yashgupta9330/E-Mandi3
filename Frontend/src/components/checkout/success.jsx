import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';  // If you're using react-router for navigation
import BASE_URL from '../../Server/base_url';

const SuccessPage = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate hook for navigation

  useEffect(() => {
    const fetchSessionDetails = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get('session_id');
      
      // Retrieve stored user details from localStorage
      const details = JSON.parse(localStorage.getItem('details')); // Assuming 'details' is an object in localStorage
      
      if (sessionId && details) {
        try {
          const response = await fetch(`${BASE_URL}/api/order/place`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"), // Assuming you store the auth-token in localStorage
            },
            body: JSON.stringify({
              address: details.address, // Example, map the relevant fields from details
              name: details.name,
              PHno: details.PHno,
              state: details.state,
              city: details.city,
              pin: details.pin,
              price: details.price,
              cat: details.cat,
              buyer_id: details.buyer_id,
              buyerName: details.buyerName,
              date: details.date,
              products: details.products,  // Assuming `details` includes product info
              sessionId: sessionId,  // Send the sessionId along with the order details
            }),
          });

          const json = await response.json();
          console.log(json);
          
          if (json.success) {
            Swal.fire({
              icon: "success",
              title: "Order Placed",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/"); // Redirect to homepage or another route after success
          } else {
            Swal.fire({
              icon: "warning",
              title: "Not Listed",
              text: json.message || "There was an issue placing your order.",
            });
          }
        } catch (error) {
          console.error("Error fetching session details:", error);
          Swal.fire({
            icon: "error",
            title: "Order Failed",
            text: "There was an error placing your order. Please try again later.",
          });
        } finally {
          setLoading(false);
        }
      } else {
        // Handle case where session_id or details are missing
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Invalid Order",
          text: "Session details are missing or invalid.",
        });
      }
    };

    fetchSessionDetails();
  }, []);  // Empty dependency array ensures the effect runs only once after initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderDetails) {
    return <div>Order not found or payment failed.</div>;
  }

  return (
    <div>
      <h1>Order Successfully Placed!</h1>
      <p>Order ID: {orderDetails.id}</p>
      <p>Amount: {orderDetails.amount}</p>
    </div>
  );
};

export default SuccessPage;
