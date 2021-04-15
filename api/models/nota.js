const Sequelize = require('sequelize');
var db = require("../database/db.js");



const Nota = db.sequelize.define('NOTA', {
   
    ID_NOTA: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true
    },
   INSUMO1:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
   INSUMO2:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
   INSUMO3:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
   INSUMO4:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    INSUMO5:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    INSUMO6:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    INSUMO7:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    INSUMO8:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    EXAMEN1:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    INSUMO11:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
   INSUMO22:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
   INSUMO33:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    INSUMO44:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    INSUMO55:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
   INSUMO66:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    INSUMO77:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    INSUMO88:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    EXAMEN2:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    EXAMENSUPLETORIO:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    EXAMENREMEDIAL:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    EXAMENGRACIA:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    PT:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    PERIODO:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    ID_ESTUDIANTE:
    {
        type: Sequelize.NUMBER,
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

module.exports = Nota