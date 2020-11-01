const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vishnu:vishnu10@cluster0.sgs7u.mongodb.net/test",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);
