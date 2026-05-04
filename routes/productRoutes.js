const express   = require('express');
const router    = express.Router();
const multer    = require('multer');
const path      = require('path');
const ctrl      = require('../controllers/productController');

// ─── Multer (รับเฉพาะไฟล์รูปภาพ) ────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename:    (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ok = /jpeg|jpg|png|gif|webp/.test(
      path.extname(file.originalname).toLowerCase()
    );
    cb(null, ok);
  }
});

// ─── Method Override (PUT / DELETE ผ่าน HTML form) ───────────
router.use((req, res, next) => {
  if (req.query._method === 'PUT')    req.method = 'PUT';
  if (req.query._method === 'DELETE') req.method = 'DELETE';
  next();
});

// ─── CRUD Routes ─────────────────────────────────────────────
router.get( '/',                     ctrl.index);
router.get( '/products/new',         ctrl.showCreate);
router.post('/products',             upload.single('image'), ctrl.create);
router.get( '/products/:id/edit',    ctrl.showEdit);
router.put( '/products/:id',         upload.single('image'), ctrl.update);
router.delete('/products/:id',       ctrl.delete);

module.exports = router;
