const indexController = require('../server/controllers/main');

module.exports = function(router) {
    router.get('*', indexController);
};