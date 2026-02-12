import { loadPartial, showJson, showError } from "../ui.js";
import { postsModule } from "../modules/posts.js";
import { commentsModule } from "../modules/comments.js";

const postEl = document.getElementById("post");
const commentsEl = document.getElementById("comments");
const form = document.getElementById("comment-form");

function getPostId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadData() {
  const id = getPostId();
  if (!id) return (postEl.textContent = "Missing post id. Use ?id=<postId>");

  try {
    const [post, comments] = await Promise.all([
      postsModule.getPost(id),
      commentsModule.listByPost(id)
    ]);
    showJson(postEl, post);
    showJson(commentsEl, comments);
  } catch (err) {
    showError(postEl, err);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = getPostId();
  const text = new FormData(form).get("text");
  try {
    await commentsModule.create(id, text);
    form.reset();
    await loadData();
  } catch (err) {
    showError(commentsEl, err);
  }
});

async function init() {
  await loadPartial("#navbar", "/blog-frontend/partials/navbar.html");
  await loadPartial("#footer", "/blog-frontend/partials/footer.html");
  await loadData();
}

init();
