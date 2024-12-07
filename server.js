const express = require("express");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");

//const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const { mongoose } = require("mongoose");
const app = express();

dotenv.config();

// connectDB();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//Connection to MongoDB

mongoose
  .connect(
    "mongodb+srv://naikyash535:yash5499@cluster0.pe2dn.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce-api"
  )
  .then(() => {
    console.log("Database Connection Succcesful");
  })
  .catch((error) => {
    console.log("Database Connection Failed", error);
  });

app.use("/api/auth", authRoutes);

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

// app.listen(process.env.PORT, () =>
//   console.log(`Server running on port ${process.env.PORT}`)
// );
