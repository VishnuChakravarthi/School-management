const mongoose = require("mongoose");
const validator = require("validator");

const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    unique: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  courseDept: {
    type: String,
    required: true,
  },
  courseRoom: {
    type: String,
    required: true,
  },
  courseTeam: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  waitlistCapacity: {
    type: Number,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

courseSchema.virtual("courses", {
  ref: "User",
  localField: "_id",
  foreignField: "courses.course",
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
