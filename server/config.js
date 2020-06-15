const fs = require('fs');
const path = require('path');

const spdyServerOptions = {
  key: fs.readFileSync(path.join(__dirname, './localhost-privkey.pem')), 
  cert: fs.readFileSync(path.join(__dirname, './localhost-cert.pem')),
};

module.exports = spdyServerOptions;
