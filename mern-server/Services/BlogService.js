const Blog = require("../Model/BlogModel");
const BlogService = {

  addBlog: async (blog, file) => { 
    try {
      const newBlog = new Blog({
        blog_title: blog.blog_title,
        blog_content: blog.blog_content,
        blog_img: file.filename 
      });
      const savedBlog = await newBlog.save();
      return savedBlog;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  },

  blogList: async () => {
    try {
      const fetchedBlogs = await Blog.find().lean().exec();
      return fetchedBlogs;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  },

  getBlogById: async (id) => {
    try {
      const blog = await Blog.findById(id);
      return blog;
    } catch (error) {
      throw new Error('Failed to fetch blog');
    }
  },

  updateBlog: async (id, blog) => {
    try {
      const updatedData = {};
      if (blog.blog_title) updatedData.blog_title = blog.blog_title;
      if (blog.blog_content) updatedData.blog_content = blog.blog_content; 

      const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, { new: true });
      return updatedBlog;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteBlog: async (id) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(id);
      return deletedBlog;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = BlogService;
 