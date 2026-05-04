// ปรับจาก database.js เดิม — เปลี่ยนแค่ชื่อ database
const mysql = require('mysql2');

const dbConnection = mysql.createPool({
  host:     'localhost',   // MAMP host
  user:     'root',        // MAMP username
  password: 'root',        // MAMP password (MAMP Pro ใช้ root เช่นกัน)
  database: 'supermarket_db',
  port:     8889            // MAMP port (MAMP Pro อาจเป็น 8889)
}).promise();

module.exports = dbConnection;
