// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Công khai
router.post("/register", userController.register);
router.post("/login", userController.login);

// Fire Wall
router.use(authMiddleware);

// Yêu cầu token
router.get("/", userController.index);
router.get("/:id", userController.show);
router.post("/", userController.store);
router.patch("/:id", userController.updateProfile);
router.patch("/:id/password", userController.changePassword);
router.delete("/:id", userController.destroy);

module.exports = router;