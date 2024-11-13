import React, { useEffect, useState } from "react";
import "../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import Hero from "./Hero/hero";
import Product from "./product/product";
import Top from "./TopBar/top";
import Navbar2 from "./Navbar/nav2";
import BASE_URL from "../Server/base_url";
import { FaBullhorn, FaDollarSign, FaLock, FaUserFriends } from "react-icons/fa";
import { Card, CardContent } from "./ui/card";
const Home = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const [searchData,setSearchData]=useState('');
  const [top, setTop] = useState([]);
  const [vegetable, setVegetable] = useState([]);
  const [fruit, setFruit] = useState([]);
  const [flours, setFlours] = useState([]);
  const [masala, setMasala] = useState([]);
  const [rice, setRice] = useState([]);
  const [dal, setDal] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/signup");
      return;
    }

    // Fetch data from your backend API
    const fetchData = async () => {
      try {
        const token=localStorage.getItem("token");
        console.log("token ",token)
        const response = await fetch(`${BASE_URL}/api/product/view`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const json = await response.json();
        let top = json.filter((item) => {
          return item.rating >= 4;
        });
        console.log(top);
        let veg = json.filter((item) => {
          return item.cat === "vegetable";
        });
        let fruit = json.filter((item) => {
          return item.cat === "fruit";
        });
        let masala = json.filter((item) => {
          return item.cat === "masala";
        });
        let rice = json.filter((item) => {
          return item.cat === "rice";
        });
        let dal = json.filter((item) => {
          return item.cat === "dal";
        });
        let flours = json.filter((item) => {
          return item.cat === "flours";
        });
        setTop(top);
        setFruit(fruit);
        setVegetable(veg);
        setMasala(masala);
        setRice(rice);
        setDal(dal);
        setFlours(flours);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    // Call fetchData function when component mounts
    fetchData();
  }, [token]); // Call useEffect when token changes



  return (
    <>
      {/* <Navbar /> */}
      <Navbar2 />
      {searchData.length !== 0 && (
        <>
          <Top name={"Search Items"} />
          <Product data={searchData} />
        </>
      )}
      <Hero />

      <section id="features" className="my-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-600">Why Choose E-mandi?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {[
              { icon: FaBullhorn, title: "Direct Market Access", description: "Sell directly to buyers without intermediaries." },
              { icon: FaDollarSign, title: "Fair Pricing", description: "Transparent pricing based on current market rates." },
              { icon: FaLock, title: "Secure Transactions", description: "Safe and easy payments for both buyers and sellers." },
              { icon: FaUserFriends, title: "User-Friendly Platform", description: "Simple steps to register, list, and trade." },
            ].map((feature, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center text-center p-6">
                  <feature.icon className="text-4xl mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      {top.length > 0 && (
        <>
          <Top name={"Top Products"} />
          <Product data={top} />
        </>
      )}
      {vegetable.length > 0 && (
        <>
          <Top name={"Vegetables"} />
          <Product data={vegetable} />
        </>
      )}
      {fruit.length > 0 && (
        <>
          <Top name={"Fruits"} />
          <Product data={fruit} />
        </>
      )}
      {flours.length > 0 && (
        <>
          <Top name={"Flours"} />
          <Product data={flours} />
        </>
      )}
      {rice.length > 0 && (
        <>
          <Top name={"Rice"} />
          <Product data={rice} />
        </>
      )}
      {dal.length > 0 && (
        <>
          <Top name={"Dal"} />
          <Product data={dal} />
        </>
      )}
      {masala.length > 0 && (
        <>
          <Top name={"Masalas"} />
          <Product data={masala} />
        </>
      )}
       <section className="cta-section">
        <div className="cta-content text-center">
          <h2 className="text-black">Join Thousands of Farmers Growing Their Business on E-mandi</h2>
          <Link href="/register" className="cta-button">Register Now</Link>
        </div>
      </section>
    </>
  );
};

export default Home;
