const render = require('koa-hbs');

module.exports = function(app, router, config) {

    app.use(render.middleware({
        viewPath: `${config.root}/server/views`
    }));

    app.use(router.routes());
    app.use(router.allowedMethods());
};