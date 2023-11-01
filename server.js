const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

let app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// database Section
mongoose
  .connect("mongodb://0.0.0.0:27017/students")
  .then(() => console.log("DB is connected"))
  .catch((err) => {
    console.log(err);
  });

// schema
const studentSchema = new mongoose.Schema({
  name: String,
  courses: String,
});

// convert schema to model (class)
let studentModel = new mongoose.model("students", studentSchema);

let newStudent = studentModel({
  name: "Ahmed Ali khaled",
  courses: "html css js mongo",
}).save();

// endpoint fetch all users from database
app.get("/students", async (req, res) => {
  let allStudents = await studentModel.find();

  res.status(200);
  res.json(allStudents);
});

app.listen(5050, function () {
  console.log("server now is ready");
});
