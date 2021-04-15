'use strcit'

var bcrypt = require('bcrypt-nodejs');

var Administrador = require('../models/administrador');
var Periodo = require('../models/periodo');//importar el modelo del usuario  o lo que son las clases comunes
var jwt = require('../services/jwt');
var SubirNota = require('../models/subirNota');


async function saveAdministrador(req, res) {


    try {
        var params = req.body; // cuerpo de la peticion post de la direccion http por post
        // console.log(params);
        let administradorEncontrado = await Administrador.findOne({ where: { CORREO_ADMINISTRADOR: params.correo } });

        if (administradorEncontrado) {
            return res.status(402).send({
                message: "El Usuario ya Existe"
            });
        } else {
            let administrador = Administrador.build();
            administrador.CORREO_ADMINISTRADOR = params.correo;
            administrador.CONTRASENA_ADMINISTRADOR = params.contrasena;

            if (params.contrasena) {

                // encriptar contrasena y guardar datos
                await bcrypt.hash(params.contrasena, null, null, async function (err, hash) {

                    administrador.CONTRASENA_ADMINISTRADOR = hash;
                    let administradorGuardado = await administrador.save();
                    if (administradorGuardado) {
                        res.status(200).send({
                            message: 'Administrador guardado correctamente',
                            data: administradorGuardado
                        });
                    }
                });

            } else {
                res.status(500).send({
                    message: 'Introduce la contraseña'
                });
            }
        }
    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }

}


async function loginAdministrador(req, res) {


    try {
        var params = req.body;
        var correo = params.email;
        var password = params.password;


        let administrador = await Administrador.findOne({ where: { CORREO_ADMINISTRADOR: correo } });


        if (!administrador) {
            // console.log("error 404 el usuario no existe");
            res.status(402).send({
                message: 'El Usuario no existe.'
            });
        } else {
            //console.log(user);
            let result = bcrypt.compareSync(password, administrador.dataValues.CONTRASENA_ADMINISTRADOR);
            if (result) {
                if (params.getHash) {


                    res.status(200).send({
                        token: jwt.createTokenAdministrador(administrador)
                    });
                } else {
                    res.status(200).send({
                        administrador
                    });
                }

            } else {
                res.status(404).send({
                    message: 'Autencicación fallida usuario o contraseña incorrectos.'
                });

            }




        } //como el where en sql

    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }
}




async function savePeriodoLectivoActual(req, res) {

    try {
        var params = req.body;


        let periodoEncontrado = await Periodo.findOne();
        console.log(" periodo encontrado", periodoEncontrado);
        if (periodoEncontrado) {
            console.log(" esto es lo que voy a buscar de periodo", params);

            let periodoActualizado = await periodoEncontrado.update({ PERIODO: params.periodo });


            if (!periodoActualizado) {
                console.log("no se actualizo");
                res.status(404).send({ message: "El periodo no se ha actualizado" });
            } else {
                console.log("se guardo", periodoActualizado);
                res.status(200).send({ message: "El periodo se ha actualizado correctamente" });
            }




        }
    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }

}



async function getPeridoLectivoActual(req, res) {
    try {

        let periodo = await Periodo.findOne();
        console.log("periodo", periodo.dataValues.PERIODO);

        if (!periodo) {
            res.status(200).send({
                message: 'No se encuentra el periodo actual'
            });
        } else {

            res.status(200).send({
                periodo: periodo.dataValues.PERIODO
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }

}


async function getPeridos(req, res) {
    try {
        var periodo = await Periodo.findAll();


        if (!periodo) {
            return res.status(200).send({
                message: 'No tiene periodos'
            });
        } else {

            return res.status(200).send({
                periodo
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }

}

async function getSubirNotas(req, res) {                    // pendiente revisar si get subir notas vale con los docentes

    try {
        let subirnota = await SubirNota.findOne();


        if (!subirnota) {
            return res.status(200).send({
                message: 'No tiene los parametros'
            });
        } else {
            console.log(subirnota);
            return res.status(200).send({
                subirnota
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }
}

module.exports = {          // para exportar todas las funciones de este modulo

    saveAdministrador,
    loginAdministrador,
    savePeriodoLectivoActual,
    getPeridoLectivoActual,
    getPeridos,
    getSubirNotas



};