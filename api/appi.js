'Use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();


//Notificaciones

//cargar Rutas

var ruta_prueba = require('./routes/prueba');

var administrador_rutes = require('./routes/administrador');
var curso_rutes = require('./routes/curso');
var docente_rutes = require('./routes/docente');
var estudiante_rutes = require('./routes/estudiante');
var matricula_rutes = require('./routes/matricula');
var materia_rutes = require('./routes/materia');
var insumo_rutes = require('./routes/insumo');
var nota_rutes = require('./routes/nota');
/*






*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //convertir a json als peticiones

//configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

// rutas base

app.use('/api', ruta_prueba);

app.use('/api', administrador_rutes);
app.use('/api', curso_rutes);
app.use('/api', docente_rutes);
app.use('/api', estudiante_rutes);
app.use('/api', matricula_rutes);
app.use('/api', materia_rutes);
app.use('/api', insumo_rutes);
app.use('/api', nota_rutes);
/*






*/
module.exports = app; // hace referencia a la variable de express

