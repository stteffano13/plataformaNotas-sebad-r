'use strcit'

var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

var Estudiante = require('../models/estudiante');
var Matricula = require('../models/matricula');
var jwt = require('../services/jwt');

const { Op } = require("sequelize");



async function saveEstudiante(req, res) {

    try {
        var estudiante = Estudiante.build();
        var params = req.body; // cuerpo de la peticion post de la direccion http por post
        var count = 0;
        // console.log(params);

        let estudianteEncontrado = await Estudiante.findOne({
            where: {
                [Op.and]: [{
                    ESTADO_ESTUDIANTE: 0
                },

                {
                    [Op.or]: [
                        { CORREO_ESTUDIANTE: params.correo },
                        { CEDULA_ESTUDIANTE: params.cedula },

                    ]
                }
                ]
            }
        })

        if (estudianteEncontrado) {
            return res.status(500).send({
                message: "El estudiante ya existe, revise  cédula y correo electronico"
            });
        } else {

            var array = await Estudiante.findAll()

            if (array) {
                array.forEach(element => {
                    console.log("numero de regsitros", count);
                    count++
                });
                count = count + 1;
                estudiante.CODIGO_ESTUDIANTE = "CODE" + count;
                estudiante.NOMBRE_ESTUDIANTE = params.nombre.toUpperCase();;
                estudiante.APELLIDO_ESTUDIANTE = params.apellido.toUpperCase();;
                estudiante.CORREO_ESTUDIANTE = params.correo;
                estudiante.CONTRASENA_ESTUDIANTE = params.contrasena;
                estudiante.CELULAR_ESTUDIANTE = params.tel_celular;
                estudiante.CEDULA_ESTUDIANTE = params.cedula;
                estudiante.ESTADO_ESTUDIANTE = params.estado;

                if (params.contrasena) {

                    // encriptar contrasena y guardar datos
                    bcrypt.hash(params.contrasena, null, null, async function (err, hash) {

                        estudiante.CONTRASENA_ESTUDIANTE = hash;
                        if (estudiante.NOMBRE_ESTUDIANTE != null && estudiante.APELLIDO_ESTUDIANTE != null && estudiante.CORREO_ESTUDIANTE != null && estudiante.CEDULA_ESTUDIANTE != null) {
                            let estudianteGuardado = await estudiante.save();

                            if (!estudianteGuardado) {
                                res.status(404).send({
                                    message: 'No se ha registrado el  estudiante'
                                });
                            } else {
                                res.status(200).send({
                                    message: 'El estudiante se ha registrado correctamente'
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

async function loginEstudiante(req, res) {

    try {
        var params = req.body;

        var correo = params.email;
        var password = params.password;
        console.log("hola tefo este es el servicio provando el hash");
        //console.log(params.getHash);
        let estudiante = await Estudiante.findOne({ where: { CORREO_ESTUDIANTE: correo, ESTADO_ESTUDIANTE: 0 } })

        if (!estudiante) {
            // console.log("error 404 el usuario no existe");
            res.status(404).send({
                message: 'El estudiante no existe.'
            });
        } else {
            //console.log(user);
            let result = await bcrypt.compareSync(password, estudiante.dataValues.CONTRASENA_ESTUDIANTE)

            if (result) {
                if (params.getHash) {
                    res.status(200).send({
                        token: jwt.createTokenEstudiante(estudiante)
                    });
                } else {
                    res.status(200).send({
                        estudiante
                    });
                }

            } else {
                res.status(404).send({
                    message: 'El estudiante no ha podido Autenticarse.'
                });
            }

        }

    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }

}


async function busquedaEstudiantes(req, res) {

    try {
        var busqueda = req.params.busqueda;
        //console.log(busqueda);
        if (!busqueda) {
            res.status(404).send({
                message: 'Ingrese un parametro de busqueda'
            });
        } else {
            let estudiantes = await Estudiante.findAll({
                where: {
                    [Op.and]: [{
                        ESTADO_ESTUDIANTE: 0
                    },

                    {
                        [Op.or]: [{ NOMBRE_ESTUDIANTE: { [Op.like]: busqueda + '%' } },
                        { APELLIDO_ESTUDIANTE: { [Op.like]: busqueda + '%' } },
                        { CORREO_ESTUDIANTE: { [Op.like]: busqueda + '%' } },
                        { CEDULA_ESTUDIANTE: { [Op.like]: busqueda + '%' } },
                        { CODIGO_ESTUDIANTE: { [Op.like]: busqueda + '%' } },

                        ]
                    }
                    ]
                }
            });

            if (!estudiantes) {
                res.status(404).send({
                    message: "No se encuentra resultados de la busqueda"
                });
            } else {
                res.status(200).send({
                    estudiantes
                });
            }

        }
    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }
}


async function updateEstudiante(req, res) {
    try {

        var userId = req.params.id; // en este caso e sparametro de ruta es decir el id para todo lo demas req.body
        var update = req.body;


        if (update.estadoContrasena == '1') {
            //  console.log("entre para encriptar", update.estadoContrasena);
            // encriptar contrasena y guardar datos
            hash = true;
            await bcrypt.hash(update.contrasena, null, null, async function (err, hash) {
                update.CONTRASENA_ESTUDIANTE = hash;
                //   console.log("contrasena nueva encriptada", update.contrasena);
                update.estadoContrasena == '';

                let estudiante = await Estudiante.findOne({ where: { ID_ESTUDIANTE: userId } });
                let userUpdate = await estudiante.update({
                    NOMBRE_ESTUDIANTE: update.NOMBRE_ESTUDIANTE,
                    APELLIDO_ESTUDIANTE: update.APELLIDO_ESTUDIANTE,
                    CORREO_ESTUDIANTE: update.CORREO_ESTUDIANTE,
                    CONTRASENA_ESTUDIANTE: update.CONTRASENA_ESTUDIANTE,
                    CEDULA_ESTUDIANTE: update.CEDULA_ESTUDIANTE,
                    CELULAR_ESTUDIANTE: update.CELULAR_ESTUDIANTE,
                    ESTADO_ESTUDIANTE: update.ESTADO_ESTUDIANTE
                });

                if (!userUpdate) {
                    res.status(404).send({
                        message: "El estudiante no ha podido actualizarse."
                    });
                } else {
                    res.status(200).send({
                        message: "El estudiante se actualizado."
                    });
                }

            });
        } else {
            update.estadoContrasena == '';

            if (update.estado == 1) {
                let matriculaEncontrada = await Matricula.findOne({
                    where: { ESTADO_MATRICULA: 0, ID_ESTUDIANTE: update.ID_ESTUDIANTE }
                })
                if (matriculaEncontrada) {
                    res.status(400).send({
                        message: "No eliminar, hay matriculas asignadas al estudiante"
                    });

                } else {

                    let estudianteEncontrado = await Estudiante.findOne({ where: { ID_ESTUDIANTE: userId } })
                    let estudianteActualizado = await estudianteEncontrado.update({
                        NOMBRE_ESTUDIANTE: update.NOMBRE_ESTUDIANTE,
                        APELLIDO_ESTUDIANTE: update.APELLIDO_ESTUDIANTE,
                        CORREO_ESTUDIANTE: update.CORREO_ESTUDIANTE,
                        CONTRASENA_ESTUDIANTE: update.CONTRASENA_ESTUDIANTE,
                        CEDULA_ESTUDIANTE: update.CEDULA_ESTUDIANTE,
                        CELULAR_ESTUDIANTE: update.CELULAR_ESTUDIANTE,
                        ESTADO_ESTUDIANTE: update.ESTADO_ESTUDIANTE
                    });
                    if (!estudianteActualizado) {
                        res.status(404).send({
                            message: "El estudiante no ha podido actualizarse."
                        });
                    } else {
                        res.status(200).send({
                            message: "El estudiante se ha actualizado correctamente."
                        });
                    }

                }

            } else {
                let estudianteEncontrado = await Estudiante.findOne({ where: { ESTADO_ESTUDIANTE: 0, CORREO_ESTUDIANTE: update.CORREO_ESTUDIANTE } });

                if (estudianteEncontrado) {
                    if (estudianteEncontrado.ID_ESTUDIANTE != update.ID_ESTUDIANTE) {
                        res.status(500).send({
                            message: "El correo que desea ingresar pertenece a otro estudiante"
                        });
                    } else {

                        let estudianteActualizado = await estudianteEncontrado.update({
                            NOMBRE_ESTUDIANTE: update.NOMBRE_ESTUDIANTE,
                            APELLIDO_ESTUDIANTE: update.APELLIDO_ESTUDIANTE,
                            CORREO_ESTUDIANTE: update.CORREO_ESTUDIANTE,
                            CONTRASENA_ESTUDIANTE: update.CONTRASENA_ESTUDIANTE,
                            CEDULA_ESTUDIANTE: update.CEDULA_ESTUDIANTE,
                            CELULAR_ESTUDIANTE: update.CELULAR_ESTUDIANTE,
                            ESTADO_ESTUDIANTE: update.ESTADO_ESTUDIANTE
                        });

                        if (!estudianteActualizado) {
                            res.status(404).send({
                                message: "El estudiante no ha podido actualizarse."
                            });
                        } else {
                            res.status(200).send({
                                message: "El estudiante se actualizado correctamente."
                            });
                        }

                    }

                } else {

                    let estudiante = await Estudiante.findOne({ where: { ID_ESTUDIANTE: userId } })
                    let userUpdate = await estudiante.update({
                        NOMBRE_ESTUDIANTE: update.NOMBRE_ESTUDIANTE,
                        APELLIDO_ESTUDIANTE: update.APELLIDO_ESTUDIANTE,
                        CORREO_ESTUDIANTE: update.CORREO_ESTUDIANTE,
                        CONTRASENA_ESTUDIANTE: update.CONTRASENA_ESTUDIANTE,
                        CEDULA_ESTUDIANTE: update.CEDULA_ESTUDIANTE,
                        CELULAR_ESTUDIANTE: update.CELULAR_ESTUDIANTE,
                        ESTADO_ESTUDIANTE: update.ESTADO_ESTUDIANTE
                    });

                    if (!userUpdate) {
                        res.status(404).send({
                            message: "El estudiante no ha podido actualizarse."
                        });
                    } else {
                        res.status(200).send({
                            message: "El estudiante se actualizado correctamente."
                        });
                    }

                }

            }

        }
    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }


}


async function getEstudiantes(req, res) {


    try {

        let listadoEstudiantes = await Estudiante.findAll();


        if (!listadoEstudiantes) {
            return res.status(200).send({
                message: 'No tiene Estudiantes'
            });
        }

        return res.status(200).send({
            listadoEstudiantes
        });
    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }

}




module.exports = {          // para exportar todas las funciones de este modulo

    saveEstudiante,
    loginEstudiante,
    busquedaEstudiantes,
    updateEstudiante,
    getEstudiantes




};
