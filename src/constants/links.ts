/**
 * Global application links and external service URLs.
 * Configurable via Vite environment variables.
 */

export const CHROME_WEBSTORE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_CHROME_WEBSTORE_URL) ||
  'https://chromewebstore.google.com/detail/chatbridge/gkhbfadpldjkgnhfkmocmjpeefakmjpo';

export const GITHUB_REPO_URL = 'https://github.com/chatbridge/chatbridge';
export const DOCUMENTATION_URL = 'https://chatbridge.app/guides';
