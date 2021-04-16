const Sequelize = require('sequelize');
var db = require("../database/db.js");



const Nota = db.sequelize.define('NOTA', {
   
    ID_NOTA: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true
    },
   ASISTENCIA1:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    ASISTENCIA2:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    ASISTENCIA2:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    ASISTENCIA3:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    ASISTENCIA4:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    ASISTENCIA5:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    ASISTENCIA6:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    ASISTENCIA7:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    ASISTENCIA8:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    PROMEDIOASISTENCIA:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
   TAREA1:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    TAREA2:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    TAREA3:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    TAREA4:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    PROYECTO1:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    EXAMEN1:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    TAREA11:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    TAREA22:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    TAREA33:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    TAREA44:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    PROYECTO2:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
   EXAMEN2:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    PT:
    {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    ESTADO_NOTAS:
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