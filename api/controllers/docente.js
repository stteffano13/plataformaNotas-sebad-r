'use strcit'

var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');


var Docente = require('../models/docente'); //importar el modelo del usuario  o lo que son las clases comunes
var Materia = require('../models/materia'); //importar el modelo del usuario  o lo que son las clases comunes
var jwt = require('../services/jwt');

const { Op } = require("sequelize");


// Create a new moment object


// Create a moment in the past, using a string date


// Create a new moment using an array


async function saveDocente(req, res) {

    try {
        var count = 0;
        var docente = Docente.build();
        var params = req.body;
        let docenteEncontrado = await Docente.findOne({ where: { ESTADO_DOCENTE: 0, CORREO_DOCENTE: params.correo } });
        if (docenteEncontrado) {
            return res.status(500).send({
                message: "El Docente ya Existe, revise correo electronico"
            });
        } else {

            let array = await Docente.findAll();
            if (array) {
                array.forEach(element => {

                    count++
                });
                count++;
                docente.CODIGO_DOCENTE = "CODD" + count;
                docente.NOMBRE_DOCENTE = params.nombre.toUpperCase();
                docente.APELLIDO_DOCENTE = params.apellido.toUpperCase();
                docente.CORREO_DOCENTE = params.correo;
                docente.CONTRASENA_DOCENTE = params.contrasena;
                docente.CELULAR_DOCENTE = params.tel_celular;
                docente.CEDULA_DOCENTE = params.cedula;
                docente.ESTADO_DOCENTE = params.estado;

                if (params.contrasena) {

                    // encriptar contrasena y guardar datos
                    bcrypt.hash(params.contrasena, null, null, async function (err, hash) {

                        docente.CONTRASENA_DOCENTE = hash;
                        if (docente.NOMBRE_DOCENTE != null && docente.APELLIDO_DOCENTE != null && docente.CORREO_DOCENTE != null) {
                            //guardar usuario
                            let docenteGuardado = await docente.save();

                            if (!docenteGuardado) {
                                res.status(404).send({
                                    message: 'No se ha registrado el  docente'
                                });
                            } else {
                                res.status(200).send({
                                    message: 'El docente se ha registrado correctamente'
                                });

                            }

                        } else {
                            res.status(200).send({
                                message: 'Introduce la contraseña '
                            });
                        }
                    });

                } else {
                    res.status(500).send({
                        message: 'Introduce la contraseña'
                    });
                }
            }



        }
    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }


}


async function loginDocente(req, res) {

    try {
        var params = req.body;
        var correo = params.email;
        var password = params.password;
        console.log("hola tefo este es el servicio provando el hash");
        //console.log(params.getHash);


        let docente = await Docente.findOne({ where: { CORREO_DOCENTE: correo } });

        if (!docente) {
            // console.log("error 404 el usuario no existe");
            res.status(404).send({
                message: 'El Usuario no existe.'
            });
        } else {
            console.log(docente.dataValues);
            let result = await bcrypt.compareSync(password, docente.dataValues.CONTRASENA_DOCENTE);

            if (result) {
                if (params.getHash) {

                    res.status(200).send({
                        token: jwt.createTokenDocente(docente)
                    });
                } else {
                    res.status(200).send({
                        docente
                    });
                }

            } else {
                res.status(404).send({
                    message: 'Autencicación fallida usuario o contraseña incorrectos.'
                });

            }



        }

    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }
}


async function updateDocente(req, res) {

    try {
        var userId = req.params.id; // en este caso e sparametro de ruta es decir el id para todo lo demas req.body
        var update = req.body;
        console.log("paramewtros de update", update, "el id que viene", userId);



        if (update.estadoContrasena == '1') {
            //  console.log("entre para encriptar", update.estadoContrasena);
            // encriptar contrasena y guardar datos
            hash = true;
            await bcrypt.hash(update.contrasena, null, null, async function (err, hash) {
                update.CONTRASENA_DOCENTE = hash;
                //   console.log("contrasena nueva encriptada", update.contrasena);
                update.estadoContrasena == '';
                let docente = await Docente.findOne({ where: { ID_DOCENTE: userId } });
                let userUpdate = await docente.update({
                    NOMBRE_DOCENTE: update.NOMBRE_DOCENTE,
                    APELLIDO_DOCENTE: update.APELLIDO_DOCENTE,
                    CORREO_DOCENTE: update.CORREO_DOCENTE,
                    CONTRASENA_DOCENTE: update.CONTRASENA_DOCENTE,
                    CEDULA_DOCENTE: update.CEDULA_DOCENTE,
                    CELULAR_DOCENTE: update.CELULAR_DOCENTE,
                    ESTADO_DOCENTE: update.ESTADO_DOCENTE
                });

                if (!userUpdate) {
                    res.status(404).send({
                        message: "El docente no ha podido actualizarse."
                    });
                } else {
                    res.status(200).send({
                        user: userUpdate
                    });
                }

            });
        } else {
            update.estadoContrasena == '';

            if (update.estado == 1) {

                let materiasEncontradas = await Materia.findOne({ whuere: { ESTADO_MATERIA: 0, ID_DOCENTE: update.ID_DOCENTE } });


                if (materiasEncontradas) {
                    res.status(400).send({
                        message: "No eliminar, hay materias asignadas al docente"
                    });

                } else {

                    let docenteEncontrado = await Docente.findOne({ where: { ID_DOCENTE: userId } })
                    let docenteActualizado = await docenteEncontrado.update({
                        NOMBRE_DOCENTE: update.NOMBRE_DOCENTE,
                        APELLIDO_DOCENTE: update.APELLIDO_DOCENTE,
                        CORREO_DOCENTE: update.CORREO_DOCENTE,
                        CONTRASENA_DOCENTE: update.CONTRASENA_DOCENTE,
                        CEDULA_DOCENTE: update.CEDULA_DOCENTE,
                        CELULAR_DOCENTE: update.CELULAR_DOCENTE,
                        ESTADO_DOCENTE: update.ESTADO_DOCENTE
                    });

                    if (!docenteActualizado) {
                        res.status(404).send({
                            message: "El docente no ha podido actualizarse."
                        });
                    } else {
                        res.status(200).send({
                            user: docenteActualizado
                        });
                    }



                }




            } else {



                let docenteEncontrado = await Docente.findOne({ where: { ESTADO_DOCENTE: 0, CORREO_DOCENTE: update.CORREO_DOCENTE } });


                if (docenteEncontrado) {
                    if (docenteEncontrado.ID_DOCENTE != update.ID_DOCENTE) {
                        res.status(500).send({
                            message: "El correo que desea ingresar pertenece a otro Usuario"
                        });
                    } else {
                        let docenteActualizado = await docenteEncontrado.update({
                            NOMBRE_DOCENTE: update.NOMBRE_DOCENTE,
                            APELLIDO_DOCENTE: update.APELLIDO_DOCENTE,
                            CORREO_DOCENTE: update.CORREO_DOCENTE,
                            CONTRASENA_DOCENTE: update.CONTRASENA_DOCENTE,
                            CEDULA_DOCENTE: update.CEDULA_DOCENTE,
                            CELULAR_DOCENTE: update.CELULAR_DOCENTE,
                            ESTADO_DOCENTE: update.ESTADO_DOCENTE
                        });

                        if (!docenteActualizado) {
                            res.status(404).send({
                                message: "El docente no ha podido actualizarse."
                            });
                        } else {
                            res.status(200).send({
                                user: docenteActualizado
                            });
                        }

                    }

                } else {
                    let docente = await Docente.findOne({ where: { ID_DOCENTE: userId } });
                    let userUpdate = await docente.update({
                        NOMBRE_DOCENTE: update.NOMBRE_DOCENTE,
                        APELLIDO_DOCENTE: update.APELLIDO_DOCENTE,
                        CORREO_DOCENTE: update.CORREO_DOCENTE,
                        CONTRASENA_DOCENTE: update.CONTRASAENA_DOCENTE,
                        CEDULA_DOCENTE: update.CEDULA_DOCENTE,
                        CELULAR_DOCENTE: update.CELULAR_DOCENTE,
                        ESTADO_DOCENTE: update.ESTADO_DOCENTE
                    })

                    if (!userUpdate) {
                        res.status(404).send({
                            message: "El docente no ha podido actualizarse."
                        });
                    } else {
                        res.status(200).send({
                            user: userUpdate
                        });
                    }

                }

            }
        }
    }catch(err) {
        res.status(500).send({
            message: err.name
        });
    }

}





async function busquedaDocentes(req, res) {

    try {
        var busqueda = req.params.busqueda;

        if (!busqueda) {
            res.status(404).send({
                message: 'Ingrese un parametro de busqueda'
            });
        } else {
            let docentes = await Docente.findAll({
                where: {
                    [Op.and]: [{
                        ESTADO_DOCENTE: 0
                    },

                    {
                        [Op.or]: [{ NOMBRE_DOCENTE: { [Op.like]: busqueda + '%' } },
                        { APELLIDO_DOCENTE: { [Op.like]: busqueda + '%' } },
                        { CORREO_DOCENTE: { [Op.like]: busqueda + '%' } },
                        { CEDULA_DOCENTE: { [Op.like]: busqueda + '%' } },
                        { CODIGO_DOCENTE: { [Op.like]: busqueda + '%' } },

                        ]
                    }
                    ]
                }
            });

            if (!docentes) {
                res.status(404).send({
                    message: "No se encuentra resultados de la busqueda"
                });
            } else {
                res.status(200).send({
                    docentes
                });
            }

        }
    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }
}




async function getDocentes(req, res) {

try{
    let  listadoDocentes = await Docente.findAll();

        if (!listadoDocentes) {
            return res.status(200).send({
                message: 'No tiene Docentes'
            });
        }

        return res.status(200).send({
            listadoDocentes
        });
 
    }catch (err) {
        res.status(500).send({
            message: err.name
        });
    }
}

module.exports = {          // para exportar todas las funciones de este modulo

    saveDocente,
    loginDocente,
    busquedaDocentes,
    updateDocente,
    getDocentes



};