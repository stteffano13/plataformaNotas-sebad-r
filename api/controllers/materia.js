'use strcit'

var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');
var Materia = require('../models/materia');
var Docente = require('../models/docente');
var Curso = require('../models/curso'); //importar el modelo del usuario  o lo que son las clases comunes
var Periodo = require('../models/periodo'); //importar el modelo del usuario  o lo que son las clases comunes
var jwt = require('../services/jwt');


// Create a new moment object
var now = moment();

// Create a moment in the past, using a string date
var m = moment("April 1st, 2005", "MMM-DD-YYYY");

// Create a new moment using an array
var m = moment([2005, 3, 1]);


async function saveAsignacion(req, res) {
    try {
        var params = req.body;

        let docente = await Docente.findOne({ where: { CODIGO_DOCENTE: params.codigoD } });

        if (docente) {

            guardarPrimero(docente, params, res);


        } else {

            return res.status(500).send({
                message: "El Docente no Existe"
            });

        }

    } catch (err) {
        res.status(500).send({
            message: 'error:' + err
        });
    }


}

async function guardarPrimero(docente, params, res) {

    try {
        let curso = await Curso.findOne({ where: { CODIGO_CURSO: params.codigoC } });

        if (curso) {

            guardarSegundo(docente, curso, params, res);


        } else {

            return res.status(500).send({
                message: "El Curso no Existe"
            });

        }

    } catch (err) {
        res.status(500).send({
            message: 'error:' + err
        });
    }


}



async function guardarSegundo(idD, idC, params, res) {
    try {
        var count = 0;
        var fecha = now.format('MM-DD-YYYY');
        console.log(idD.ID_DOCENTE, idC.ID_CURSO);

        materia = Materia.build();

        //
        let materiaEncontrada = await Materia.findOne({ where: { ESTADO_MATERIA: 0, ID_DOCENTE: idD.ID_DOCENTE, ID_CURSO: idC.ID_CURSO, NOMBRE_MATERIA: params.nombre, PERIODO: params.periodo } });


        if (materiaEncontrada) {
            return res.status(500).send({
                message: "El docente ya fue asignado esta materia"
            });
        } else {

            let array = await Materia.findAll();

            if (array) {

                array.forEach(element => {
                    console.log("numero de regsitros", count);
                    count++
                });

                //
                count++;
                materia.NOMBRE_MATERIA = params.nombre;
                materia.CODIGO_MATERIA = "CODM" + count;
                materia.ID_DOCENTE = idD.ID_DOCENTE;
                materia.ID_CURSO = idC.ID_CURSO;
                materia.PERIODO = params.periodo;
                materia.ESTADO_MATERIA = params.estado;


                if (idD.ID_DOCENTE && idC.ID_CURSO) {

                    let userStored = await materia.save();
                    if (!userStored) {
                        res.status(404).send({
                            message: 'No se ha generado la asignacion'
                        });
                    } else {
                        res.status(200).send({
                            message: 'La asignacion se ha generado correctamente'
                        });

                    }

                } else {
                    res.status(500).send({
                        message: 'No han llegado todos los datos'
                    });
                }
                //
            }


        }
    } catch (err) {
        res.status(500).send({
            message: 'error:' + err
        });
    }
}



async function busquedaMateria(req, res) {

    try {
        var busqueda = req.params.busqueda;
        console.log(busqueda);
        if (!busqueda) {
            res.status(404).send({
                message: 'Ingrese un parametro de busqueda'
            });
        } else {
            let materias = await Materia.findAll({ where: { ESTADO_MATERIA: 0 }, include: [{ model: Docente }, { model: Curso }] })  /// AUNMENTAR EL PERIODO


            if (!materias) {
                return res.status(200).send({
                    message: 'No tiene materias'
                });
            }

            return res.status(200).send({
                materias
            });

        }

    } catch (err) {
        res.status(500).send({
            message: 'error:' + err
        });
    }
}


async function getListadoMioMaterias(req, res) {

    try {
        var busqueda = req.user.sub;

        console.log("sub", busqueda);
        if (!busqueda) {
            res.status(404).send({
                message: 'Ingrese un parametro de busqueda'
            });
        } else {

            let periodo = await Periodo.findOne();

            if (!periodo) {
                return res.status(200).send({
                    message: 'No tiene Periodos'
                });
            } else {
                let materias = await Materia.findAll({ where: { ESTADO_MATERIA: 0, ID_DOCENTE: busqueda, PERIODO: periodo.dataValues.PERIODO }, include: [{ model: Curso }] })  /// AUNMENTAR EL PERIODO

                if (!materias) {
                    return res.status(200).send({
                        message: 'No tiene Materias'
                    });
                } else {

                    return res.status(200).send({

                        materias


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




async function updateMateria(req, res) {

    try {
        var update = req.body;
        var messageId = req.params.id;  // en este caso e sparametro de ruta es decir el id para todo lo demas req.body


        var update = req.body;

        let materiaUpdate = await Materia.update({ ESTADO_MATERIA: update.estado }, { where: { ID_MATERIA: messageId } });

        if (!materiaUpdate) {
            res.status(404).send({ message: "La materia no se ha actualizado" });
        } else {
            res.status(200).send({ message: "La materia se ha actualizado correctamente" });
        }


    } catch (err) {
        res.status(500).send({
            message: 'error:' + err
        });
    }
}




async function getListadoMateriasCurso(req, res) {


    try {
        var busqueda = req.params.curso;

        console.log("p[or buscar", busqueda);
        if (!busqueda) {
            res.status(404).send({
                message: 'Ingrese un parametro de busqueda'
            });
        } else {

            let periodo = await Periodo.findOne();

            if (!periodo) {
                return res.status(200).send({
                    message: 'No tiene periodos'
                });
            } else {


                let materias = await Materia.findAll({ where: { ID_CURSO: busqueda, ESTADO_MATERIA: 0, PERIODO: periodo.PERIODO }, include: [{ model: Curso }] });  /// AUNMENTAR EL PERIODO
                console.log("materias traidas para el repiasorte final", materias);
                if (materias.lenght) {
                    console.log("comprobando si entra si lengh es cero");
                    return res.status(200).send({
                        message: 'No tiene Materias'
                    });
                } else {
                    return res.status(200).send({
                        materias

                    });
                }

            }

        }
    } catch (err) {
        res.status(500).send({
            message: 'error:' + err
        });
    }





}
module.exports = {          // para exportar todas las funciones de este modulo

    saveAsignacion,
    busquedaMateria,
    updateMateria,
    getListadoMioMaterias,
    getListadoMateriasCurso

};