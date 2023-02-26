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
    const mentorToBeAssigned = req.body.mentorToBeAssigned;
    const mentorDetails = await Mentor.findOne({
      mentorName: mentorToBeAssigned,
    });
    if (!mentorDetails) {
      res
        .status(404)
        .send({ Message: `Mentor ${mentorToBeAssigned} Not found` });
    } else {
      student.mentorDetails = mentorDetails._id;
      mentorDetails.studentsDetails = student._id;
      await student.save();
      await mentorDetails.save();
    }
  } catch (error) {
    res.status(500).send(`Internal Server Error - ${error}  `);
  }
});

// router.put("/students/changementor/:studentId", async (req, res) => {
//   try {
//     const { studentId } = req.params;
//     const student = await Student.findById(studentId);
//     const mentorToBeAssigned = req.body.mentorToBeAssigned;
//     const mentorDetails = await Mentor.findOne({
//       mentorName: mentorToBeAssigned,
//     });
//     if (!mentorDetails) {
//       return res.status(404).send(`Mentor ${mentorToBeAssigned} not found`);
//     }
//     student.mentor = mentorDetails._id;
//     await student.save();
//     res.send(
//       `Student ${studentId} has been assigned to mentor ${mentorDetails.mentorName}`
//     );
//   } catch (error) {
//     res.status(500).send(`Internal Server Error - ${error}  `);
//   }
// });

module.exports = router;
