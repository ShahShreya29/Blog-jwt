const UserService = require("../Services/UserService");
const { AccessToken } = require("../jwt/jwt");

const UserController = {
  signup: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const user = await UserService.signup({
        name,
        email,
        password,
        role,
      });
      if (user.error) {
        return res.status(400).json(user);
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.login({ email, password });
      if (user) {
        // Assuming AccessToken is a function to generate access tokens
        const AToken = await AccessToken(user.userID); // Assuming you have a function to generate access tokens
        res.status(200).json({ user, AToken }); // Include user object in the response
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = UserController;
