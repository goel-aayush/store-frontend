import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://store-management-nyeh.onrender.com/",
});
//
//https://store-management-nyeh.onrender.com

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
