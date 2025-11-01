import axios from "axios";
import { API_URL } from "../config/api";

export const create_subscripter = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/subscriptions`, data);

    console.log("Успішно створено:", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Під цими даними вже зареєстровано абонемент");
  }
};

export const my_subscription = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/subscriptions/my`, {
      params: { email },
    });

    console.log("Абонементи:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Помилка при отриманні абонементів:", error);
    return [];
  }
};
