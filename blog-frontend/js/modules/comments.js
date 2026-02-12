import { api } from "../api.js";

export const commentsModule = {
  listByPost: (postId) => api.listCommentsByPost(postId),
  create: (postId, text) => api.createComment(postId, { text })
};
