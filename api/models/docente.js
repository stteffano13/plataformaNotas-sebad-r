const Sequelize = require('sequelize');
var db = require("../database/db.js");

const Materia = require('../models/materia');

const Docente = db.sequelize.define('DOCENTE', {

    ID_DOCENTE: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true
    },
    CODIGO_DOCENTE:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    NOMBRE_DOCENTE:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    APELLIDO_DOCENTE:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    CORREO_DOCENTE:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    CONTRASENA_DOCENTE:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    CEDULA_DOCENTE:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    CELULAR_DOCENTE:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    ESTADO_DOCENTE:
    {
        type: Sequelize.NUMBER,
        allowNull: false
    }

}, {
    timestamps: false,
    id: false

})

Docente.hasMany(Materia,{foreignKey: 'ID_DOCENTE', sourceKey: 'ID_DOCENTE'});
Materia.belongsTo(Docente,{foreignKey: 'ID_DOCENTE', sourceKey: 'ID_DOCENTE'});
module.exports = Docente;