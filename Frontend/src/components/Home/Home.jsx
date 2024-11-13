import { FaBullhorn, FaDollarSign, FaLock, FaUserFriends } from "react-icons/fa";
import Farmered from "../../images/farmerd.webp";
import potato from "../../images/potato.jpg"
import tomato from "../../images/tomato.jpg";
import onion from "../../images/onion.jpg";
import Footer from "./Footer";
import { Navbar } from "./Nav";
import { Link } from "react-router-dom";
import Card from "./Card";  

export default function Better() {
  const products = [
    {
      id: 1,
      name: "Tomato",
      image: tomato,
      price: 40,
      location: "Delhi",
    },
    {
      id: 2,
      name: "Potato",
      image: potato,
      price: 30,
      location: "Mumbai",
    },
    {
      id: 3,
      name: "Onion",
      image: onion,
      price: 50,
      location: "Pune",
    },
  ];

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <section className="flex justify-between items-center mx-8">
        <div className="text-3xl px-8">
          <h1>Connecting Farmers to the Best Market Deals</h1>
          <p>Buy and Sell Fresh Produce and Grains with Ease.</p>
          <Link to="/product-listing" className="cta-button">
            Start Selling
          </Link>
        </div>
        <div className="p-8">
          <img src={Farmered} alt="Happy Farmer" width={600} height={200} className="rounded-lg" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features py-8">
        <div className="container">
          <h2>Why Choose E-mandi?</h2>
          <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Feature Cards */}
            <div className="feature-card flex flex-col items-center text-center">
              <FaBullhorn className="feature-icon text-4xl mb-4" />
              <h3>Direct Market Access</h3>
              <p>Sell directly to buyers without intermediaries.</p>
            </div>
            <div className="feature-card flex flex-col items-center text-center">
              <FaDollarSign className="feature-icon text-4xl mb-4" />
              <h3>Fair Pricing</h3>
              <p>Transparent pricing based on current market rates.</p>
            </div>
            <div className="feature-card flex flex-col items-center text-center">
              <FaLock className="feature-icon text-4xl mb-4" />
              <h3>Secure Transactions</h3>
              <p>Safe and easy payments for both buyers and sellers.</p>
            </div>
            <div className="feature-card flex flex-col items-center text-center">
              <FaUserFriends className="feature-icon text-4xl mb-4" />
              <h3>User-Friendly Platform</h3>
              <p>Simple steps to register, list, and trade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Preview */}
      <section id="marketpace-review">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-black font-bold my-8">Explore Our Marketplace</h2>
          <div className="carousel flex items-center">
            <button className="prev">&#10094;</button>
            <div className="slides flex gap-3">
              {products.map((veg) => (
                <Card
                  key={veg.id}
                  title={veg.name}
                  image={veg.image}
                  price={veg.price}
                  location={veg.location}
                  badgeText="Available"
                  timeAgo="2 days ago"
                  onClick={() => console.log(`${veg.name} added to cart`)}
                />
              ))}
            </div>
            <button className="next">&#10095;</button>
          </div>
          <Link to="/products" className="cta-button">
            See More Products
          </Link>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content text-center">
          <h2 className="text-black">Join Thousands of Farmers Growing Their Business on E-mandi</h2>
          <Link to="/register" className="cta-button">
            Register Now
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
