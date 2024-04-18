import React from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const role = localStorage.getItem("role");
  let flag = false;

  return (
    <>
      <div className="navbar_body container-fluid position-relative">
        <nav class="navbar navbar-expand-lg navbar-dark ">
          <div class="container">
            {/* Logo */}
            <Link class="navbar-brand" to="/">
              E-Mandi
            </Link>

            {/* Toggle-Btn */}
            <button
              class="navbar-toggler shadow-none border-0"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            {/* SideBar */}
            <div
              class="sidebar offcanvas offcanvas-start"
              tabindex="-1"
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              {/* Sidebar-Header */}
              <div class="offcanvas-header text-white border-bottom">
                <h5 class="offcanvas-title nav_txt" id="offcanvasNavbarLabel">
                  E-Mandi
                </h5>
                <button
                  type="button"
                  class="btn-close btn-close-white "
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>

              {/* Profile Section */}
              {localStorage.getItem("token") ? (
                <>
                  <div className=" d-flex flex-column flex-lg-row p-4 justify-content-center align-items-center gap-3 ">
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
                        class=" text-decoration-none px-3 py-1 rounded-4 nav_txt nav_txt_hov profile_nav"
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
                  <div className=" d-flex flex-column flex-lg-row p-4 justify-content-center align-items-center gap-3 ">
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
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
