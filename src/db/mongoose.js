const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://<username>:<password>@cluster0.sgs7u.mongodb.net/test",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);
