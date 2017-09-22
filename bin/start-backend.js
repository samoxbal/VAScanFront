const webpack = require('webpack');
const respawn = require('respawn');
const config = require('../webpack.backend.config');

const compiler = webpack(config);

let monitor;

compiler.run((err) => {
    if (err) {
        console.log(err);
    }
});

compiler.plugin('done', () => {
    console.log('Backend compiled');
    try {
        if (!monitor) {
            monitor = respawn(['node', '--harmony', '.build/server.js'], {
                cwd: '.',
                maxRestarts: 1,
                sleep: 100,
                kill: 1000,
                stdio: [
                    process.stdin,
                    process.stdout,
                    process.stderr
                ]
            });

            monitor.start();
        } else {
            monitor.stop(() => monitor.start());
        }
    } catch (error) {
        console.error(error.toString());
    }
});