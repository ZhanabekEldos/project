import { requireAuth } from "../guard.js";
import { loadPartial, showJson, showError } from "../ui.js";
import { usersModule } from "../modules/users.js";

requireAuth();

const outEl = document.getElementById("users");

async function init() {
  await loadPartial("#navbar", "/blog-frontend/partials/navbar.html");
  await loadPartial("#footer", "/blog-frontend/partials/footer.html");

  try {
    const data = await usersModule.listUsers();
    showJson(outEl, data);
  } catch (err) {
    showError(outEl, err);
  }
}

init();
