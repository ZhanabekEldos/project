import { api } from "../api.js";

export const postsModule = {
  listPosts: () => api.listPosts(),
  getPost: (id) => api.getPost(id),
  createPost: (payload) => api.createPost(payload),
  publishPost: (id) => api.publishPost(id),
  unpublishPost: (id) => api.unpublishPost(id)
};
