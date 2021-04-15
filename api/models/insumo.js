const Sequelize = require('sequelize');
var db = require("../database/db.js");



const Insumo = db.sequelize.define('INSUMO', {
   
    ID_INSUMO: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true
    },
    DESCINSUMO1:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCINSUMO2:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCINSUMO3:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCINSUMO4:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCINSUMO5:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCINSUMO6:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCINSUMO7:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCINSUMO8:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCINSUMO11:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCINSUMO22:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCINSUMO33:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCINSUMO44:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCINSUMO55:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCINSUMO66:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCINSUMO77:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCINSUMO88:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    PERIODO:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    ID_MATERIA:
    {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    
 
   
   
}, {
    timestamps: false,
    id: false

});

module.exports = Insumo