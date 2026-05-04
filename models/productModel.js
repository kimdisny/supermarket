
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',        // ใส่รหัสผ่านถ้ามี
  database: 'supermarket_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// ดึงสินค้าทั้งหมด
const getAllProducts = (callback) => {
  const sql = 'SELECT * FROM products ORDER BY created_at DESC';
  connection.query(sql, callback);
};

// ดึงสินค้าตาม ID
const getProductById = (id, callback) => {
  const sql = 'SELECT * FROM products WHERE id = ?';
  connection.query(sql, [id], callback);
};

// เพิ่มสินค้า
const createProduct = (data, callback) => {
  const sql = 'INSERT INTO products (name, price, category, stock, image) VALUES (?, ?, ?, ?, ?)';
  const values = [data.name, data.price, data.category, data.stock, data.image];
  connection.query(sql, values, callback);
};

// แก้ไขสินค้า
const updateProduct = (id, data, callback) => {
  const sql = 'UPDATE products SET name=?, price=?, category=?, stock=?, image=? WHERE id=?';
  const values = [data.name, data.price, data.category, data.stock, data.image, id];
  connection.query(sql, values, callback);
};

// ลบสินค้า
const deleteProduct = (id, callback) => {
  const sql = 'DELETE FROM products WHERE id = ?';
  connection.query(sql, [id], callback);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
