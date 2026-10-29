// services/userService.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BaseService = require("./baseService");
const userRepository = require("../repositories/userRepository");
const { ConflictError, UnauthorizedError } = require("../utils/errors");

class UserService extends BaseService {
  constructor() {
    super(userRepository);
  }

  async register(data) {
    const existingEmail = await this.repository.findByEmail(data.email);
    if (existingEmail) throw new ConflictError("Email này đã được sử dụng.");

    const existingUsername = await this.repository.findByUsername(data.username);
    if (existingUsername) throw new ConflictError("Username này đã được sử dụng.");

    const hashed = await bcrypt.hash(data.password, 10);

    const user = await this.repository.create({
      username: data.username,
      nickname: data.nickname,
      email: data.email,
      password_hash: hashed,
    });

    delete user.password_hash;
    return user;
  }

  async login({ username, password }) {
    const user = await this.repository.findByUsername(username);
    if (!user) throw new UnauthorizedError("Username hoặc mật khẩu không chính xác.");

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) throw new UnauthorizedError("Username hoặc mật khẩu không chính xác.");

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    delete user.password_hash;
    return { user, token };
  }

  async updateProfile(userIdToUpdate, data, currentUser) {
    if (currentUser.id !== userIdToUpdate && currentUser.role !== 'admin') {
      throw new ForbiddenError("Bạn không có quyền thực hiện hành động này.");
    }

    const userToUpdate = await this.repository.findById(userIdToUpdate);
    if (!userToUpdate) {
        throw new NotFoundError("Không tìm thấy người dùng này.");
    }

    if (data.email && data.email !== userToUpdate.email) {
      const existingEmail = await this.repository.findByEmail(data.email);
      if (existingEmail) {
        throw new ConflictError("Email này đã được người khác sử dụng.");
      }
    }

    const updatedUser = await this.repository.update(userIdToUpdate, {
        nickname: data.nickname,
        bio: data.bio,
        email: data.email,
    });

    delete updatedUser.password_hash;
    return updatedUser;
  }

  async changePassword(userId, data, currentUser) {
    if (currentUser.id !== userId) {
      throw new ForbiddenError("Bạn không có quyền thực hiện hành động này.");
    }

    const user = await this.repository.findById(userId);
    if (!user) throw new NotFoundError("Không tìm thấy người dùng.");

    const isMatch = await bcrypt.compare(data.currentPassword, user.password_hash);
    if (!isMatch) {
      throw new UnauthorizedError("Mật khẩu hiện tại không chính xác.");
    }

    const hashedNewPassword = await bcrypt.hash(data.newPassword, 10);
    
    await this.repository.update(userId, {
      password_hash: hashedNewPassword,
    });
  }
}

module.exports = new UserService();