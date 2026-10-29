// services/baseService.js
class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll(where = {}, options = {}, user = null) {
    return this.repository.findAll(where, options);
  }

  async getById(id, user = null) {
    return this.repository.findById(id);
  }

  async create(data, user = null) {
    return this.repository.create(data);
  }

  async update(id, data, user = null) {
    return this.repository.update(id, data);
  }

  async delete(id, user = null) {
    return this.repository.delete(id);
  }
}

module.exports = BaseService;
