const Sequelize = require('sequelize');
const ban_list = require('./ban_list');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.ban_list = ban_list;

ban_list.init(sequelize);
ban_list.associate(db);

db.sequelize = sequelize;
module.exports = db;