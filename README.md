# ORIAS

## Giới thiệu

Dự án web cộng đồng cho lập trình viên, nơi người dùng có thể quản lý hồ sơ cá nhân, liên kết mạng xã hội, dự án, kho mã nguồn (repository) và blog.

Hệ thống được xây dựng trên kiến trúc MRSC (Model – Repository – Service – Controller) với Node.js, Express và Prisma ORM kết nối MySQL.

---

## Cấu trúc thư mục

```

\Dev-Hub-Project
│
├─ database/
│
├─ docs/                       # Tài liệu dự án
│  ├─ api/                     # Đặc tả API (OpenAPI, mô tả endpoint)
│  ├─ architecture/            # Sơ đồ, luồng xử lý, quyết định thiết kế
│  └─ adr/                     # Architecture Decision Records
│
├─ backend
│  ├─ config/
│  ├─ controllers/
│  ├─ generated/
│  │
│  ├─ middleware/	       # Auth
│  ├─ models/
│  ├─ node_modules/	       # Libraries
│  ├─ prisma/
│  │  ├─ ERD/
│  │  └─ schema.prisma
│  │
│  ├─ repositories/
│  ├─ routes/
│  ├─ services/
│  ├─ utils/
│  ├─ tests/                   # Bộ test cho backend
│  │  ├─ unit/                 # Test đơn vị
│  │  ├─ integration/          # Test tích hợp
│  │  └─ e2e/                  # Test end-to-end (nếu dùng)
│  │
│  ├─ app.js
│  ├─ package-lock.json
│  ├─ package.json
│  └─ server.js
│
├─ frontend/                   # Ứng dụng client
│  ├─ public/                  # Tệp tĩnh cho FE (favicons, manifest, ảnh…)
│  │ 	├─ assets/
│  │ 	└─ images/
│  └─ tests/                   # Test FE (nếu tách riêng)
│     ├─ unit/
│     └─ e2e/
│
├─ scripts/                    # Script seed, build, deploy, cron...
├─ shared/                     # Kiểu dữ liệu, tiện ích dùng chung
├─ .gitignore
├─ GUIDE.md
└─ README.md
```

## Cơ sở dữ liệu

* **users** : thông tin người dùng
* **user_links** : liên kết mạng xã hội
* **project_folders / projects** : thư mục dự án và dự án
* **repository_folders / repositories** : thư mục repo và repo
* **blog_folders / blogs** : thư mục blog và bài viết

Mỗi bảng có quan hệ chặt chẽ với `users` hoặc folder cha, hỗ trợ xóa cascade.

---

## Cách triển khai

1. Clone dự án về máy.
2. Cài đặt Node.js và MySQL.
3. Tạo file `.env` trong `backend/config`, ví dụ:

   DATABASE_URL="mysql://user:password@localhost:3306/databasename"

   JWT_SECRET="chuoi_bao_mat"

   ===============
4. Cài đặt dependencies:

   cd backend
   npm init -y
   npm install

   Hoặc cài đặt từng dependencies => Bước 5

   ===============
5. Cài dặt môi trường cụ thể:

   cd backend
   npm init -y

   npm install @prisma/client
   npm install bcrypt cors dotenv express helmet joi jsonwebtoken morgan prisma
   npm install --save-dev nodemon eslint jest supertest

   ===============
6. Tạo database với Prisma

   npx prisma init
   cd prisma
   mkdir migrations
   cd ..

   npx prisma migrate dev   # nếu tạo database bằng prisma
   npx prisma db pull           # nếu tạo prisma tham chiếu từ database, đổi provider -> hệ csdl đang dùng
   npx prisma generate       # ...

   ===============
7. Chạy server backend:

   npm start            # không nodemon

   cd backend
   npm run dev       # chạy bằng nodemon

   ===============
8. Truy cập frontend (tùy framework) và kết nối API ở `http://localhost:3000`.

   http://localhost:3000/api/users/register
   http://localhost:3000/api/users/login

---

## Cấu hình

* Tất cả biến môi trường đặt trong `.env`.
* Các tham số quan trọng: chuỗi kết nối DB, JWT secret, cổng server.
* Có thể tùy chỉnh thêm trong `backend/config`.

---

## Hướng phát triển

* Viết test trong `tests/` (backend và frontend tách riêng).
* Ghi lại quyết định kiến trúc trong `docs/adr`.
* Viết đặc tả API trong `docs/api`.
* Lưu sơ đồ thiết kế vào `docs/architecture`.

====================

## License

MIT — see `LICENSE`.
