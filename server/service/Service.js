const DeepFreeze = require('deep-freeze');
const DAO = require('../dal/DAO');

module.exports = class Service extends DeepFreeze.IService {
  constructor(transaction) {
    super(transaction);
    this.DAO = DAO;
  }
};