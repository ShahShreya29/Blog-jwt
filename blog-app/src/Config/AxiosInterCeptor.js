// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8081/", // our API base URL
// });

// // Request interceptor for adding the bearer token
// api.interceptors.request.use(
//   (config) => {
//     const token = JSON.parse(localStorage.getItem("login")).accessToken;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // // API endpoints
// // export const getUser = () => {
// //   return api.get("/user");
// // };

// // export const deleteUser = (userId) => {
// //   return api.delete(`/user/${userId}`);
// // };

// // https://coderomeos.org/axios-interceptors-in-a-react-application

// // // Create axios instance for specific base URL
// // const axiosInstance = axios.create({
// //   baseURL: "http://localhost:8081/api/",
// // });

// // // Add request interceptor for attaching token to requests
// // axiosInstance.interceptors.request.use(
// //   (config) => {
// //     const token = JSON.parse(localStorage.getItem("login"));
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token.token}`;
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // Add response interceptor for handling token expiration

// api.interceptors.response.use(
//   (response) => {
//     console.log("RES", response);
//     return response;
//   },
//   async (error) => {
//     if (error.response && error.response.status === 419) {
//       console.log("Token expired, refreshing...");
//       try {
//         const refreshToken = sessionStorage.getItem("refreshToken");
//         if (!refreshToken) {
//           console.log("No refresh token provided.");
//           throw new Error("No refresh token provided.");
//         } else {
//           console.log("refresh token provided.", refreshToken);
//         }
//         const refreshData = await axios.get(
//           `http://localhost:8081/api/refreshToken`,
//           {
//             headers: {
//               requestToken: refreshToken,
//             },
//           }
//         );
//         const newToken = refreshData.data.token;
//         console.log("NewToken",newToken);
  //         localStorage.setItem(
//           "login",
//           JSON.stringify({
//             token: newToken,
//           })
//         );
// console.log("hereeee");
//         sessionStorage.setItem("refreshToken", newToken);

//         // Retry the original request with the new access token
//         const originalRequest = error.config;
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("Error", refreshError);

//         return Promise.reject(error);
//       }
//     }
//   }
// );

// export default api;


// Import axios
import axios from "axios";


// Create an instance of axios
const api = axios.create({
  baseURL: "http://localhost:5001/", // Our API base URL
});

// Add a request interceptor to attach the access token to each request
api.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(localStorage.getItem("login")).accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refreshment and authentication
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 419) {
      try {
        const refreshToken = JSON.parse(localStorage.getItem("login")).refreshToken;
        const setRefreshToken = await axios.post(
          "http://localhost:5001/api/users/refreshToken",
          {},
          {
            headers: {
              "refresh-token": refreshToken,
            },
          }
        );
        const newAccessToken = setRefreshToken.data.accessToken;

        // Update the access token in localStorage
        const loginData = JSON.parse(localStorage.getItem("login"));
        loginData.accessToken = newAccessToken;
        localStorage.setItem("login", JSON.stringify(loginData));
      

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (error) {
        window.location.href = '/loginForm';
      }
    }

    return Promise.reject(error);
  }
);

// Export the axios instance
export default api;
