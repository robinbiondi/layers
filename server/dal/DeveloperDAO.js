const DAO = require('./DAO');
const app = require('../server');

module.exports = class DeveloperDAO extends DAO {

  constructor() {
    super(arguments);
    this.Model = app.models.Developer;
  }

  getDeveloperAndTasks(id) {
    return this.Model.findById(id, {
      include: 'cards',
    }, {transaction: this.transaction});
  }
};