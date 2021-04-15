const Sequelize = require('sequelize');
var db = require("../database/db.js");



const Periodo = db.sequelize.define('PERIODO', {

    ID_PERIODO: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true
    },
    PERIODO:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    
},{
    timestamps: false,
    id: false

})

module.exports = Periodo;