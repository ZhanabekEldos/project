import { api } from "../api.js";

export const usersModule = {
  profile: () => api.getProfile(),
  updateProfile: (username) => api.updateProfile({ username }),
  listUsers: () => api.listUsers()
};
