const Sequelize = require('sequelize');
var db = require("../database/db.js");



const SubirNota = db.sequelize.define('SUBIRNOTA', {

    ID_SUBIRNOTA: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true
    },
    ESTADO_SUBIRNOTA:
    {
        type: Sequelize.NUMBER,
        allowNull: false
    },


},
{
    timestamps: false,
    id: false
})

module.exports = SubirNota;