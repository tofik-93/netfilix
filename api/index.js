const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser'); // Import body-parser

const app = express();
const port = process.env.PORT || 3000;
const authRoute = require("./routes/auth");
const userRoute = require("./routes/auth");

// MongoDB connection
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MongoDB connection string (MONGODB_URI) is not defined in the environment variables.');
  process.exit(1); // Exit with a failure code
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }) // Ensure mongoose connection options
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Middleware
app.use(bodyParser.json()); // Add body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // Add body-parser middleware for URL-encoded data

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
