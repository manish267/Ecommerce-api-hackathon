const router = require("express").Router();
const User = require("./../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    newUser.password = hashedPassword;

    const user = await newUser.save();

    if (user) {
      res.status(201).json({
        success: true,
        message: "Registed!!! ",
      });
    }
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Error Occurred!!!!",
    });
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ username });
    const passwordVerify = await bcrypt.compare(password, user.password);
    if (passwordVerify && user) {
      const accessToken = jwt.sign(
        { userId: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: "3d",
        }
      );
      const { password, ...others } = user._doc;
      res.status(200).json({
        ...others,
        accessToken,
      });
    } else {
      throw new Error();
    }
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Wrong Credentials",
    });
  }
});

module.exports = router;
