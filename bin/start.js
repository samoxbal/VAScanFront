const frontendServer = require('./start-frontend');
const backendCompiler = require('./start-backend');

backendCompiler.run(() => {
    console.log('Backend compiled');

    frontendServer.listen(3002, '127.0.0.1', () => {
        console.log('Frontend compiled');
    });
});