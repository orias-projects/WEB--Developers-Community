// services/userLinkService.js
const BaseService = require("./baseService");
const userLinkRepository = require("../repositories/userLinkRepository");

class UserLinkService extends BaseService {
  constructor() {
    super(userLinkRepository);
  }

  async getLinksByUser(userId) {
    return this.repository.findByUserId(userId);
  }
}

module.exports = new UserLinkService();
