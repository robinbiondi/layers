const DeveloperService = require('../service/DeveloperService');

module.exports = function (Developer) {

  Developer.remoteMethod('createRandom', {
    http   : {path: '/random', verb: 'post'},
    accepts: [],
    returns: [
      {arg: 'developer', type: 'object', root: true},
    ],
    description: [
      'Create a random developer',
    ],
  });

  Developer.remoteMethod('createRandoms', {
    http   : {path: '/randoms', verb: 'post'},
    accepts: [
      {arg: 'number', type: 'number'},
    ],
    returns: [
      {arg: 'developers', type: 'array', 'root': true},
    ],
    description: [
      'Create a random developer',
    ],
  });

  Developer.createRandom = function createRandom() {
    return DeveloperService.getInstance()
      .then((service) => {
        return service.createRandomDeveloper();

        function blabla() {
          console.log('BLABLA');
        }
      });
  };

  Developer.createRandoms = function createRandoms(number) {
    return DeveloperService.getInstance()
      .then((service) => service.createRandomDevelopers(number));
  };

};