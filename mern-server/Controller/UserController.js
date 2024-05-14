const UserService = require("../Services/UserService");
const jwt = require("jsonwebtoken");
const { sendError } = require("../errorHandler");
require('dotenv').config();

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
        // return res.status(400).json(user);
        return sendError(res, "Bad request");
      }
      res.status(200).json(user);
    } catch (error) {
      // res.status(500).json({ error: "Internal Server Error" });
      return sendError(res, "Internal server error");
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.login({ email, password });

      if (user) {
        const payload = {
          id: user.id,
        };
        const accessToken = jwt.sign(payload, process.env.JWT_KEY, {
          expiresIn: "15s",
        });
        console.log(accessToken);
        const refreshToken = jwt.sign(payload, process.env.JWT_KEY, {
          expiresIn: "1min",
        });
        // console.log("id",user.id,"emailll",user.email);
        // const accessToken = await AccessToken(user.id);
        // console.log(accessToken);
        res.status(200).json({ user, accessToken, refreshToken });
      } else {
        return sendError(res, "User not found");
        // res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      return sendError(res, "Internal server error");
      // res.status(500).json({ error: "Internal Server Error" });
    }
  },

  refreshToken: async (req, res) => {
    const refreshToken = req.headers["refresh-token"];

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_KEY);
      const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_KEY, {
        expiresIn: "15s",
      });

      return res.status(200).json({
        message: "Access token refreshed successfully",
        accessToken: newAccessToken,
      });
    } catch (error) {
      return sendError(res, "Internal server error");
      // return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = UserController;
