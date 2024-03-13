// we will register the express app here. It is the entry file for the backend.
require("dotenv").config();

const express = require("express");
const workoutRoutes = require("./routes/workouts");

const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// reacting to the request-routes
app.use("/api/workouts", workoutRoutes);

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen on http://localhost
    app.listen(process.env.PORT, () => {
      console.log("Connected to Database");
      console.log("Server is running on port " + process.env.PORT + "...");
    });
  })
  .catch((error) => {
    console.log(error);
  });
