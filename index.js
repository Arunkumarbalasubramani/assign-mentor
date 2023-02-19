require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./db/connection");

const PORT = 4000;
app.use(express.json());
connection();

app.get("/", (req, res) => {
  res.send("Welcome to Mentor Assigning API");
});

app.listen(PORT, () => {
  console.log(` Server Started and Running in Port - ${PORT}`);
});
