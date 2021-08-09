const { Sequelize } = require('sequelize');
const models = require('../models');

module.exports = class ban_list extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            number: {
                type: Sequelize.INTEGER(3),
                primaryKey: true,
                autoIncrement : true,
            },
            ban_extention: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'ban_list',
            tableName: 'ban_list',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {}
}