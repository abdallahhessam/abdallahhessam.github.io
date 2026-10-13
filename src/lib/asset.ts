/** Resolve a /public asset path against the deployment base (works at root or a sub-path).
 *  data: URIs pass through untouched (used by the single-file preview build). */
export const asset = (path: string) =>
  path.startsWith("data:") ? path : `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
