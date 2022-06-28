import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
});

export default axiosInstance;
