export const UNLOCK_STORAGE_KEY = "portfolio-process-unlocked";

export function isProcessUnlocked() {
  if (typeof window === "undefined") return false;

  return (
    localStorage.getItem(UNLOCK_STORAGE_KEY) === "true" ||
    sessionStorage.getItem(UNLOCK_STORAGE_KEY) === "true"
  );
}

export function setProcessUnlocked() {
  localStorage.setItem(UNLOCK_STORAGE_KEY, "true");
  sessionStorage.setItem(UNLOCK_STORAGE_KEY, "true");
}

export function isValidPassword(password, validPasswords) {
  return validPasswords.includes(password);
}
