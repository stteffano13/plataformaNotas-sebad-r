'use stric'


const express = require('express');
const NotaController = require('../controllers/nota');
const md_auth = require('../middleware/authenticated');

const api = express.Router(); // esto sirve para crear las rutas 
api.post('/registerNota',md_auth.ensureAuth, NotaController.saveNotas);
api.post('/registerNotaB',md_auth.ensureAuth, NotaController.saveNotasB);
api.post('/buscarNotas',md_auth.ensureAuth, NotaController.buscarNotas);
api.post('/buscarNotasB',md_auth.ensureAuth, NotaController.buscarNotasB);
api.post('/buscarNotasEstudiante',md_auth.ensureAuth, NotaController.buscarNotasEstudiante);
api.post('/buscarNotasEstudianteB',md_auth.ensureAuth, NotaController.buscarNotasEstudianteB);
api.post('/buscarNotasMatris',md_auth.ensureAuth, NotaController.buscarNotasMatris);
api.post('/buscarNotasMatrisB',md_auth.ensureAuth, NotaController.buscarNotasMatrisB);

api.post('/subirNotas',md_auth.ensureAuth,NotaController.subirNotas);
module.exports = api;