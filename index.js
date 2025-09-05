require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
const port = process.env.PORT ?? 3002;
const mongoURI = process.env.MONGODB_URI;

// parse JSON bodies
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("MongoDB connection error"));

// define the API endpoint to create a new User
app.post("/api/users", async (req, res) => {
  try {
    // create a new user instance from the request body
    const { username, email } = req.body;
    const newUser = newUser({ username, email });
    // Write new User in the MongoDB
    await newUser.save();

    // Respond with the newly created user and a 201 status code
    res.status(201).json(newUser);
  } catch (error) {
    // if an error occurs, send a 400 status code with the error message
    res.status(400).json({ message: error.message });
  }
});
