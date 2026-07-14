
// ─────────────────────────────────────────────────────────────────────────────
// Central Axios instance.  Every service file imports from here so the
// base URL and Authorization header are never duplicated.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL || "https://alzaidan-backend-production.up.railway.app/api";
//https://alzaidan-backend-production.up.railway.app/api
// ── Token helpers ─────────────────────────────────────────────────────────────
export const getToken  = ()         => localStorage.getItem("alzaidan_token");
export const setToken  = (token)    => localStorage.setItem("alzaidan_token", token);
export const clearToken = ()        => localStorage.removeItem("alzaidan_token");

export const getUser   = ()         => {
    try { return JSON.parse(localStorage.getItem("alzaidan_user")); }
    catch { return null; }
};
export const setUser   = (user)     => localStorage.setItem("alzaidan_user", JSON.stringify(user));
export const clearUser = ()         => localStorage.removeItem("alzaidan_user");

// ── Core fetch wrapper ────────────────────────────────────────────────────────
async function request(method, path, body = null) {
    const headers = { "Content-Type": "application/json" };
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const config = { method, headers };
    if (body) config.body = JSON.stringify(body);

    const res = await fetch(`${BASE_URL}${path}`, config);

    // 204 No Content — nothing to parse
    if (res.status === 204) return null;

    const data = await res.json();

    if (!res.ok) {
        // Throw structured error so callers can show meaningful messages
        const message = data?.message || data?.error || "An error occurred";
        const error = new Error(message);
        error.status  = res.status;
        error.data    = data;
        throw error;
    }

    return data;
}

// ── Convenience methods ───────────────────────────────────────────────────────
export const api = {
    get:    (path)          => request("GET",    path),
    post:   (path, body)    => request("POST",   path, body),
    put:    (path, body)    => request("PUT",    path, body),
    delete: (path)          => request("DELETE", path),
    patch:  (path, body)    => request("PATCH",  path, body),
};

export default api;