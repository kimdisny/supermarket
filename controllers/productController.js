const productModel = require('../models/productModel');
const path = require('path');
const fs = require('fs');

// แสดงรายการสินค้าทั้งหมด
const index = (req, res) => {
  productModel.getAllProducts((err, products) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.render('index', { products });
  });
};

// แสดงฟอร์มเพิ่มสินค้า
const create = (req, res) => {
  res.render('form', { product: null, action: '/store' });
};

// บันทึกสินค้าใหม่
const store = (req, res) => {
  const { name, price, category, stock } = req.body;
  const image = req.file ? req.file.filename : null;

  const data = { name, price, category, stock, image };

  productModel.createProduct(data, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving product');
    }
    res.redirect('/');
  });
};

// แสดงฟอร์มแก้ไขสินค้า
const edit = (req, res) => {
  const id = req.params.id;
  productModel.getProductById(id, (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).send('Product not found');
    }
    res.render('form', { product: results[0], action: `/update/${id}` });
  });
};

// อัปเดตสินค้า
const update = (req, res) => {
  const id = req.params.id;
  const { name, price, category, stock } = req.body;

  productModel.getProductById(id, (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).send('Product not found');
    }

    const oldProduct = results[0];
    let image = oldProduct.image; // ใช้รูปเดิมถ้าไม่ได้อัปโหลดใหม่

    if (req.file) {
      image = req.file.filename;
      // ลบรูปเดิม
      if (oldProduct.image) {
        const oldPath = path.join(__dirname, '../public/uploads', oldProduct.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    const data = { name, price, category, stock, image };
    productModel.updateProduct(id, data, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error updating product');
      }
      res.redirect('/');
    });
  });
};

// ลบสินค้า
const destroy = (req, res) => {
  const id = req.params.id;
  productModel.getProductById(id, (err, results) => {
    if (!err && results.length > 0 && results[0].image) {
      const imgPath = path.join(__dirname, '../public/uploads', results[0].image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
    productModel.deleteProduct(id, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error deleting product');
      }
      res.redirect('/');
    });
  });
};

module.exports = { index, create, store, edit, update, destroy };
