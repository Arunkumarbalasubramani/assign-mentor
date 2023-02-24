const mongoose = require("mongoose");

const studentsModel = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  mentorDetails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
    },
  ],
});

module.exports = mongoose.model("Student", studentsModel);
