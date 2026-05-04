#ระบบจัดการคลังสินค้าซูเปอร์มาร์เก็ต (Node.js MVC)

CRUD ด้วย Node.js + MySQL + MVC

---

##โครงสร้างโปรเจกต์ (MVC)
supermarket-app/
├── controllers/
│   └── productController.js   ← Logic CRUD ทั้งหมด
├── models/
│   ├── database.js            ← เชื่อมต่อ MySQL (MAMP)
│   └── productModel.js        ← SQL Queries
├── routes/
│   └── productRoutes.js       ← กำหนด URL + Multer
├── public/
│   └── uploads/               ← เก็บรูปภาพที่อัปโหลด
├── views/
│   ├── index.ejs              ← Dashboard (Read)
│   └── form.ejs               ← เพิ่ม/แก้ไขสินค้า (Create/Update)
├── app.js                     ← Entry Point
├── package.json
├── supermarket_db.sql         ← SQL Schema
└── README.md

##วิธีติดตั้งและรัน

###1. เปิด MAMP → Start Servers

###2. Import Database
ไปที่ `http://localhost/phpmyadmin`
สร้างไฟล์ `supermarket_db.sql`

###3. ติดตั้ง Dependencies
```bash
npm install
```

###4. รันโปรแกรม
```bash
node app.js
```

###5. เปิดเบราว์เซอร์
```
http://localhost:3000
```


##Database Config
password: 'root',  
port:     8889    

##ฟีเจอร์การใช้งาน
| ฟีเจอร์ | รายละเอียด |
|---------|-----------|
| Dashboard (Read) | Grid Cards แสดง รูป/ชื่อ/หมวด/ราคา/สต็อก |
| Search Bar | ค้นหาด้วยชื่อหรือหมวดหมู่ |
| เพิ่มสินค้า (Create) | ฟอร์ม + อัปโหลดรูปภาพด้วย Multer |
| แก้ไข (Update) | แก้ข้อมูล + ลบรูปเก่าด้วย fs.unlink |
| ลบ (Delete) | Modal ยืนยัน + ลบรูปจาก /uploads |
| Out of Stock | Badge สีแดงเมื่อสต็อก = 0 |
| Image Preview | แสดงรูปทันทีที่เลือกไฟล์ |
| Success Alert | Toast/Alert หลัง CRUD สำเร็จ |

##Tech Stack
- **Runtime:** Node.js | **Framework:** Express.js
- **Template:** EJS | **Database:** MySQL (MAMP)
- **Driver:** mysql2 | **Upload:** Multer | **UI:** Bootstrap 5
