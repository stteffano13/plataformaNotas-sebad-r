const Sequelize = require('sequelize');
var db = require("../database/db.js");



const Matricula = db.sequelize.define('MATRICULA', {

    ID_MATRICULA: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true
    },
    CODIGO_MATRICULA:
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    ESTADO_MATRICULA:
    {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    FECHA_MATRICULA:
    {
        type: Sequelize.DATEONLY,
        allowNull: false
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
    ID_CURSO:
    {
        type: Sequelize.NUMBER,
        allowNull: false
    },

}, {
    timestamps: false,
    id: false

})

module.exports = Matricula;