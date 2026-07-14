
// ─────────────────────────────────────────────────────────────────────────────
// Handles POST /api/auth/login and local session management.
// ─────────────────────────────────────────────────────────────────────────────

import api, { setToken, setUser, clearToken, clearUser } from "./api";

const authService = {

    // ── Login ──────────────────────────────────────────────────────────────────
    // Sends credentials → receives { token, id, username, name, role }
    // Persists token + user object to localStorage for page refreshes.
    async login(username, password) {
        const data = await api.post("/auth/login", { username, password });

        setToken(data.token);
        setUser({
            id:       data.id,
            username: data.username,
            name:     data.name,
            role:     data.role,
        });

        return data;
    },

    // ── Logout ─────────────────────────────────────────────────────────────────
    // No backend call needed (JWT is stateless). Just clear local storage.
    logout() {
        clearToken();
        clearUser();
    },
};

export default authService;