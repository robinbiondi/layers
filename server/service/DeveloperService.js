const Service = require('./Service');
const DeveloperDAO = require('../dal/DeveloperDAO');
const axios = require('axios');

/**
 * The service dedicated to developers
 * @class DeveloperService
 * @extends Service
 */
module.exports = class DeveloperService extends Service {
  constructor(transaction) {
    super(transaction);
    this.DAO = DeveloperDAO;
  }

  /**
   * @function createRandomDeveloper
   * @memberof DeveloperService
   * @return {object} a persisted developer object
   */
  createRandomDeveloper() {
    console.log('createRandomDeveloper');
    return this.createRandomDevelopers(1);
  }

  /**
   * @function createRandomDevelopers
   * @memberof DeveloperService
   * @param {number} number The number of developers to create
   * @return {array<object>} an array of persisted developer object
   */
  createRandomDevelopers(number) {
    return this.generateRandomDevelopers(number)
      .map(this.createDeveloper);
  }

  /**
   * @function generateRandomDevelopers
   * @memberof DeveloperService
   * @param {number} number The number of developers to create
   * @return {object} A generated Developer
   */
  generateRandomDevelopers(number) {
    return axios.get('https://randomuser.me/api?results=' + number)
      .then((response) => {
        return response.data.results.map(dev => ({
          firstname: dev.name.first,
          lastname : dev.name.last,
        }));
      })
      .catch((error) => {
        console.log('ERROR generating players', error);
        throw error;
      });
  }

  /**
   * @function createDeveloper
   * @memberof DeveloperService
   * @param {object} developer the js object of the developer to create
   * @return {object} A developer initialised
   */
  createDeveloper(developer) {
    return this.getDao()
      .then((dao) => {
        return dao.create(developer);
      });
  }

  /**
   * @function updateDeveloper
   * @memberof DeveloperService
   * @param {object} developer the js object of the developer updated
   * @return {object} A developer initialised
   */
  updateDeveloper(developer) {
    return this.getDao()
      .then((dao) => {
        return dao.update(developer);
      });
  }
};