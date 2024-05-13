
const jwt = require("jsonwebtoken");

module.exports = {
  AccessToken: (userId) => {
    const payload = {
      id: userId,
    };
    const accessToken = jwt.sign(payload, "jwtSecretKeys", {
      expiresIn: "15s",
    });
    const refreshToken = jwt.sign(payload, "jwtSecretKeys", {
      expiresIn: "1min",
    });
    return { accessToken, refreshToken };
  },

  verificationToken: (req, res, next) => {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader !== "undefined") {
      const token = bearerHeader?.split(" ")[1];
      req.token = token;
      jwt.verify(req.token, "jwtSecretKeys", (err, payload) => {
        if (err) {
          const refreshToken = req.headers["refresh-token"];
          if (!refreshToken) {
            return res.status(419).json({
              error: "Access token expired or invalid, no refresh token provided.",
            });
          }
          jwt.verify(refreshToken, "jwtSecretKeys", (err, resolve) => {
            if (err) {
              return res.status(419).json({ error: "Refresh token expired or invalid." });
            }
            const { accessToken, refreshToken: newRefreshToken } =
              module.exports.AccessToken(resolve.id);
            res.setHeader("Authorization", `Bearer ${accessToken}`);
            res.setHeader("Refresh-Token", newRefreshToken);
            req.token = accessToken;
            next();
          });
        } else {
          req.payload = payload;
          next();
        }
      });
    } else {
      return res.status(419).json({ error: "Access token not provided." });
    }
  },
};