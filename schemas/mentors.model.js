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
  studentsDetails: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

module.exports = mongoose.model("Mentor", mentorModel);
