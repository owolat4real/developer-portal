// Single place every page reads the API base from, instead of each page
// hardcoding http://localhost:3005 — that only ever worked for local dev;
// a visitor's browser hitting the deployed (Cloudflare Pages) site would
// try to reach "localhost" on their OWN machine and fail. Detects by
// hostname so this one file works unmodified in both places — no per-
// environment build step needed for what's otherwise a plain static site.
window.CS_API_BASE = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
  ? 'http://localhost:3005'
  : 'https://api.careerstudiomax.com';
