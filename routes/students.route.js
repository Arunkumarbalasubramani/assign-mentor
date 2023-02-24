const express = require("express");
const router = express.Router();
const Student = require("../schemas/students.model");
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

module.exports = router;
