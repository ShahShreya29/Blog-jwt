const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  blog_title: {
    type: String,
    require: true,
  },
  blog_content: {
    type: String,
    require: true,
  },
  blog_img: {
    type: String,
    require: true,
  },

});

module.exports = mongoose.model("bs_blogs", blogSchema);
