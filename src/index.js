const express = require("express");
const app = express();
require("./db/mongoose");
const courseRoute = require("./routes/course");
const userRoute = require("./routes/user");

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(userRoute);
app.use(courseRoute);

app.listen(port, () => {
  console.log(`Server is up and running at ${port}`);
});
