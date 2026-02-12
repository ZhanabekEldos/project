import { getToken } from "./storage.js";

export function requireAuth(redirect = "/blog-frontend/pages/login.html") {
  if (!getToken()) window.location.href = redirect;
}
