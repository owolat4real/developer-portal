'use strict';
require('dotenv').config();
const express = require('express');
const path    = require('path');
const app     = express();
const PORT    = process.env.PORTAL_PORT || 3006;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/docs/quickstart', (_, res) => res.sendFile(path.join(__dirname, 'public', 'quickstart.html')));
app.get('/docs',            (_, res) => res.sendFile(path.join(__dirname, 'public', 'docs.html')));
app.get('/playground',      (_, res) => res.sendFile(path.join(__dirname, 'public', 'playground.html')));
app.get('/cv-compare',      (_, res) => res.sendFile(path.join(__dirname, 'public', 'cv-compare.html')));
app.get('/pricing',         (_, res) => res.sendFile(path.join(__dirname, 'public', 'pricing.html')));
app.get('/dashboard',       (_, res) => res.sendFile(path.join(__dirname, 'public', 'dashboard.html')));
app.get('*',                (_, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, () => console.log(`CareerStudioMax Developer Cloud → http://localhost:${PORT}`));
