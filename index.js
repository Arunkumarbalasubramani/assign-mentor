require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connection = require("./db/connection");
const StudentsRoute = require("./routes/students.route");
const MentorsRoute = require("./routes/mentors.route");
mongoose.set("strictQuery", false);
const app = express();
const PORT = process.env.PORT || 4000;
connection();

app.use(express.json());

app.use(StudentsRoute);
app.use(MentorsRoute);
app.get("/", (req, res) => {
  res.send("Welcome to Mentor Assigning API");
});

app.listen(PORT, () => {
  console.log(` Server Started and Running in Port - ${PORT}`);
});
