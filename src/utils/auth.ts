/**
 * Authentication utilities for managing user data
 * Note: Token is stored as HTTP-only cookie by the server
 */

const USER_KEY = "apex_novel_user";

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  coinBalance?: number;
}

/**
 * Store user data in localStorage
 */
export function setUser(user: User): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

/**
 * Get user data from localStorage
 */
export function getUser(): User | null {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
  }
  return null;
}

/**
 * Remove user data from localStorage
 */
export function removeUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_KEY);
  }
}

/**
 * Clear all authentication data
 */
export function clearAuth(): void {
  removeUser();
}
