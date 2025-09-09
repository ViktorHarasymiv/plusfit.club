import axios from "axios";

import { API_URL } from "../config/api";

/* Seacrh by params */

export const GET_ONE = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/subscriptions/${id}`);

    console.log("Абонемент:", response.data);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Не вдалося отримати абонементи";
    console.error("Помилка:", message);
    throw new Error(message);
  }
};
