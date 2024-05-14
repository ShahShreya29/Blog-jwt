const BlogService = require("../Services/BlogService");
const { sendError } = require("../errorHandler");

const BlogController = {
  addBlog: async (req, res) => {
    try {
      const { blog_title, blog_content } = req.body;
      const blog_img = req.file; 
      const savedBlog = await BlogService.addBlog({ blog_title, blog_content }, blog_img);
      res.status(201).json(savedBlog);
    } catch (error) {
      console.error(error);
      // res.status(500).json({ error: "Failed to add blog" });
      return sendError(res, "Failed to add blog");
    }
  },

  blogList: async (req, res) => {
    try {
      const blogs = await BlogService.blogList();
      res.status(200).json(blogs);
    } catch (error) {
      console.error(error);
      // res.status(500).json({ error: "Failed to fetch blogs" });
      return sendError(res, "Failed to fetch blogs");
    }
  },

  getBlogById: async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await BlogService.getBlogById(id);
      if (blog) {
        return res.status(200).json(blog);
      }
      // return res.status(404).json({ error: "Blog not found" });
      return sendError(res, "Blog not found");
      // res.status(200).json(blog);
    } catch (error) {
      console.error(error);
      // res.status(500).json({ error: "Internal server error" });
      return sendError(res, "Internal server error");
    }
  },

  updateBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const { blog_title, blog_content } = req.body;
      const updatedBlog = await BlogService.updateBlog(id, {
        blog_title,
        blog_content,
      });
      res.status(200).json(updatedBlog);
    } catch (error) {
      console.error(error);
      // res.status(500).json({ error: "Failed to update blog" });
      return sendError(res, "Failed to update blog");
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBlog = await BlogService.deleteBlog(id);
      res.status(200).json(deletedBlog);
    } catch (error) {
      console.error(error);
      // res.status(500).json({ error: "Failed to delete blog" });
      return sendError(res, "Failed to delete blog");
    }
  },
};

module.exports = BlogController;
