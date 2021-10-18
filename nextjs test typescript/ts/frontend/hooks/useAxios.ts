import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../../js-frameworks-module-assignment-3-heggland/client/src/context/AuthContext";
import { BASE_URL, TOKEN_PATH } from "../constants/api";

const useAxios = () => {
  const [auth] = useContext(AuthContext);

  const apiClient = axios.create({
    baseURL: BASE_URL + TOKEN_PATH,
  });

  apiClient.interceptors.request.use((config) => {
    const token = auth.token;
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return apiClient;
};

export default useAxios;
