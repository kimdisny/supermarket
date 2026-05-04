const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

// ตั้งค่า Multer สำหรับ upload รูปภาพ
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    cb(null, isValid);
  }
});

// กำหนด Routes
router.get('/', productController.index);           // หน้าแสดงสินค้า
router.get('/create', productController.create);    // ฟอร์มเพิ่มสินค้า
router.post('/store', upload.single('image'), productController.store);    // บันทึกสินค้าใหม่
router.get('/edit/:id', productController.edit);    // ฟอร์มแก้ไข
router.post('/update/:id', upload.single('image'), productController.update); // อัปเดต
router.post('/delete/:id', productController.destroy); // ลบสินค้า

module.exports = router;
