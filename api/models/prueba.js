const Sequelize = require('sequelize');
var db = require("../database/db.js");

const Prueba = db.sequelize.define('PRUEBA', {


    CAMPO_PRUEBA:
    {
        type: Sequelize.STRING,
        primaryKey: true

    },


},
    {
        timestamps: false,
        id: false
    })
module.exports = Prueba;