const template = require('../views/index.hbs');

const env = process.env.NODE_ENV || 'development';

exports.index = async (ctx) => {
    ctx.body = template({
        path: env === 'development' ? 'static' : '.build'
    });
};