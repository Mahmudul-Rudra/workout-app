// we will register the express app here. It is the entry file for the backend.

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// express app
const app = express();

//listen on http://localhost
app.listen(8080, () => {
  console.log("Server is running on port 8080......");
});
