// repositories/userLinkRepository.js
const { PrismaClient } = require("@prisma/client");
const BaseRepository = require("./baseRepository");
const prisma = new PrismaClient();

class UserLinkRepository extends BaseRepository {
  constructor() {
    super(prisma.user_links);
  }

  async findByUserId(userId) {
    return this.model.findMany({ where: { user_id: userId } });
  }
}

module.exports = new UserLinkRepository();
