// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // 1. Lấy token từ header 'Authorization'
  const authHeader = req.headers.authorization;

  // 2. Kiểm tra xem token có tồn tại không và có đúng định dạng 'Bearer [token]' không
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication invalid: No token provided or malformed token." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 3. Giải mã và xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

    // 4. Gắn thông tin người dùng đã giải mã vào đối tượng request
    req.user = decoded;

    // 5. Chuyển sang middleware hoặc controller tiếp theo
    next();
  } catch (err) {
    // 6. Bắt lỗi nếu token không hợp lệ (hết hạn, sai chữ ký, v.v.)
    return res.status(401).json({ message: "Authentication invalid: Invalid token." });
  }
};

module.exports = authMiddleware;