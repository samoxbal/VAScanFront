import indexController from '../server/controllers/main';

module.exports = function(router) {
    router.get('*', indexController);
};