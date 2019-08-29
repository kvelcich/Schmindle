const { app } = require('electron').remote;

const config = {};

config.local = {};
config.local.collectionPath = `${app.getPath('userData')}/collection/`;

module.exports = config;
