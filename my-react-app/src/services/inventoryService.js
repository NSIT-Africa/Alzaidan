
// ─────────────────────────────────────────────────────────────────────────────
// Mirrors the backend InventoryController endpoints.
// ─────────────────────────────────────────────────────────────────────────────

import api from "./api";

const inventoryService = {

    // GET /inventory  — full stock list with status, min/max, supplier etc.
    getAll() {
        return api.get("/inventory");
    },

    // POST /inventory/:productId/restock  — { quantity, reason }
    restock(productId, quantity, reason = "Manual restock") {
        return api.post(`/inventory/${productId}/restock`, { quantity, reason });
    },

    // GET /inventory/:productId/logs  — movement history for one product
    getLogsForProduct(productId) {
        return api.get(`/inventory/${productId}/logs`);
    },

    // GET /inventory/logs  — last 50 movements across all products
    getRecentLogs() {
        return api.get("/inventory/logs");
    },
};

export default inventoryService;