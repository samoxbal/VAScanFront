const path = require('path');
const spawn = require('child_process').spawn;

spawn('node', [path.join(__dirname, 'start-backend')], { stdio: 'inherit' });
spawn('node', [path.join(__dirname, 'start-frontend')], { stdio: 'inherit' });