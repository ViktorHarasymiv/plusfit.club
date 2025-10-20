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
  const res = await axios.post(`/api/auth/login`, data, {
    withCredentials: true,
  });
  return res.data;
};

// PATCH

export const editProfile = async (data) => {
  const res = await axios.patch(`${API_URL}/users/me`, data, {
    withCredentials: true, // дозволяє браузеру приймати HttpOnly cookies
  });
  return res.data;
};

// CHECK SESSION

export const checkSession = async () => {
  try {
    const res = await axios.get(`/api/auth/session`, {
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
    `/api/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  );

  return res.data;
};

// AUTH ME

export const getMe = async () => {
  const { data } = await axios.get(`/api/users/me`, {
    withCredentials: true,
  });

  return data;
};

// LOGOUT

export const logout = async () => {
  await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
};
