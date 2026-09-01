// Small helper to read the payload of a JWT without any extra dependency.
// The API is expected to encode { id, email, isAdmin } in the token payload,
// which is the standard shape used across the course's backends.
export function decodeToken(token) {
    if (!token) return null;

    try {
        const payload = token.split(".")[1];
        const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
        const json = decodeURIComponent(
            atob(normalized)
                .split("")
                .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
                .join("")
        );
        return JSON.parse(json);
    } catch (err) {
        console.error("Failed to decode token", err);
        return null;
    }
}
