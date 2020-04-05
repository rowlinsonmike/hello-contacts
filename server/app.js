const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.listen(3000, () => {
  console.log("Server listening on 3000");
});
