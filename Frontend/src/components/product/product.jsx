import React from "react";
import Card from "./product_card.jsx";
import CardProduct from "./CardProduct.jsx";

function Product(props) {
  const data = props.data;
  
  return (
    <div className="my-4 mx-12 flex w-full gap-4">
      {data.slice(0,4).map((product, index) => {
        return <CardProduct key={index} product={product} />; 
      })}
    </div>
  );
}

export default Product;

