import { api } from "../api.js";
import { loadPartial, showJson, showError } from "../ui.js";

const healthEl = document.getElementById("health");
const postsEl = document.getElementById("posts");

async function init() {
  await loadPartial("#navbar", "/blog-frontend/partials/navbar.html");
  await loadPartial("#footer", "/blog-frontend/partials/footer.html");

  try {
    const [health, posts] = await Promise.all([api.health(), api.listPosts()]);
    showJson(healthEl, health);
    showJson(postsEl, posts);
  } catch (err) {
    showError(postsEl, err);
  }
}

init();
