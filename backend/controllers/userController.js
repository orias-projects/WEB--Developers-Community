// controllers/userController.js
const BaseController = require("./baseController");
const userService = require("../services/userService");
const { registerSchema, loginSchema, updateUserSchema } = require('../validations/userValidation');

class UserController extends BaseController {
  constructor() {
    super(userService);
  }

  register = async (req, res, next) => {
    try {
      const { error, value } = registerSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ errors: errorMessages });
      }

      const data = await this.service.register(value);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const { error, value } = loginSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ errors: errorMessages });
      }

      const data = await this.service.login(value);
      res.json(data);
    } catch (err) {
      next(err);
    }
  };

  updateProfile = async (req, res, next) => {
    try {
      const { error, value } = updateUserSchema.validate(req.body);
      if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ errors: errorMessages });
      }

      const userIdToUpdate = parseInt(req.params.id, 10);
      const currentUser = req.user;
      const updatedUser = await this.service.updateProfile(userIdToUpdate, value, currentUser);
      
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  };

  changePassword = async (req, res, next) => {
    try {
      const { error, value } = changePasswordSchema.validate(req.body);
      if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ errors: errorMessages });
      }

      const userId = parseInt(req.params.id, 10);
      const currentUser = req.user;

      await this.service.changePassword(userId, value, currentUser);

      // Trả về thông báo thành công
      res.status(200).json({ message: "Đổi mật khẩu thành công." });

    } catch (err) {
      next(err);
    }
  };
}

module.exports = new UserController();