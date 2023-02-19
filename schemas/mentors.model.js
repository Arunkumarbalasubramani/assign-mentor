const mongoose = require("mongoose");

const mentorModel = new mongoose.Schema({
  mentorName: {
    type: String,
    required: true,
  },
  mentorEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Mentors", mentorModel);
