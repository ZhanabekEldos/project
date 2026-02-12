import { loadPartial, showError } from "../ui.js";
import { login } from "../modules/auth.js";

const form = document.getElementById("login-form");
const errorEl = document.getElementById("error");

async function init() {
  await loadPartial("#navbar", "/blog-frontend/partials/navbar.html");
  await loadPartial("#footer", "/blog-frontend/partials/footer.html");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  try {
    await login(fd.get("email"), fd.get("password"));
    window.location.href = "/blog-frontend/index.html";
  } catch (err) {
    showError(errorEl, err);
  }
});

init();
