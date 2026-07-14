
// ─────────────────────────────────────────────────────────────────────────────
// Generic hook that wraps any async service call with loading / error / data
// state so every component has a consistent pattern for API interaction.
//
// Usage:
//   const { data, loading, error, execute } = useApi(productService.getAll);
//   useEffect(() => { execute("", "Electronics"); }, []);
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback } from "react";

export function useApi(serviceFunction) {
    const [data,    setData]    = useState(null);
    const [loading, setLoading] = useState(false);
    const [error,   setError]   = useState(null);

    const execute = useCallback(async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const result = await serviceFunction(...args);
            setData(result);
            return result;
        } catch (err) {
            setError(err.message || "An unexpected error occurred");
            throw err;
        } finally {
            setLoading(false);
        }
    }, [serviceFunction]);

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
    }, []);

    return { data, loading, error, execute, reset, setData };
}