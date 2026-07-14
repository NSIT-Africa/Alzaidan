
// ─────────────────────────────────────────────────────────────────────────────
// Provides currentUser and auth helpers to every component via React Context.
// On page load it restores the session from localStorage if a valid token
// is already stored (so the user stays logged in after a refresh).
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";
import { getUser, getToken, clearToken, clearUser } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading]         = useState(true); // checking localStorage on mount

    // Restore session on first render
    useEffect(() => {
        const token = getToken();
        const user  = getUser();
        if (token && user) {
            setCurrentUser(user);
        }
        setLoading(false);
    }, []);

    // ── login ──────────────────────────────────────────────────────────────────
    // Called by the Login component.
    // Returns the user object so the caller can react to success.
    async function login(username, password) {
        const data = await authService.login(username, password);
        setCurrentUser({
            id:       data.id,
            username: data.username,
            name:     data.name,
            role:     data.role,
        });
        return data;
    }

    // ── logout ─────────────────────────────────────────────────────────────────
    function logout() {
        authService.logout();
        setCurrentUser(null);
    }

    // ── role helpers ───────────────────────────────────────────────────────────
    const isAdmin      = currentUser?.role === "ADMINISTRATOR";
    const isSales      = currentUser?.role === "SALES_MANAGER";
    const isInventory  = currentUser?.role === "INVENTORY_OFFICER";
    const canMutate    = isAdmin || isInventory;  // create / update products
    const canDelete    = isAdmin;                  // delete products

    return (
        <AuthContext.Provider value={{
            currentUser,
            loading,
            login,
            logout,
            isAdmin,
            isSales,
            isInventory,
            canMutate,
            canDelete,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// Convenience hook — use this in every component instead of useContext directly
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}