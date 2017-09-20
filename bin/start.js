const process = require('child_process');

process.spawn('node', ['start-backend.js']);
process.spawn('node', ['start-frontend.js']);