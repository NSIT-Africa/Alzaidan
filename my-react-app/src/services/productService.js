
// ─────────────────────────────────────────────────────────────────────────────
// Mirrors the backend ProductController endpoints.
// All functions return the parsed JSON response or throw on error.
// ─────────────────────────────────────────────────────────────────────────────

import api from "./api";

const productService = {

    // GET /products?search=&category=
    getAll(search = "", category = "") {
        const params = new URLSearchParams();
        if (search)   params.append("search",   search);
        if (category && category !== "All") params.append("category", category);
        const query = params.toString() ? `?${params.toString()}` : "";
        return api.get(`/products${query}`);
    },

    // GET /products/:id
    getById(id) {
        return api.get(`/products/${id}`);
    },

    // GET /products/low-stock
    getLowStock() {
        return api.get("/products/low-stock");
    },

    // POST /products
    create(productData) {
        return api.post("/products", productData);
    },

    // PUT /products/:id
    update(id, productData) {
        return api.put(`/products/${id}`, productData);
    },

    // DELETE /products/:id
    delete(id) {
        return api.delete(`/products/${id}`);
    },
};

export default productService;