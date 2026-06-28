/**
 * Escape regex metacharacters so a user-supplied search term is matched
 * literally. Prevents ReDoS / unexpected matching when building a RegExp
 * from request input.
 */
export const escapeRegex = (str = "") =>
  String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
