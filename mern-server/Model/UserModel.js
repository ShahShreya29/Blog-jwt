const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type:String,
    require: true,
  },
  password: {
    type:String,
    required: true,
  },
  role: {
    type: String,
    // required:true
  }
});


module.exports = mongoose.model("bs_user", userSchema);
