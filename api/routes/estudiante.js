'use stric'


const express = require('express');
const EstudianteController = require('../controllers/estudiante');
const md_auth = require('../middleware/authenticated');

const api = express.Router(); // esto sirve para crear las rutas 
api.post('/registerEstudiante',EstudianteController.saveEstudiante);
api.post('/loginEstudiante', EstudianteController.loginEstudiante);
api.get('/buscarEstudiantes/:busqueda', md_auth.ensureAuth, EstudianteController.busquedaEstudiantes);
api.put('/update-estudiante/:id', md_auth.ensureAuth, EstudianteController.updateEstudiante);
api.get('/getListadoEstudiantes',md_auth.ensureAuth, EstudianteController.getEstudiantes);
//pruebas


module.exports = api;// exportamos el router de express para que las routas funcionen por todo el back end