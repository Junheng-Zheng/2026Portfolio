export const UNLOCK_STORAGE_KEY = "portfolio-process-unlocked";

export function isProcessUnlocked() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(UNLOCK_STORAGE_KEY) === "true";
}

export function setProcessUnlocked() {
  sessionStorage.setItem(UNLOCK_STORAGE_KEY, "true");
}

export function isValidPassword(password, validPasswords) {
  return validPasswords.includes(password);
}
