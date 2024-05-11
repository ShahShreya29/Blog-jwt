const express = require("express");
const router = express.Router();
const UserController = require("../Controller/UserController.js")
const BlogController = require("../Controller/BlogController.js")
const upload = require("../Middleware/multer.js")

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);

router.post("/addBlog", (upload.single("blog_img")), BlogController.addBlog);

router.get("/blogList", BlogController.blogList);
router.put("/updateBlog/:id",(upload.single("blog_img")), BlogController.updateBlog);
router.delete("/deleteBlog/:id", BlogController.deleteBlog);


module.exports = router;
