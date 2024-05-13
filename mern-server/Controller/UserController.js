const UserService = require("../Services/UserService");
const { AccessToken } = require("../jwt/jwt");
const jwt = require("jsonwebtoken");

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
        console.log("id",user.id,"emailll",user.email);
        const accessToken = await AccessToken(user.id);
        console.log(accessToken);
        res.status(200).json({ user, accessToken});
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  refreshToken: async (req, res) => {
    const refreshToken = req.headers["refresh-token"];

    try {
      const decoded = jwt.verify(refreshToken, "jwtSecretKeys");
      const newAccessToken = jwt.sign({ id: decoded.id }, "jwtSecretKeys", {
        expiresIn: "15s",
      });

      return res.status(200).json({
        message: "Access token refreshed successfully",
        accessToken: newAccessToken,
      });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
  },

};

module.exports = UserController;
