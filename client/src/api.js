// Thin fetch wrappers around the Express API.
// In dev, Vite proxies /api to http://localhost:5000 (see vite.config.js).
// In production, set VITE_API_URL to your deployed API's base URL.

const BASE = import.meta.env.VITE_API_URL || "";

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }
  return data;
}

export function getProjects() {
  return request("/api/projects");
}

export function getCertificates() {
  return request("/api/certificates");
}

export function sendContactMessage(payload) {
  return request("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
