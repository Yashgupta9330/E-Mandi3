const express = require("express");
const Router = express.Router();
const Product = require("../../models/Products.js");
const User = require("../../models/User.js");
const Buyer = require("../../models/Buyer.js");
const fetchUser = require("../../middleware/fetchUserr.js");

// ROUTE 1: Add items to the cart
Router.post("/add", fetchUser, async (req, res) => {
  try {
    const newItem = {
      buyer_id: req.user.id,
      farmer_id: req.body.farmer_id,
      farmerName: req.body.farmerName,
      productId: req.body.productId,
      productName: req.body.productName,
      quantity: req.body.quantity,
      description: req.body.description,
      price: req.body.price,
      cat: req.body.cat,
      date: req.body.date,
      image: req.body.image,
    };

    const response = await Buyer.updateOne(
      { _id: req.user.id },
      { $push: { cart: newItem } }
    );

    res.status(201).json({
      success: true,
      response: response,
      message: "Add item successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 2: Get items from the cart
Router.get("/checkout", fetchUser, async (req, res) => {
  try {
    const response = await Buyer.findById(req.user.id).select("cart");
    res.send(response.cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 3: Delete item from the cart
Router.delete("/deleteOne/:index", fetchUser, async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.user.id);
    const cart = buyer.cart; // Get the cart array from the buyer document
    const index = req.params.index; // Get the index from the request parameters

    if (index >= 0 && index < cart.length) {
      // Ensure that the index is valid

      // Remove the item at the specified index from the cart array
      cart.splice(index, 1);

      // Update the buyer document with the modified cart array
      await buyer.save();

      // Send the updated cart array in the response
      res.json(cart);
    } else {
      // If the index is invalid, send an error response
      res.status(400).json({ message: "Invalid index" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 4: Empty the cart
Router.delete("/emptyCart", fetchUser, async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.user.id);
    buyer.cart = []; // Set the cart array to an empty array
    await buyer.save(); // Save the changes
    res.json(buyer.cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 5: Update item quantity in the cart
Router.put("/updateQuantity", fetchUser, async (req, res) => {
  try {
    const { productId, newQuantity } = req.body;

    if (newQuantity <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than zero" });
    }

    const buyer = await Buyer.findById(req.user.id);
    const cart = buyer.cart;

    // Find the item with the specified productId in the cart
    const itemIndex = cart.findIndex(item => item.productId.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    // Update the quantity of the found item
    cart[itemIndex].quantity = newQuantity;

    // Save the updated cart
    await buyer.save();

    res.json({
      success: true,
      message: "Quantity updated successfully",
      updatedCart: buyer.cart,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = Router;

