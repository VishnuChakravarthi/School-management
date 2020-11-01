const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  waitlistcapacity: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

courseSchema.virtual("courses", {
  ref: "User",
  localField: "_id",
  foreignField: "courses.course",
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
