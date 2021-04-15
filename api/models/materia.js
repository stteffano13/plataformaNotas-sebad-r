const Sequelize = require('sequelize');
var db = require("../database/db.js");
const Insumo = require('../models/insumo');
const InsumoB = require('../models/insumoB');

const Nota = require('../models/nota');
const NotaB = require('../models/notaB');

const Materia = db.sequelize.define('MATERIA', {

    ID_MATERIA: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true
    },
    CODIGO_MATERIA:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    NOMBRE_MATERIA:
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    ESTADO_MATERIA:
    {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    PERIODO:
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    ID_DOCENTE:
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
Materia.hasMany(Insumo, {foreignKey: 'ID_MATERIA', sourceKey: 'ID_MATERIA'});
Insumo.belongsTo(Materia, {foreignKey: 'ID_MATERIA', sourceKey: 'ID_MATERIA'});

Materia.hasMany(InsumoB, {foreignKey: 'ID_MATERIA', sourceKey: 'ID_MATERIA'});
InsumoB.belongsTo(Materia, {foreignKey: 'ID_MATERIA', sourceKey: 'ID_MATERIA'});

Materia.hasMany(Nota, {foreignKey: 'ID_MATERIA', sourceKey: 'ID_MATERIA'});
Nota.belongsTo(Materia, {foreignKey: 'ID_MATERIA', sourceKey: 'ID_MATERIA'});

Materia.hasMany(NotaB, {foreignKey: 'ID_MATERIA', sourceKey: 'ID_MATERIA'});
NotaB.belongsTo(Materia, {foreignKey: 'ID_MATERIA', sourceKey: 'ID_MATERIA'});
module.exports = Materia;