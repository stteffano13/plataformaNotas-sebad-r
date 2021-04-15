const Sequelize = require('sequelize');
var db = require("../database/db.js");

const Matricula = require('../models/matricula');
const Materia = require('../models/materia');
const Curso = db.sequelize.define('CURSO', {

    ID_CURSO: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true
    },
    CODIGO_CURSO:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    CURSO:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    PARALELO:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    ESTADO_CURSO:
    {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    PERIODO:
    {
        type: Sequelize.STRING,
        allowNull: false
    },

}, {
    timestamps: false,
    id: false

})
Curso.hasMany(Materia, {foreignKey: 'ID_CURSO', sourceKey: 'ID_CURSO'});
Materia.belongsTo(Curso, {foreignKey: 'ID_CURSO', sourceKey: 'ID_CURSO'});


Curso.hasMany(Matricula, {foreignKey: 'ID_CURSO', sourceKey: 'ID_CURSO'});
Matricula.belongsTo(Curso, {foreignKey: 'ID_CURSO', sourceKey: 'ID_CURSO'});
module.exports = Curso;