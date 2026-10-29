// controllers/userLinkController.js
const BaseController = require("./baseController");
const userLinkService = require("../services/userLinkService");

class UserLinkController extends BaseController {
  constructor() {
    super(userLinkService);
  }

  getByUser = async (req, res, next) => {
    try {
      const data = await this.service.getLinksByUser(parseInt(req.params.userId));
      res.json(data);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new UserLinkController();
