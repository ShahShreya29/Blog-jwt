const BlogService = require("../Services/BlogService");

const BlogController = {
  addBlog: async (req, res) => {
    try {
      const { blog_title, blog_content } = req.body;
      const savedBlog = await BlogService.addBlog({ blog_title, blog_content });
      res.status(201).json(savedBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add blog" });
    }
  },

  blogList: async (req, res) => {
    try {
      const blogs = await BlogService.blogList();
      res.status(200).json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  },

  updateBlog: async (req, res) => {
    try {
      const { _id } = req.params;
      const { blog_title, blog_content } = req.body;
      const updatedBlog = await BlogService.updateBlog({_id,  blog_title, blog_content });
      res.status(200).json(updatedBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update blog" });
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBlog = await BlogService.deleteBlog(id);
      res.status(200).json(deletedBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete blog" });
    }
  }
};

module.exports = BlogController;
