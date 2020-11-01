const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Course = require("../models/Course");
const User = require("../models/User");

router.post("/courses/create", auth, async (req, res) => {
  const course = new Course({
    ...req.body.data,
    creator: req.user._id,
  });

  try {
    if (req.user.type !== "staff") {
      res.status(403).send();
    }
    await course.save();
    res.status(201).send(course);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/courses", auth, async (req, res) => {
  try {
    if (req.user.type !== "staff") {
      res.status(403).send();
    }
    const courses = await Course.find({ creator: req.user._id });
    res.status(200).send(courses);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/allcourses", async (req, res) => {
  try {
    const courses = await Course.find({});

    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }

    const final = async () => {
      await asyncForEach(courses, async (course) => {
        await course.populate("creator").execPopulate();
      });
      res.status(200).send(courses);
    };
    final();
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/courses/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const course = await Course.findOne({ _id });
    if (!course) {
      return res.status(404).send();
    }
    await course.populate("creator").execPopulate();
    res.status(200).send(course);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/courses/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    if (req.user.userType !== "staff") {
      res.status(403).send();
    }
    const course = await Course.findOneAndDelete({
      _id,
      creator: req.user._id,
    });
    if (!course) {
      res.status(404).send();
    }
    res.send(course);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
