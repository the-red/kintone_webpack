const path = require('path');
const os = require('os');

module.exports = {
  context: `${__dirname}/src`,
  entry: {
    app1: './app1.js',
    app2: './app2.js',
  },
  output: {
    path: path.join(os.homedir(), 'Dropbox/kintone/projectName'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
};
