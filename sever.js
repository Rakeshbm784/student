const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Student = require("./student");

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/studentdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/students", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const filters = {};

  if (req.query.name) {
    filters.name = { $regex: req.query.name, $options: "i" };
  }
  try {
    const students = await Student.find(filters)
      .limit(limit)
      .skip((page - 1) * limit);
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
