import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/", // our API base URL
});

// Request interceptor for adding the bearer token
api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("login"));
    if (token) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // API endpoints
// export const getUser = () => {
//   return api.get("/user");
// };

// export const deleteUser = (userId) => {
//   return api.delete(`/user/${userId}`);
// };

// https://coderomeos.org/axios-interceptors-in-a-react-application

// // Create axios instance for specific base URL
// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8081/api/",
// });

// // Add request interceptor for attaching token to requests
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = JSON.parse(localStorage.getItem("login"));
//     if (token) {
//       config.headers.Authorization = `Bearer ${token.token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Add response interceptor for handling token expiration

api.interceptors.response.use(
  (response) => {
    console.log("RES", response);
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 419) {
      console.log("Token expired, refreshing...");
      try {
        const refreshToken = sessionStorage.getItem("refreshToken");
        if (!refreshToken) {
          console.log("No refresh token provided.");
          throw new Error("No refresh token provided.");
        } else {
          console.log("refresh token provided.", refreshToken);
        }
        const refreshData = await axios.get(
          `http://localhost:8081/api/refreshToken`,
          {
            headers: {
              requestToken: refreshToken,
            },
          }
        );
        const newToken = refreshData.data.token;
        console.log("NewToken",newToken);
        localStorage.setItem(
          "login",
          JSON.stringify({
            token: newToken,
          })
        );
console.log("hereeee");
        sessionStorage.setItem("refreshToken", newToken);

        // Retry the original request with the new access token
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Error", refreshError);

        return Promise.reject(error);
      }
    }
  }
);

export default api;
