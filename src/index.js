const express = require("express");
const app = express();
const cors = require("cors");
require("./db/mongoose");
const courseRoute = require("./routes/course");
const userRoute = require("./routes/user");

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(userRoute);
app.use(courseRoute);

app.get("/", (req, res) => {
  res.send("Hello there");
});

app.listen(port, () => {
  console.log(`Server is up and running at ${port}`);
});
