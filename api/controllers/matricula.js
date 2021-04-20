'use strcit'

var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');
var Matricula = require('../models/matricula');
var Materia = require('../models/materia');
var Estudiante = require('../models/estudiante');
var Curso = require('../models/curso'); //importar el modelo del usuario  o lo que son las clases comunes
var Periodo = require('../models/periodo'); //importar el modelo del usuario  o lo que son las clases comunes
var jwt = require('../services/jwt');
var path = require('path');
var fs = require('fs');
const { Console } = require('console');


// Create a new moment object
var now = moment();

// Create a moment in the past, using a string date
var m = moment("April 1st, 2005", "MMM-DD-YYYY");

// Create a new moment using an array
var m = moment([2005, 3, 1]);


async function saveMatricula(req, res) {

    try {
        var params = req.body;
        console.log("esto viene para amtricular", params);

        let estudiante = await Estudiante.findOne({ where: { CODIGO_ESTUDIANTE: params.codigoE } });

        if (estudiante) {

            guardarPrimero(estudiante, params, res);


        } else {

            return res.status(500).send({
                message: "El estudiante no Existe"
            });

        }

    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }


}

async function guardarPrimero(estudiante, params, res) {

    try {
        let curso = await Curso.findOne({ where: { CODIGO_CURSO: params.codigoC } });

        if (curso) {

            guardarSegundo(estudiante, curso, params, res);


        } else {

            return res.status(500).send({
                message: "El Curso no Existe"
            });

        }

    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }


}


async function guardarSegundo(idE, idC, params, res) {

    try {
        var count = 0;
        var fecha = now.format('YYYY-MM-DD');
        console.log(idE.ID_ESTUDIANTE, idC.ID_CURSO);

        let matricula = Matricula.build();
        //
        let matriculaEncontrada = await Matricula.findOne({
            where: { ESTADO_MATRICULA: 0, ID_ESTUDIANTE: idE.ID_ESTUDIANTE, PERIODO: params.periodo }
        })

     

            let array = await Matricula.findAll();

            if (array) {

                array.forEach(element => {

                    count++
                });
                count++;
                console.log("fecha", fecha);
                matricula.CODIGO_MATRICULA = "CODMT" + count;
                matricula.ID_ESTUDIANTE = idE.ID_ESTUDIANTE;
                matricula.ID_CURSO = idC.ID_CURSO;
                matricula.PERIODO = params.periodo;
                matricula.FECHA_MATRICULA = fecha;
                matricula.ESTADO_MATRICULA = params.estado;
                console.log("Matricula", matricula);

                if (idC.ID_CURSO && idE.ID_ESTUDIANTE) {

                    let matriculaGuardada = await matricula.save();

                    if (!matriculaGuardada) {
                        res.status(404).send({
                            message: 'No se ha generado la matricula'
                        });
                    } else {
                        res.status(200).send({
                            message: 'La matricula se ha generado correctamente'
                        });
                    }

                } else {
                    res.status(500).send({
                        message: 'No han llegado todos los datos'
                    });
                }
                //
            }


   

    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }
    //



}


async function busquedaMatriculas(req, res) {

    try {
        var busqueda = req.params.busqueda;
        console.log("parametros busqueda", busqueda);
        if (busqueda == undefined) {
            res.status(404).send({
                message: 'Ingrese un parametro de busqueda'
            });
        } else {

            let busqueda2 = busqueda.split('.');
            let bsuquedaEstudiante = await Estudiante.findOne({ where: { CODIGO_ESTUDIANTE: busqueda2[0] } });

            let matriculas = await Matricula.findAll({ where: { ESTADO_MATRICULA: 0, ID_ESTUDIANTE: bsuquedaEstudiante.dataValues.ID_ESTUDIANTE }, include: [{ model: Estudiante }, { model: Curso }] })  /// AUNMENTAR EL PERIODO

            console.log("matriculas", matriculas)

            if (!matriculas) {
                return res.status(200).send({
                    message: 'No tiene matriculas'
                });
            }

            return res.status(200).send({
                matriculas
            });

        }
    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }
}




async function updateMatricula(req, res) {

    try {
        var update = req.body;
        var messageId = req.params.id;  // en este caso e sparametro de ruta es decir el id para todo lo demas req.body

        console.log("antes de eliminar matricula", messageId);

        var update = req.body;

        let matriculaEncontrada = await Matricula.findOne({ where: { ID_MATRICULA: messageId } });
        let matriculaUpdate = await matriculaEncontrada.update({ ESTADO_MATRICULA: update.estado });

        if (!matriculaUpdate) {
            res.status(404).send({ message: "La matricula no se ha actualizado" });
        } else {
            res.status(200).send({ message: "La matricula se ha actualizado correctamente" });
        }

    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }

}



async function getEstudiantesMatriculas(req, res) {

    try {
        var busqueda = req.params.busqueda;

        if (!busqueda) {
            res.status(404).send({
                message: 'Ingrese un parametro de busqueda'
            });
        } else {


            var periodo = await Periodo.findOne();

            if (!periodo) {
                return res.status(200).send({
                    message: 'No tiene periodos'
                });
            } else {


                let matriculas = await Matricula.findAll({ where: { ESTADO_MATRICULA: 0, ID_CURSO: busqueda, PERIODO: periodo.dataValues.PERIODO }, include: [{ model: Estudiante }, { model: Curso }] })
                console.log("matriculas", matriculas)

                if (!matriculas) {
                    return res.status(200).send({
                        message: 'No tiene matriculas'
                    });
                }

                return res.status(200).send({
                    matriculas
                });






            }

        }
    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }
}



async function getlistadoMateriasE(req, res) {

    try {
        console.log("entre a materias estudiante", req.user.sub);
        var busqueda = req.user.sub;
        console.log(busqueda);
        if (!busqueda) {
            res.status(404).send({
                message: 'Ingrese un parametro de busqueda'
            });
        } else {


            //////////////////////

            var periodo = await Periodo.findOne();

            if (!periodo) {
                return res.status(200).send({
                    message: 'No tiene periodos'
                });
            } else {
                let matriculas = await Matricula.findAll({ where: { ID_ESTUDIANTE: busqueda, ESTADO_MATRICULA: 0, PERIODO: periodo.dataValues.PERIODO }, include: [{ model: Estudiante }, { model: Curso }] });
                if (!matriculas) {
                    return res.status(200).send({
                        message: 'No tiene viajes'
                    });
                }
                console.log("response curso", matriculas[0].CURSO.ID_CURSO);
                getListadoMioMateriasE(req, res, matriculas[0].CURSO.ID_CURSO)
            }
        }

    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }
}


async function getListadoMioMateriasE(req, res, busquedaE) {

    try {
        var busqueda = busquedaE;

        console.log(busqueda);
        if (!busqueda) {
            res.status(404).send({
                message: 'Ingrese un parametro de busqueda'
            });
        } else {

            var periodo = await Periodo.findOne();


            if (!periodo) {
                return res.status(200).send({
                    message: 'No tiene viajes'
                });
            } else {
                console.log("todo ready entre a buscar", periodo.PERIODO);
                let materias = await Materia.findAll({ where: { ID_CURSO: busqueda, ESTADO_MATERIA: 0, PERIODO: periodo.dataValues.PERIODO }, include: { model: Curso } });
                if (!materias) {
                    return res.status(200).send({
                        message: 'No tiene materias'
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


module.exports = {          // para exportar todas las funciones de este modulo

    saveMatricula,
    busquedaMatriculas,
    updateMatricula,
    getEstudiantesMatriculas,
    getlistadoMateriasE


};
