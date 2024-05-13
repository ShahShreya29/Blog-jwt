const db = require("./Connection/db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const blogRouter = require("./Routes/Router.js");
const userRouter = require("./Routes/Router.js");

const app = express();

app.use(bodyParser.json());
app.use(cors()); 
app.use(express.static('uploads')); 
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`server is running on - http://localhost:${port}`);
});
