// Thin fetch wrappers around the Express API.
// In dev, Vite proxies /api to http://localhost:5000 (see vite.config.js).
// In production, set VITE_API_URL to your deployed API's base URL.

const BASE = import.meta.env.VITE_API_URL || "";

async function request(path, options) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch (err) {
    throw new Error("Unable to connect to the backend server. Please make sure the API server is running.");
  }

  if (res.status === 405) {
    throw new Error(
      "API endpoint returned status 405 (Method Not Allowed). Please ensure VITE_API_URL points to your deployed Express backend URL."
    );
  }

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
