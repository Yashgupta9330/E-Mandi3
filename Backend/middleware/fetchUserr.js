var jwt = require("jsonwebtoken");

const JWT_SECRET = "Yash";
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  console.log("token ",token)
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    console.log("entered ",token)
    const data = await jwt.verify(token, JWT_SECRET);
    req.user = data;
    next();
  } catch (error) {
    console.log("error ",error)
    res.status(500).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
