import { config } from "./config.js";
import { getToken } from "./storage.js";

async function request(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${config.apiBaseUrl}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data.message || JSON.stringify(data) || "Request failed";
    throw new Error(msg);
  }
  return data;
}

export const api = {
  health: () => fetch(config.apiBaseUrl.replace("/api", "/health")).then(r => r.json()),

  register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  me: () => request("/auth/me"),

  getProfile: () => request("/users/profile"),
  updateProfile: (payload) => request("/users/profile", { method: "PUT", body: JSON.stringify(payload) }),
  listUsers: () => request("/users"),

  listPosts: (query = "") => request(`/posts${query}`),
  getPost: (id) => request(`/posts/${id}`),
  createPost: (payload) => request("/posts", { method: "POST", body: JSON.stringify(payload) }),
  publishPost: (id) => request(`/posts/${id}/publish`, { method: "PATCH" }),
  unpublishPost: (id) => request(`/posts/${id}/unpublish`, { method: "PATCH" }),

  listCommentsByPost: (postId) => request(`/posts/${postId}/comments`),
  createComment: (postId, payload) => request(`/posts/${postId}/comments`, { method: "POST", body: JSON.stringify(payload) })
};
