let express = require("express");
let router = express.Router();
const userOperation = require("../operations/userOperation");

//Login
router.post("/login", (req, res) => {
  console.log("req");
  console.log(req.body);
  if (req.body) {
    userOperation.loginUser(req.body).then((result) => {
      console.log("result in routes for login");
      console.log(result);
      if (result === "User Not Found") {
        res.status(401).json({
          MSG: "User Not Found",
        });
      } else if (result === "User credentials not match") {
        res.status(401).json({
          MSG: "Password Not Matched",
        });
      } else {
        res.status(200).json({
          result: result,
        });
      }
    });
  }
});

//Register
router.post("/register", (req, res) => {
  if (req.body) {
    let userInfo = {
      user_name: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      role: "user",
    };
    userOperation.signUp(userInfo).then((result) => {
      if (result) {
        res.status(200).json({
          Msg: "Successfully signup",
          result: result,
        });
      }
    });
  }
});

module.exports = router;
