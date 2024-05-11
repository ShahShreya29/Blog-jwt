const users = require("../Model/UserModel");

const UserService = {
  signup: async (user) => {
    try {
      const existingUser = await users.findOne({ email: user.email });
      if (existingUser) {
        return { error: "User already exists with this email" };
      }
      const newData = new users({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      });
      const saveData = await newData.save();
      console.log(saveData);
      return saveData;
    } catch (error) {
      return { error: "Internal Server Error" };
    }
  },

  login: async (user) => {
    try {
      const existingUser = await users.findOne({ email: user.email });
      return existingUser; // If found, return user object; otherwise, null
    } catch (error) {
      return { error: "Internal Server Error" };
    }
  },
};

module.exports = UserService;
