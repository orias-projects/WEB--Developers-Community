// routes/userLinkRoutes.js
const express = require("express");
const router = express.Router();
const userLinkController = require("../controllers/userLinkController");

// CRUD chuẩn
router.get("/", userLinkController.index);
router.get("/:id", userLinkController.show);
router.post("/", userLinkController.store);
router.put("/:id", userLinkController.update);
router.delete("/:id", userLinkController.destroy);

// đặc thù
router.get("/user/:userId", userLinkController.getByUser);

module.exports = router;
