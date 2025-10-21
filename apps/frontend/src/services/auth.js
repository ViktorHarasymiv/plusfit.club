import axios from "axios";

import { API_URL } from "../config/api";

// REGISTER

export const register = async (data) => {
  const res = await axios.post(`${API_URL}/auth/register`, data, {
    withCredentials: true,
  });
  return res.data;
};

// LOGIN

export const login = async (data) => {
  const res = await axios.post(`${API_URL}/auth/login`, data, {
    withCredentials: true,
  });
  return res.data;
};

// PATCH

export const editProfile = async (data) => {
  try {
    const res = await axios.patch(`${API_URL}/users/me`, data, {
      withCredentials: true,
    });

    return {
      success: true,
      data: res.data,
      error: null,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;

      // Якщо бекенд повертає Joi-помилки у вигляді масиву
      const messages = data?.details?.map((d) => d.message) ||
        (typeof data?.message === "string" ? [data.message] : []) || [
          "Невідома помилка",
        ];

      return {
        success: false,
        data: null,
        error: {
          status,
          messages,
        },
      };
    }

    // Інші помилки (мережа, таймаут, невідоме)
    return {
      success: false,
      data: null,
      error: {
        status: null,
        messages: ["Помилка з’єднання або невідома помилка"],
      },
    };
  }
};

// CHECK SESSION

export const checkSession = async () => {
  try {
    const res = await axios.get(`${API_URL}/auth/session`, {
      withCredentials: true,
    });
    return res.data.success;
  } catch (err) {
    if (err.response?.status === 401) {
      return false;
    }
    throw err;
  }
};

// RERFRESH SEEEION

export const refreshSession = async () => {
  const res = await axios.post(
    `${API_URL}/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  );

  return res.data;
};

// AUTH ME

export const getMe = async () => {
  const { data } = await axios.get(`${API_URL}/users/me`, {
    withCredentials: true,
  });

  return data;
};

// LOGOUT

export const logout = async () => {
  await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
};
