const express = require("express");
const router = express.Router();
var bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
// User Model
const User = require("../../models/User");

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});
//
// // @route POST api/auth
// // @desc Auth user
// // @access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ msg: "User Does Not Exists" });
    }

    // Validate password

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(404).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

module.exports = router;
