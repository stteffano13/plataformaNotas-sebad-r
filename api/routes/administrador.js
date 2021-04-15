'use stric'


const express = require('express');
const AdministradorController = require('../controllers/administrador');
const md_auth = require('../middleware/authenticated');

const api = express.Router(); // esto sirve para crear las rutas 
api.post('/registerAdministrador', AdministradorController.saveAdministrador);
api.post('/loginAdministrador', AdministradorController.loginAdministrador);
api.post('/registerPeriodoActual', AdministradorController.savePeriodoLectivoActual);
api.get('/getPeriodoActual', AdministradorController.getPeridoLectivoActual);
api.get('/getPeriodos', AdministradorController.getPeridos);
api.get('/getSubirNotas', AdministradorController.getSubirNotas);
module.exports = api;// exportamos el router de express para que las routas funcionen por todo el back end