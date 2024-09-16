import api from "./api";

import { saveToken, removeToken } from "@/utils/storage";

interface LoginResponse {
  token: string;
  expireIn: number;
}

interface RegisterResponse {
  id: string;
  username: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", { email, password });
  const { token, expireIn } = response.data;

  saveToken(token);

  return { token, expireIn };
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  const response = await api.post("/users/createUser", {
    username: name,
    email,
    password,
  });
  const { id, username } = response.data;

  return { id, username };
};

export const logout = () => {
  removeToken();
};
