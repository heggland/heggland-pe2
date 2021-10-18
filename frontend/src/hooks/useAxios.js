import axios from "axios";
import { useContext } from "react";
import { BASE_URL } from "../constants/api";
import AuthContext from "../context/AuthContext";

const useAxios = () => {
  const [auth] = useContext(AuthContext);

  const apiClient = axios.create({
    baseURL: BASE_URL,
  });

  apiClient.interceptors.request.use(function (config) {
    const token = auth.token;
    config.headers.Authorization = "Bearer " + token ? `Bearer ${token}` : "";
    return config;
  });

  return apiClient;
};

export default useAxios;
