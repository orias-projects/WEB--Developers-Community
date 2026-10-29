// repositories/userRepository.js
const { PrismaClient } = require("@prisma/client");
const BaseRepository = require("./baseRepository");
const prisma = new PrismaClient();

class UserRepository extends BaseRepository {
  constructor() {
    super(prisma.users);
  }

  async findByEmail(email) {
    return this.model.findUnique({ where: { email } });
  }

  // Thêm hàm này từ bước trước
  async findByUsername(username) {
    return this.model.findUnique({ where: { username } });
  }
}

module.exports = new UserRepository();