
// ─────────────────────────────────────────────────────────────────────────────
// Mirrors the backend ReportController endpoints.
// ─────────────────────────────────────────────────────────────────────────────

import api from "./api";

const reportService = {

    // GET /reports/dashboard
    getDashboard() {
        return api.get("/reports/dashboard");
    },

    // GET /reports/sales?year=
    getSalesReport(year = new Date().getFullYear()) {
        return api.get(`/reports/sales?year=${year}`);
    },

    // GET /reports/inventory
    getInventoryReport() {
        return api.get("/reports/inventory");
    },

    // GET /reports/profit?year=
    getProfitReport(year = new Date().getFullYear()) {
        return api.get(`/reports/profit?year=${year}`);
    },

    // GET /reports/summary?year=
    getBusinessSummary(year = new Date().getFullYear()) {
        return api.get(`/reports/summary?year=${year}`);
    },
};

export default reportService;