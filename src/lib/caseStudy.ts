/** Case studies are addressable as #case/<id>, so they can be linked and shared. */
export const CASE_PREFIX = "#case/";

export const caseHref = (id: string) => `${CASE_PREFIX}${id}`;

export function caseIdFromHash(hash: string) {
  return hash.startsWith(CASE_PREFIX) ? decodeURIComponent(hash.slice(CASE_PREFIX.length)) : null;
}
