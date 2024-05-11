import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


//   refreshToken : async (req, res) => {
//     const { refreshToken: requestToken } = req.body;
//     if (requestToken == null) {
//         return res.status(403).send("Refresh Token is required!");
//     }
 
//     try {
//       const refreshToken = JSON.parse(localStorage.getItem("login")).refreshToken;
//         if (!refreshToken) {
//             res.status(403).send("Invalid refresh token");
//             return;
//         }
//         if (verifyExpiration(refreshToken)) {
//            localStorage.removeItem(refreshToken.refreshToken);
//             res.status(403).send("Refresh token was expired.");
//             return;
//         }
   
//         // const user = await db.User.findOne({
//         //     where: {id: refreshToken.user},
//         //     attributes: {
//         //         exclude: ['password']
//         //     }
//         // });
//         const payload = {
//           id: userId,
//         };
//         let newAccessToken = jwt.sign(payload, "jwtSecretKeys", {
//           expiresIn: "1h",
//         });
   
//         return res.status(200).json({
//             accessToken: newAccessToken,
//             refreshToken: refreshToken.token,
//         });
//     } catch (err) {
//         console.log('err', err);
//         return res.status(500).send('Internal server error');
//     }
// },
