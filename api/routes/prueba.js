'use stric'

const express = require('express');
const PruebaController = require('../controllers/prueba');
const api = express.Router(); // esto sirve para crear las rutas
api.post('/prueba', PruebaController.saveprueba);



module.exports = api;// exportamos el router de express para que las routas funcionen por todo el back end
