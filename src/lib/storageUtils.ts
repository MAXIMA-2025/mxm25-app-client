import { Category } from "./types";
export const STORAGE_PREFIX = "lebron-";
export const STATUS_TRUE = "ximasud";
export const STATUS_FALSE = "maxibel";
const ALLOWED = new Set([STATUS_TRUE, STATUS_FALSE]);

const keyFor = (orgId: string) => `${STORAGE_PREFIX}${orgId}`;
export function readStatus(orgId: string): string | null {
  try {
    return localStorage.getItem(keyFor(orgId));
  } catch {
    return null;
  }
}
export function writeStatus(orgId: string, value: string) {
  localStorage.setItem(keyFor(orgId), value);
}
export function ensureInitialized(categories: Category[]) {
  for (const cat of categories) {
    for (const org of cat.organizations) {
      const v = readStatus(org.id);
      if (v === null) {
        writeStatus(org.id, STATUS_FALSE);
      }
    }
  }
}
export function findInvalidKeys(categories: Category[]) {
  const invalid: string[] = [];
  for (const cat of categories) {
    for (const org of cat.organizations) {
      const v = readStatus(org.id);
      if (v !== null && !ALLOWED.has(v)) invalid.push(keyFor(org.id));
    }
  }
  return invalid;
}
