const Blog = require("../Model/BlogModel");
const BlogService = {
  addBlog: async (blog) => {
    try {
      const newBlog = new Blog({
        blog_title: blog.blog_title,
        blog_content: blog.blog_content,
      });
      const savedBlog = await newBlog.save();
      return savedBlog;
    } catch (error) {
      console.error(error);
      throw error; // Throw the error to be caught by the caller
    }
  },
  blogList: async () => {
    try {
      const fetchedBlogs = await Blog.find().lean().exec();
      return fetchedBlogs;
    } catch (error) {
      console.error(error);
      throw error; // Throw the error to be caught by the caller
    }
  },
  updateBlog: async (blog,id) => {
    try {
      // const { blog_title, blog_content } = blog;

      // const updatedBlog = {};
      // if (blog_title) updatedBlog.blog_title = blog.blog_title;
      // if (blog_content) updatedBlog.blog_content = blog.blog_content;
      // if (blog_img) updatedBlog.blog_img = file.filename;

      const blogs = await Blog.findByIdAndUpdate(
        { id },
        { blog_title: blog.blog_title, blog_content : blog.blog_content}
      );
      return blogs;
      // res.status(200).json(blogs);
    } catch (error) {
      console.error(error);
      return error;
      // res.status(500).json({ error: "Failed to update blog" });
    }
  },

  deleteBlog: async (id) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(id);
      return deletedBlog;
    } catch (error) {
      console.error(error);
      throw error; // Throw the error to be caught by the caller
    }
  },
};

module.exports = BlogService;
