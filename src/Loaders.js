// Loader functions run BEFORE their matching route renders.
// react-router-dom calls these automatically when navigating to a route,
// waits for them to resolve, then renders the page with the returned data.
// Access the result inside a page with: const data = useLoaderData();

const API_BASE_URL = "http://localhost:3000/api"; // TODO: replace with your real backend URL

// Generic safe fetch wrapper - never throws, so a down/missing backend
// doesn't crash routing. Returns null on failure so pages can handle it.
async function safeFetch(path, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      credentials: "include",
      ...options,
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[loader] ${path} failed:`, err.message);
    return null;
  }
}

// Runs before Home renders. Hook this up once you have a products/featured endpoint.
export async function homeLoader() {
  const data = await safeFetch("/home");
  return { data };
}

// Runs before Login renders. Useful to redirect an already-logged-in user away.
export async function loginLoader() {
  const user = await safeFetch("/auth/me");
  return { user };
}

// Runs before Signup renders. Same idea as loginLoader.
export async function signupLoader() {
  const user = await safeFetch("/auth/me");
  return { user };
}