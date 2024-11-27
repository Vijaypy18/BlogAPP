const express = require("express");
const app = express();
require("dotenv").config();

// Environment variables
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON
app.use(express.json());

// Import route file
const blogRouter = require("./routes/blog");

// Mount or append the router
app.use("/api/v1", blogRouter);

// Base route for the home page
app.get("/", (req, res) => {
  res.send(`<h1>This is the Home Page, BABAY!</h1>`);
});

// Import and connect the database
const dbConnect = require("./config/database");
dbConnect();

// Start the server
app.listen(PORT, () => {
  console.log(`App is running at PORT: ${PORT}`);
});
