const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Farmer = require("../models/Farmer.js");
const Buyer = require("../models/Buyer.js");
const OTP = require("../models/OTP"); 
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUserr");
const otpGenerator = require("otp-generator"); 
const JWT_SECRET = process.env.JWT_SECRET || "Sunitisagoodbo$y"; 

const validStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry",
];


router.post(
  "/createuser",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
    body("pin", "Please enter a valid 6-digit pin").matches(/^\d{6}$/),
    body("state", "Please select a valid state").isIn(validStates),
    body("phno", "Please enter a valid 10-digit phone number").matches(/^\d{10}$/),
    body("otp", "OTP must be a 6-digit number").matches(/^\d{6}$/),
  ],
  async (req, res) => {
    let success = false;

    // If there are validation errors, return them
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0];
      return res.status(400).json({ error: firstError.msg });
    }

    // Extract necessary fields
    const { email, password, otp, role, name, pin, city, state, phno } = req.body;

    try {
      // Check if the user with this email already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }

      // Validate OTP
      const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
      if (response.length === 0) {
        return res.status(400).json({ success: false, message: "The OTP is not valid" });
      } else if (otp !== response[0].otp) {
        return res.status(400).json({ success: false, message: "The OTP is not valid" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);

      // Create a new user
      user = await User.create({
        name,
        password: secPass,
        email,
        role,
        pin,
        city,
        state,
        phno,
      });

      // Create farmer or buyer entry based on the role
      if (role === "farmer") {
        await Farmer.create({
          _id: user._id,
          name,
          email,
          pin,
          city,
          state,
          phno,
        });
      } else if (role === "buyer") {
        await Buyer.create({
          _id: user._id,
          name,
          email,
          pin,
          city,
          state,
          phno,
        });
      }

      // Generate JWT token
      const data = { id: user.id };
      const authtoken = jwt.sign(data, JWT_SECRET);
      user.token=authtoken;
      success = true;
      res.json({ success, authtoken, role });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 2: Authenticate a User using:POST "/api/auth/login". No login required
router.post("/login",async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("email password",email,password)
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Generate JWT token
      const payload = { id: user.id };
      const authtoken = jwt.sign(payload, JWT_SECRET);
      user.token=authtoken;
      res.json({ success: true, authtoken, role: user.role });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3: Send OTP for user registration: POST "/api/auth/sendotp". No login required
router.post("/sendotp", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user is already registered
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({ success: false, message: "User is already registered" });
    }

    // Generate OTP and ensure uniqueness
    let otp;
    do {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    } while (await OTP.findOne({ otp }));

    // Save OTP to database
    const otpPayload = { email, otp };
    await OTP.create(otpPayload);

    res.status(200).json({ success: true, message: "OTP sent successfully", otp });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ROUTE 4: Get logged-in user details: POST "/api/auth/getUser". Login required
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
