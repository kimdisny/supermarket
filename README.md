 Supermarket App 

เปิด cmd
cd Documents
mkdir supermarket-app
cd supermarket-app
npm init -y
npm install express ejs mysql2 multer
mkdir controllers models routes views public
mkdir public\uploads
code .  


แอป xempp กด start Apche และMySQL ละกดadmin จะเด้งไปเว็ป จากนั้นให้สร้างtable
CREATE DATABASE supermarket_db;
USE supermarket_db;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100),
  stock INT DEFAULT 0,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ละกดGO จากนั่นก็ไปเขียนโค้ด  npm run dev ,node app.js  จากนั่นก็ไปเว็ปServer running at http://localhost:3000  
วิธีการใช้ กดเพิ่ทสินค้าที่จะเพิ่มโหลดรูปจากGG ละกดบันทึก รายการสินค้าก็จะขึ้นมา