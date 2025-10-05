import axios from "axios";
import { API_URL } from "../config/api";

export const CREATE_MESSAGE = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/message`, data);
    return response.data.result;
  } catch (error) {
    if (error?.response?.status === 403) {
      throw new Error(
        "За вашою поштою не знайдено абонемента, повідомлення заборонено !"
      );
    } else throw new Error("Щось пішло не так");
  }
};
