const Sequelize = require('sequelize');
var db = require("../database/db.js");



const InsumoB = db.sequelize.define('INSUMOB', {
   
    ID_INSUMOB: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true
    },
    DESCQ1P1INSUMO1:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ1P1INSUMO2:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ1P1INSUMO3:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ1P1INSUMO4:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ1P1INSUMO5:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ1P1INSUMO6:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ1P2INSUMO1:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ1P2INSUMO2:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ1P2INSUMO3:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ1P2INSUMO4:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ1P2INSUMO5:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ1P2INSUMO6:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ1P3INSUMO1:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ1P3INSUMO2:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ1P3INSUMO3:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ1P3INSUMO4:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ1P3INSUMO5:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ1P3INSUMO6:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ2P1INSUMO1:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ2P1INSUMO2:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ2P1INSUMO3:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ2P1INSUMO4:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ2P1INSUMO5:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ2P1INSUMO6:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ2P2INSUMO1:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ2P2INSUMO2:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ2P2INSUMO3:
    {
        type: Sequelize.STRING,
        allowNull: true
    },




    DESCQ2P2INSUMO4:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ2P2INSUMO5:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ2P2INSUMO6:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ2P3INSUMO1:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ2P3INSUMO2:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ2P3INSUMO3:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ2P3INSUMO4:
    {
        type: Sequelize.STRING,
        allowNull: true
    },

    DESCQ2P3INSUMO5:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESCQ2P3INSUMO6:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
 

    PERIODO:
    {
        type: Sequelize.STRING,
        allowNull: false
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

module.exports = InsumoB