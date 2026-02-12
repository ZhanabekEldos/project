import { loadPartial, showError } from "../ui.js";
import { register } from "../modules/auth.js";

const form = document.getElementById("register-form");
const errorEl = document.getElementById("error");

async function init() {
  await loadPartial("#navbar", "/blog-frontend/partials/navbar.html");
  await loadPartial("#footer", "/blog-frontend/partials/footer.html");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  try {
    await register(fd.get("username"), fd.get("email"), fd.get("password"), fd.get("role"));
    window.location.href = "/blog-frontend/index.html";
  } catch (err) {
    showError(errorEl, err);
  }
});

init();
