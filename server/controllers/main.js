const env = process.env.NODE_ENV || 'development';

exports.index = function*() {
    yield this.render('index', {
        path: env === 'development' ? 'static' : '.build'
    });
};