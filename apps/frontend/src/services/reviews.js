import axios from "axios";
import { API_URL } from "../../../../../plusfit.club.dashboard/src/config/api.js";

export const ALL_REVIEWS = async (params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/review`, { params });
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні відгуків:", error);
    throw new Error("Щось пішло не так");
  }
};

export const CREATE_REVIEW = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/review`, data);
    return response.data.result;
  } catch (error) {
    console.log(error);

    throw new Error("Щось пішло не так");
  }
};
