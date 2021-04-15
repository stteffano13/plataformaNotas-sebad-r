const Sequelize = require('sequelize');
var db = require("../database/db.js");

const Nota = require('../models/nota');
const NotaB = require('../models/notaB');
const Matricula = require('../models/matricula');

const Estudiante = db.sequelize.define('ESTUDIANTE', {

    ID_ESTUDIANTE: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true
    },
    CODIGO_ESTUDIANTE:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    NOMBRE_ESTUDIANTE:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    APELLIDO_ESTUDIANTE:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    CORREO_ESTUDIANTE:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    CONTRASENA_ESTUDIANTE:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    CEDULA_ESTUDIANTE:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    CELULAR_ESTUDIANTE:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    ESTADO_ESTUDIANTE:
    {
        type: Sequelize.NUMBER,
        allowNull: false
    }

}, {
    timestamps: false,
    id: false

})

Estudiante.hasMany(Nota,{foreignKey: 'ID_ESTUDIANTE', sourceKey: 'ID_ESTUDIANTE'});
Nota.belongsTo(Estudiante,{foreignKey: 'ID_ESTUDIANTE', sourceKey: 'ID_ESTUDIANTE'});

Estudiante.hasMany(NotaB,{foreignKey: 'ID_ESTUDIANTE', sourceKey: 'ID_ESTUDIANTE'});
NotaB.belongsTo(Estudiante,{foreignKey: 'ID_ESTUDIANTE', sourceKey: 'ID_ESTUDIANTE'});

Estudiante.hasMany(Matricula,{foreignKey: 'ID_ESTUDIANTE', sourceKey: 'ID_ESTUDIANTE'});
Matricula.belongsTo(Estudiante,{foreignKey: 'ID_ESTUDIANTE', sourceKey: 'ID_ESTUDIANTE'});

module.exports = Estudiante;