// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");

const db = require("./Connection/db");
// const path = require("path");

// // const BlogRouters = require("./Routes/Router");
// // const UserRouters = require("./Routes/Router");
// const Routers = require("./Routes/Router");


// // const createBlogRouter = require("./Controller/BlogController");
// // const createSignupRouter = require("./Controller/UserController");
// // const createLoginRouter = require("./root/createLogin");

                                       
// const app = express();

// app.use(bodyParser.json());
// app.use(cors()); 
// // app.use(express.static('uploads'))
// // ,createLoginRouter)
// app.use('/api',Routers)

// // app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const port = process.env.PORT || 8081;

// app.listen(port, () => {
//   console.log(`server is running on - http://localhost:${port}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const path = require("path");

const blogRouter = require("./Routes/Router.js");
const userRouter = require("./Routes/Router.js");

const app = express();

app.use(bodyParser.json());
app.use(cors()); 
// app.use(express.static('uploads')); 
// app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`server is running on - http://localhost:${port}`);
});
