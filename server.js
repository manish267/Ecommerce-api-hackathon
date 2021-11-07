const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const productRoutes=require('./routes/product');
const cartRoutes=require('./routes/cart');
const orderRoutes=require('./routes/order');
const checkoutRoutes=require('./routes/stripe');
const reviewRoutes=require('./routes/review');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
  })
  .then(() => console.log(`Database Connected`))
  .catch((err) => {
    console.log(err);
  });

// USER ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/product/review", reviewRoutes);

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
