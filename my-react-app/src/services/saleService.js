
// ─────────────────────────────────────────────────────────────────────────────
// Mirrors the backend SaleController endpoints.
// ─────────────────────────────────────────────────────────────────────────────

import api from "./api";

const saleService = {

    // GET /sales?search=
    getAll(search = "") {
        const query = search ? `?search=${encodeURIComponent(search)}` : "";
        return api.get(`/sales${query}`);
    },

    // GET /sales/:id
    getById(id) {
        return api.get(`/sales/${id}`);
    },

    // POST /sales/checkout
    // payload: { customerName, paymentMethod, amountPaid?, items: [{ productId, quantity }] }
    checkout(payload) {
        return api.post("/sales/checkout", payload);
    },

    // GET /sale-items/sale/:saleId  — line items for a specific transaction
    getItemsBySaleId(saleId) {
        return api.get(`/sale-items/sale/${saleId}`);
    },
};

export default saleService;