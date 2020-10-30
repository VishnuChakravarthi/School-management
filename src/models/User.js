const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  //   profilepic: {
  //     data: Buffer,
  //     contentType: String,
  //   },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Invalid password");
      }
    },
  },
  userType: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    validate(value) {
      if (!validator.isMobilePhone(value, "en-IN")) {
        throw new Error("Invalid phone number");
      }
    },
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  company: {
    type: String,
  },
  school: {
    type: String,
  },
  hometown: {
    type: String,
  },
  languages: {
    type: String,
  },
  gender: {
    type: String,
  },
  about: {
    type: String,
  },
  courses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateToken = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user.id.toString() }, "YesICanDo");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findIdByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Unable to login");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
