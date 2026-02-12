import { requireAuth } from "../guard.js";
import { loadPartial, showJson, showError } from "../ui.js";
import { postsModule } from "../modules/posts.js";

requireAuth();

const form = document.getElementById("editor-form");
const outEl = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const payload = {
    title: fd.get("title"),
    content: fd.get("content"),
    excerpt: fd.get("excerpt"),
    coverImageUrl: fd.get("coverImageUrl"),
    category: fd.get("category"),
    tags: (fd.get("tags") || "").split(",").map(s => s.trim()).filter(Boolean)
  };

  try {
    const data = await postsModule.createPost(payload);
    showJson(outEl, data);
  } catch (err) {
    showError(outEl, err);
  }
});

async function init() {
  await loadPartial("#navbar", "/blog-frontend/partials/navbar.html");
  await loadPartial("#footer", "/blog-frontend/partials/footer.html");
}

init();
