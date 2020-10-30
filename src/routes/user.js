const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const Course = require("../models/Course");
const auth = require("../middleware/auth");

router.post("/users/create", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findIdByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateToken();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const fields = Object.keys(req.body);

  try {
    const user = await User.findById(req.user.id);
    fields.forEach((field) => {
      user[field] = req.body[field];
    });
    await user.save();

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/courses/:id", auth, async (req, res) => {
  try {
    req.user.courses = req.user.courses.concat({ course: req.params.id });
    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/courses", auth, async (req, res) => {
  try {
    await req.user.populate("courses.course").execPopulate();
    console.log(req.user);
    res.send(req.user.courses);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
