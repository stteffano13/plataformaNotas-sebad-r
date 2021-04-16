const Sequelize = require('sequelize');
var db = require("../database/db.js");



const Insumo = db.sequelize.define('INSUMO', {
   
    ID_INSUMO: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true
    },
    DESCASISTENCIA1:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCASISTENCIA2:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCASISTENCIA3:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCASISTENCIA4:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCASISTENCIA5:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCASISTENCIA6:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCASISTENCIA7:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCASISTENCIA8:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCTAREA1:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCTAREA2:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCTAREA3:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCTAREA4:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCPROYECTO1:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCTAREA11:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCTAREA22:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCTAREA33:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCTAREA44:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCPROYECTO2:
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