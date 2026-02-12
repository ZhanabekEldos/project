import { api } from "../api.js";
import { setToken, clearToken } from "../storage.js";

export async function login(email, password) {
  const data = await api.login({ email, password });
  setToken(data.token);
  return data;
}

export async function register(username, email, password, role) {
  const data = await api.register({ username, email, password, role });
  setToken(data.token);
  return data;
}

export function logout() {
  clearToken();
}
