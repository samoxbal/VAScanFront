const main = require('../server/controllers/main');

module.exports = function(router) {
    router.get('*', main.index);
};