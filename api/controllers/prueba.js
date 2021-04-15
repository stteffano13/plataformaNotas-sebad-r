'use strict'


const PRUEBA = require('../models/prueba'); //importar el modelo del usuario  o lo que son las clases comunesvar DPA = require('../models/dpa'); //importar el modelo del usuario  o lo que son las clases comunes



async function saveprueba(req, res) {
    try {
        
            let prueba = PRUEBA.build();
           
            prueba.CAMPO_PRUEBA = req.body.Campo_Prueba;
            
            let pruebaGuardado = await prueba.save();
            console.log(pruebaGuardado.dataValues.CAMPO_PRUEBA,'guardado');
            if (pruebaGuardado) {
                res.status(200).send({
                    message: 'Prueba guardada correctamente',  
                    data: pruebaGuardado
                });
            } else {
                res.status(500).send({
                    message: 'No se ha podido registrar sus datos intenta nuevamente'
                });
        }
    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }
}
module.exports = {          // para exportar todas las funciones de este modulo
    saveprueba
};
