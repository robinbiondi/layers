const DeepFreeze = require('deep-freeze');
const app = require('../../server/server');

module.exports = class DAO extends DeepFreeze.IDAO {

  /**
   * Start a transaction
   * @memberof DAO
   * @return {object<LoopbackTransaction>} A loopback's transaction
   */
  static startTransaction() {
    return new Promise((resolve, reject) => {
      const Developer = app.models.Developer;

      Developer.beginTransaction({
        isolationLevel: Developer.Transaction.READ_COMMITTED,
      }, (err, tx) => {
        if (err)
          return reject(err);

        return resolve({transaction: tx});
      });
    });
  }

  /**
   * Commit a transaction
   * @memberof DAO
   * @arg {object<LoopbackTransaction>} tx The transaction to commit
   * @return {object<LoopbackTransaction>} The commited loopback's transaction
   */
  static commitTransaction(tx) {
    return new Promise((resolve, reject) => {
      tx.transaction.commit((err, tx) => {
        if (err)
          return reject(err);

        return resolve(tx);
      });
    });
  }

  /**
   * Rollback a transaction
   * @memberof DAO
   * @arg {object<LoopbackTransaction>} tx The transaction to rollback
   * @return {object<LoopbackTransaction>} The rolled back loopback's transaction
   */
  static rollbackTransaction(tx) {
    return new Promise((resolve, reject) => {
      tx.transaction.rollback((err, tx) => {
        if (err)
          return reject(err);

        return resolve(tx);
      });
    });
  }

  /**
   * Persist a object in the DB and returns it
   * @memberof DAO
   * @param {object} object a object json object
   * @return {object} A persisted object
   */
  create(object) {
    return this.Model.create(object, this.transaction)
      .then((_object) => _object.toJSON());
  }

  /**
   * Find an object in the DB and update it
   * @memberof DAO
   * @param {object} object a object json object
   * @return {object} A persisted object
   */
  update(object) {
    return this.Model.findById(object.id)
      .then(obj => obj.updateAttributes(object, this.transaction));
  }

  /**
   * Find an object in the DB
   * @memberof DAO
   * @param {object} object a object json object
   * @return {object} A persisted object
   */
  find(id) {
    return this.Model.findById(id, {}, this.transaction)
      .then((_object) => _object.toJSON());
  }
};