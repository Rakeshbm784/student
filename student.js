const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  id: Number,
  name: String,
  totalMarks: Number,
});

module.exports = mongoose.model("Student", studentSchema);
