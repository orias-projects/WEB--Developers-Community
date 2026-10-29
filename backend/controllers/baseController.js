// controllers/baseController.js
class BaseController {
  constructor(service) {
    this.service = service;
  }

  index = async (req, res, next) => {
    try {
      const data = await this.service.getAll({}, {}, req.user);
      res.json(data);
    } catch (err) {
      next(err);
    }
  };

  show = async (req, res, next) => {
    try {
      const data = await this.service.getById(parseInt(req.params.id), req.user);
      res.json(data);
    } catch (err) {
      next(err);
    }
  };

  store = async (req, res, next) => {
    try {
      const data = await this.service.create(req.body, req.user);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const data = await this.service.update(parseInt(req.params.id), req.body, req.user);
      res.json(data);
    } catch (err) {
      next(err);
    }
  };

  destroy = async (req, res, next) => {
    try {
      await this.service.delete(parseInt(req.params.id), req.user);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = BaseController;
