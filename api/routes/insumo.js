'use stric'


const express = require('express');
const InsumoController = require('../controllers/insumo');
const md_auth = require('../middleware/authenticated');

const api = express.Router(); // esto sirve para crear las rutas 
api.post('/registerInsumo',md_auth.ensureAuth, InsumoController.saveInsumos);
api.post('/getDiscInsumo',md_auth.ensureAuth, InsumoController.getDiscInsumo);
api.post('/registerInsumoB',md_auth.ensureAuth, InsumoController.saveInsumosB);
api.post('/getDiscInsumoB',md_auth.ensureAuth, InsumoController.getDiscInsumoB);

module.exports = api;