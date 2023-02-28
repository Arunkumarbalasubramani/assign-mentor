const express = require("express");
const router = express.Router();
const Mentor = require("../schemas/mentors.model");
const Student = require("../schemas/students.model");

router.post("/mentors/add", (req, res) => {
  try {
    const data = req.body;
    const newMentor = new Mentor(data);
    newMentor.save((err, data) => {
      if (err) {
        res.status(403).send({ Message: `Error While adding Mentor- ${err}` });
      } else {
        res
          .status(201)
          .send({ id: data._id, Message: " Mentor Added Succesfully" });
      }
    });
  } catch (error) {
    res.status(500).send({ Message: `Internal Server Error- ${error}` });
  }
});

// API to Assign a student to Mentor

router.post("/mentors/:mentor_Id/students", async (req, res) => {
  try {
    // Check if there is such Mentor
    const mentorId = req.params.mentor_Id;
    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      res.status(404).send({ Message: `Mentor ${mentorId} not found` });
    }
    const studentsData = req.body;
    const data = await Student.find({
      studentName: { $in: studentsData },
      mentor: null,
    });

    // Assign mentor to students and save in database
    data.forEach(async (student) => {
      student.mentorDetails = mentorId;
      mentor.studentsDetails.push(student._id);
      await student.save();
    });
    await mentor.save();
    res.send(data);
  } catch (error) {
    res.status(500).send({ Message: `Internal Server Error - ${error}` });
  }
});

//API to show all students for a particular mentor

module.exports = router;
