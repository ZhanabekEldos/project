export async function loadPartial(selector, path) {
  const target = document.querySelector(selector);
  if (!target) return;
  const html = await fetch(path).then(r => r.text());
  target.innerHTML = html;
}

export function showJson(el, data) {
  el.textContent = JSON.stringify(data, null, 2);
}

export function showError(el, err) {
  el.textContent = err.message || String(err);
}
