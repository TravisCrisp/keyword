export function isValidRoute(pathSegments, allowedRoutes) {
    if (pathSegments.length === 0) return true; // Index is always allowed

    const [current, ...remaining] = pathSegments;

    for (const route of allowedRoutes) {
        if (typeof route === "string") {
            // Direct match with a string
            if (route === current) {
                return isValidRoute(remaining, []); // Continue with empty sub-routes
            }
        } else if (typeof route === "object") {
            // Match nested routes
            const [key, subRoutes] = Object.entries(route)[0];
            if (key === current) {
                return isValidRoute(remaining, subRoutes);
            }
        }
    }

    return false; // No match found
}