const db = require('./database');

const Product = {
  // READ ALL (with optional search)
  getAll: async (search = '') => {
    if (search) {
      const [rows] = await db.execute(
        'SELECT * FROM `products` WHERE `name` LIKE ? OR `category` LIKE ? ORDER BY `id` DESC',
        [`%${search}%`, `%${search}%`]
      );
      return rows;
    }
    const [rows] = await db.execute('SELECT * FROM `products` ORDER BY `id` DESC');
    return rows;
  },

  // READ ONE
  getById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM `products` WHERE `id` = ?', [id]);
    return rows[0];
  },

  // CREATE
  create: async (data) => {
    const { name, category, price, stock, image } = data;
    const [result] = await db.execute(
      'INSERT INTO `products` (`name`, `category`, `price`, `stock`, `image`) VALUES (?, ?, ?, ?, ?)',
      [name, category, price, stock, image]
    );
    return result;
  },

  // UPDATE
  update: async (id, data) => {
    const { name, category, price, stock, image } = data;
    const [result] = await db.execute(
      'UPDATE `products` SET `name`=?, `category`=?, `price`=?, `stock`=?, `image`=? WHERE `id`=?',
      [name, category, price, stock, image, id]
    );
    return result;
  },

  // DELETE
  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM `products` WHERE `id` = ?', [id]);
    return result;
  }
};

module.exports = Product;
