const Sequelize = require('sequelize');
var db = require("../database/db.js");



const Administrador = db.sequelize.define('ADMINISTRADOR', {

    ID_ADMINISTRADOR: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true
    },
    CORREO_ADMINISTRADOR:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    CONTRASENA_ADMINISTRADOR:
    {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    id: false

})

module.exports = Administrador;