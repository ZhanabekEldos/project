import { requireAuth } from "../guard.js";
import { loadPartial, showJson, showError } from "../ui.js";
import { usersModule } from "../modules/users.js";

requireAuth();

const outEl = document.getElementById("profile");
const form = document.getElementById("profile-form");

async function loadProfile() {
  try {
    const data = await usersModule.profile();
    showJson(outEl, data);
  } catch (err) {
    showError(outEl, err);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = new FormData(form).get("username");
  try {
    const data = await usersModule.updateProfile(username);
    showJson(outEl, data);
  } catch (err) {
    showError(outEl, err);
  }
});

async function init() {
  await loadPartial("#navbar", "/blog-frontend/partials/navbar.html");
  await loadPartial("#footer", "/blog-frontend/partials/footer.html");
  await loadProfile();
}

init();
