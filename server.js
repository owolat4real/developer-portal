'use strict';
require('dotenv').config();
const express = require('express');
const path    = require('path');
const app     = express();

// Pulled from public discovery 2026-09-05 (RunPod inference backend
// offline pending cost) -- file-level noindex tags already cover the
// real HTML pages; this blanket header also covers any JSON API routes.
app.use((req, res, next) => { res.setHeader('X-Robots-Tag', 'noindex, nofollow'); next(); });
const PORT    = process.env.PORTAL_PORT || 3006;

app.use(express.static(path.join(__dirname, 'public')));
// Was mounted at /docs/quickstart (not /quickstart) — matched nothing on
// Cloudflare Pages production, which resolves clean URLs by filename
// (quickstart.html -> /quickstart) and has no /docs/quickstart route at
// all, so every "Get free API key" link on every page silently fell
// through to the SPA fallback (the homepage) instead of the real,
// working registration widget on this page. Local dev's own explicit
// route mapping had been masking the mismatch.
app.get('/quickstart', (_, res) => res.sendFile(path.join(__dirname, 'public', 'quickstart.html')));
app.get('/docs',            (_, res) => res.sendFile(path.join(__dirname, 'public', 'docs.html')));
app.get('/playground',      (_, res) => res.sendFile(path.join(__dirname, 'public', 'playground.html')));
app.get('/cv-compare',      (_, res) => res.sendFile(path.join(__dirname, 'public', 'cv-compare.html')));
app.get('/pricing',         (_, res) => res.sendFile(path.join(__dirname, 'public', 'pricing.html')));
app.get('/dashboard',       (_, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard.html')));
app.get('/changelog',       (_, res) => res.sendFile(path.join(__dirname, 'public', 'changelog.html')));
// Real, live-caught gap (2026-08-30): contact.html exists but had no
// clean-URL route -- fell through to the SPA fallback (homepage).
app.get('/contact',         (_, res) => res.sendFile(path.join(__dirname, 'public', 'contact.html')));
app.get('*',                (_, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`CareerStudioMax Developer Cloud → http://localhost:${PORT}`));
