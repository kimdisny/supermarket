const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/productRoutes');

const app = express();

const fs = require('fs');
if (!fs.existsSync('public/uploads')) {
  fs.mkdirSync('public/uploads', { recursive: true });
}

// ─── Middleware ───────────────────────────────────────────────
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files (รูปภาพ uploads)
app.use(express.static(path.join(__dirname, 'public')));

// ─── View Engine ─────────────────────────────────────────────
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ─── Routes ──────────────────────────────────────────────────
app.use('/', productRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).send('<h1 style="font-family:sans-serif;text-align:center;margin-top:4rem">404 – Page Not Found</h1>');
});

// ─── Start Server ────────────────────────────────────────────
app.listen(3000, () => {
  console.log('🛒 Supermarket App running at http://localhost:3000');
});
