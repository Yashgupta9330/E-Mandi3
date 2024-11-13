// import React from "react";
// import "./navbar.css";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { FaUserCircle } from "react-icons/fa";

// function Navbar() {
//   const role = localStorage.getItem("role");
//   let flag = false;

//   return (
//     <>
//       <div className="navbar_body container-fluid position-relative">
//         <nav class="navbar navbar-expand-lg navbar-dark ">
//           <div class="container">
//             {/* Logo */}
//             <Link class="navbar-brand" to="/">
//               E-Mandi
//             </Link>

//             {/* Toggle-Btn */}
//             <button
//               class="navbar-toggler shadow-none border-0"
//               type="button"
//               data-bs-toggle="offcanvas"
//               data-bs-target="#offcanvasNavbar"
//               aria-controls="offcanvasNavbar"
//               aria-label="Toggle navigation"
//             >
//               <span class="navbar-toggler-icon"></span>
//             </button>

//             {/* SideBar */}
//             <div
//               class="sidebar offcanvas offcanvas-start"
//               tabindex="-1"
//               id="offcanvasNavbar"
//               aria-labelledby="offcanvasNavbarLabel"
//             >
//               {/* Sidebar-Header */}
//               <div class="offcanvas-header text-white border-bottom">
//                 <h5 class="offcanvas-title nav_txt" id="offcanvasNavbarLabel">
//                   E-Mandi
//                 </h5>
//                 <button
//                   type="button"
//                   class="btn-close btn-close-white "
//                   data-bs-dismiss="offcanvas"
//                   aria-label="Close"
//                 ></button>
//               </div>

//               {/* Profile Section */}
//               {localStorage.getItem("token") ? (
//                 <>
//                   <div className=" d-flex flex-column flex-lg-row p-4 justify-content-center align-items-center gap-3 ">
//                     {/* Cart */}
//                     {role == "buyer" ? (
//                       <Link
//                         class=" text-decoration-none px-3 py-1 rounded-4 nav_txt nav_txt_hov "
//                         to="/cart"
//                       >
//                         <i class="fa-solid fa-cart-shopping"></i>
//                       </Link>
//                     ) : (
//                       <></>
//                     )}
//                     {/* Profile */}
//                     {role == "farmer" ? (
//                       <Link
//                         class=" text-decoration-none px-3 py-1 rounded-4 nav_txt nav_txt_hov profile_nav"
//                         to="/farmerProfile"
//                       >
//                         <FaUserCircle />
//                       </Link>
//                     ) : (
//                       <Link
//                         class=" text-decoration-none px-3 py-1 rounded-4 nav_txt nav_txt_hov profile_nav"
//                         to="/buyerProfile"
//                       >
//                         <FaUserCircle />
//                       </Link>
//                     )}
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className=" d-flex flex-column flex-lg-row p-4 justify-content-center align-items-center gap-3 ">
//                     <Link
//                       class=" text-decoration-none px-3 py-1 rounded-4 nav_txt_hov"
//                       to="/Login"
//                     >
//                       <i class="fa-solid fa-right-to-bracket"></i>Login
//                     </Link>
//                     <Link
//                       class="text-decoration-none px-3 py-1 rounded-4 nav_txt_hov"
//                       id="signup"
//                       to="/signup"
//                     >
//                       <i class="fa-solid fa-user-plus"></i>Sign Up
//                     </Link>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// }

// export default Navbar;
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import BASE_URL from "../../Server/base_url";

import "./navbar.css";

const Navigation = (props) => {
  let expand = "xl";
  const role = localStorage.getItem("role");

  const [searchItem, setSearchItem] = useState([]);

  const onSearch = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/search/show/${searchItem}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        // Handle non-successful response (status code other than 2xx)
        if (response.status === 404) {
          // Handle 404 Not Found
          Swal.fire({
            title: "Not Found",
            text: `Product with name '${searchItem}' not found`,
            icon: "error",
          });
          props.setSearchData([]); // Clear searchData state
        } else {
          // Handle other error statuses (e.g., 500 Internal Server Error)
          Swal.fire({
            title: "Error",
            text: `Failed to fetch data (${response.status})`,
            icon: "error",
          });
        }
      } else {
        // Successful response (status code 2xx)
        const json = await response.json();
        props.setSearchData(json); // Update searchData state with response data
      }
    } catch (error) {
      // Handle network errors or exceptions
      console.error("Error fetching data:", error.message);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch data. Please try again later.",
        icon: "error",
      });
    }
  };

  const onItem = (event) => {
    setSearchItem(event.target.value);
  };

  return (
    <>
      <Navbar
        key={expand}
        expand={expand}
        className="bg-body-tertiary mb-3 navbar_body"
      >
        <Container fluid>
          <Link class="navbar-brand" to="/">
            E-Mandi
          </Link>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                E-Mandi
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="off-canvas-body">
              <Nav className="justify-content-center flex-grow-1 pe-3">
                <Link
                  class="nav-link  text-decoration-none px-3 py-1 rounded-4 nav_txt_hov"
                  aria-current="page"
                  to="/"
                >
                  <i class="fa-solid fa-house"></i>
                  Home
                </Link>
                <Link
                  class="nav-link  text-decoration-none px-3 py-1 rounded-4 nav_txt_hov"
                  to="/about"
                >
                  <i class="fa-solid fa-circle-info"></i>
                  About
                </Link>
                <Link
                  class="nav-link  text-decoration-none px-3 py-1 rounded-4 nav_txt_hov"
                  to="/list"
                >
                  <i class="fa-solid fa-circle-info"></i>
                  Products
                </Link>
                <Link
                  class="nav-link  text-decoration-none px-3 py-1 rounded-4 nav_txt_hov"
                  to="/bestseller"
                >
                  <i class="fa-solid fa-circle-info"></i>
                  BestSeller
                </Link>
                <Link
                  class="nav-link  text-decoration-none px-3 py-1 rounded-4 nav_txt_hov"
                  to="/contact"
                >
                  <i class="fa-solid fa-circle-info"></i>
                  Contact
                </Link>
              </Nav>

              {localStorage.getItem("token") ? (
                <>
                  <div className=" d-flex flex-column flex-lg-row  justify-content-center align-items-center gap-3 ">
                    {/* Cart */}
                    {role == "buyer" ? (
                      <Link
                        class=" text-decoration-none px-3 py-1 rounded-4 nav_txt nav_txt_hov "
                        to="/cart"
                      >
                        <i class="fa-solid fa-cart-shopping"></i>
                      </Link>
                    ) : (
                      <></>
                    )}
                    {/* Profile */}
                    {role == "farmer" ? (
                      <Link
                        class=" text-decoration-none px-2 py-2 rounded-4 nav_txt nav_txt_hov profile_nav"
                        to="/farmerProfile"
                      >
                        <FaUserCircle />
                      </Link>
                    ) : (
                      <Link
                        class=" text-decoration-none px-3 py-1 rounded-4 nav_txt nav_txt_hov profile_nav"
                        to="/buyerProfile"
                      >
                        <FaUserCircle />
                      </Link>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className=" d-flex flex-column flex-lg-row  justify-content-center align-items-center gap-3 ">
                    <Link
                      class=" text-decoration-none px-3 py-1 rounded-4 nav_txt_hov"
                      to="/Login"
                    >
                      <i class="fa-solid fa-right-to-bracket"></i>Login
                    </Link>
                    <Link
                      class="text-decoration-none px-3 py-1 rounded-4 nav_txt_hov"
                      id="signup"
                      to="/signup"
                    >
                      <i class="fa-solid fa-user-plus"></i>Sign Up
                    </Link>
                  </div>
                </>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
