import "./hero.css";
import React from "react";
import Farmered from "../../images/farmerd.webp";
import Slide1 from "../../images/Hero/slider-1.png";
import Slide2 from "../../images/Hero/slider-2.png";
import { Link } from "react-router-dom";

const Hero = (props) => {
  let token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return (
    <>
      {/*<section className="homeSlider">
        <div className="container-fluid position-relative">
          <div className="home_slider_Main">
            {role === "farmer" ? (
              <div className="item">
                <img src={Slide1} className="w-100" />
                <div className="info">
                  <h2 class="mb-4">
                    List Your Fresh
                    <br />
                    Vegetables
                  </h2>
                  {token ? (
                    <p>Make Profit</p>
                  ) : (
                    <p>Sign up for listing your product</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="item">
                <img src={Slide2} className="w-100" />
                <div className="info">
                  <h2 class="mb-3">
                    Fresh Vegetables
                    <br />
                    Big discount
                  </h2>
                  {token ? (
                    <p>Get some fresh food</p>
                  ) : (
                    <p>Sign up for get discount</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section> */}
        <section className="bg-green-50 py-12 md:py-24">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className=" mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Fresh from Farm to Your Doorstep</h1>
                <p className="text-xl mb-4">Discover the finest local produce at your fingertips.</p>
                <ul className="list-disc list-inside mb-6 space-y-2">
                  <li>Direct from local farmers</li>
                  <li>100% fresh and organic options</li>
                  <li>Supporting local agriculture</li>
                  <li>Convenient home delivery</li>
                </ul>
               <Link to="/list"> <button size="lg" className="cta-button">
                  Shop Now
                </button></Link>
              </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src={Farmered}
                  alt="Fresh produce"
                  width={800}
                  height={800}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
    </>
  );
};
export default Hero;
