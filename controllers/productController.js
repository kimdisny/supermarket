const Product = require('../models/productModel');
const fs      = require('fs');
const path    = require('path');

const productController = {

  // ─── READ (Dashboard / Index) ─────────────────────────────
  index: async (req, res) => {
    try {
      const search   = req.query.search || '';
      const success  = req.query.success || '';
      const products = await Product.getAll(search);
      res.render('index', { products, search, success });
    } catch (err) {
      res.status(500).send('Database Error: ' + err.message);
    }
  },

  // ─── CREATE – แสดงฟอร์ม ───────────────────────────────────
  showCreate: (req, res) => {
    res.render('form', {
      product: null,
      action:  '/products',
      method:  'POST',
      title:   'เพิ่มสินค้า'
    });
  },

  // ─── CREATE – บันทึก ──────────────────────────────────────
  create: async (req, res) => {
    try {
      const image = req.file ? req.file.filename : 'no-image.png';
      await Product.create({ ...req.body, image });
      res.redirect('/?success=created');
    } catch (err) {
      res.status(500).send('Error: ' + err.message);
    }
  },

  // ─── UPDATE – แสดงฟอร์ม ───────────────────────────────────
  showEdit: async (req, res) => {
    try {
      const product = await Product.getById(req.params.id);
      if (!product) return res.redirect('/');
      res.render('form', {
        product,
        action: `/products/${req.params.id}?_method=PUT`,
        method: 'POST',
        title:  'แก้ไขสินค้า'
      });
    } catch (err) {
      res.status(500).send('Error: ' + err.message);
    }
  },

  // ─── UPDATE – บันทึก ──────────────────────────────────────
  update: async (req, res) => {
    try {
      const old = await Product.getById(req.params.id);
      if (!old) return res.redirect('/');

      let image = old.image;

      // ถ้ามีการอัปโหลดรูปใหม่ → ลบรูปเก่าด้วย fs.unlink
      if (req.file) {
        if (old.image && old.image !== 'no-image.png') {
          const oldPath = path.join(__dirname, '../public/uploads', old.image);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        image = req.file.filename;
      }

      await Product.update(req.params.id, { ...req.body, image });
      res.redirect('/?success=updated');
    } catch (err) {
      res.status(500).send('Error: ' + err.message);
    }
  },

  // ─── DELETE ───────────────────────────────────────────────
  delete: async (req, res) => {
    try {
      const product = await Product.getById(req.params.id);

      // ลบไฟล์รูปภาพออกจากโฟลเดอร์ /uploads
      if (product && product.image && product.image !== 'no-image.png') {
        const imgPath = path.join(__dirname, '../public/uploads', product.image);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      }

      await Product.delete(req.params.id);
      res.redirect('/?success=deleted');
    } catch (err) {
      res.status(500).send('Error: ' + err.message);
    }
  }

};

module.exports = productController;
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
