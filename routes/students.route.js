const express = require("express");
const router = express.Router();
const Student = require("../schemas/students.model");
const Mentor = require("../schemas/mentors.model");

router.get("/students", (req, res) => {
  res.send("Welcome to Students page");
});

router.post("/students/add", (req, res) => {
  try {
    const data = req.body;
    const newStudent = new Student(data);
    newStudent.save((err, data) => {
      if (err) {
        res.status(403).send({ Message: `Error While adding Student- ${err}` });
      } else {
        res
          .status(201)
          .send({ id: data._id, Message: "Student Added Successfully" });
      }
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// // API to Assign or Change Mentor for particular Student
router.put("/students/changementor/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);
    if (!student) {
      res.status(404).send({ Message: `Student ${studentId} Not found` });
    }
    const mentorToBeAssigned = req.body;

    const mentorDetails = await Mentor.findOne({
      mentorName: mentorToBeAssigned.mentorName,
    });
    if (!mentorDetails) {
      res
        .status(404)
        .send({ Message: `Mentor ${mentorToBeAssigned} Not found` });
    }
    await Mentor.findOneAndUpdate(
      { _id: student.mentorDetails },
      { $pull: { studentsDetails: student._id } }
    );
    student.mentorDetails = mentorDetails._id;
    mentorDetails.studentsDetails = student._id;
    await student.save();
    await mentorDetails.save();
    res.status(201).send({
      Message: `Student ${student.studentName} is assigned with the mentor ${mentorDetails.mentorName} now`,
    });
  } catch (error) {
    res.status(500).send(`Internal Server Error - ${error}  `);
  }
});

module.exports = router;
