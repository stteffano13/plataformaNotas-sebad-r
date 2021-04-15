'use strict'
var jwt = require('jwt-simple');
var moment = require('moment'); // ayuda a que se regisrtere feha de inicio y de expiracion de la creacion del token 
var secret = 'clave_secreta_curso';

exports.createTokenAdministrador = function (user) {
    var payload = {

        sub: user.ID_ADMINSITRADOR,// para guardar el id del objeto usuario  -----leer esto esta diciendo que nomas va en el hash codificado
        email: user.CORREO_ADMINISTRADOR,
        role: user.role,
        image: user.image,
        iat: moment().unix(), // fechar creacion del token
        exp: moment().add(200, 'days').unix
    }

    return jwt.encode(payload, secret)
}

exports.createTokenDocente = function (user) {
    var payload = {

        sub: user.ID_DOCENTE,// para guardar el id del objeto usuario  -----leer esto esta diciendo que nomas va en el hash codificado
        mane: user.NOMBRE_DOCENTE,
        surname: user.APELLIDO_DOCENTE,
        email: user.CORREO_DOCENTE,
        role: user.role,
        image: user.image,
        iat: moment().unix(), // fechar creacion del token
        exp: moment().add(200, 'days').unix
    }

    return jwt.encode(payload, secret)
}


exports.createTokenEstudiante = function (user) {
    var payload = {

        sub: user.ID_ESTUDIANTE,// para guardar el id del objeto usuario  -----leer esto esta diciendo que nomas va en el hash codificado
        mane: user.NOMBRE_ESTUDIANTE,
        surname: user.APELLIDO_ESTUDIANTE,
        email: user.CORREO_ESTUDIANTE,
        role: user.role,
        image: user.image,
        iat: moment().unix(), // fechar creacion del token
        exp: moment().add(200, 'days').unix
    }

    return jwt.encode(payload, secret)
}