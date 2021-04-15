'use strcit'

var bcrypt = require('bcrypt-nodejs');

var Curso = require('../models/curso'); //importar el modelo del usuario  o lo que son las clases comunes
var Materia = require('../models/materia'); //importar el modelo del usuario  o lo que son las clases comunes
var Matricula = require('../models/matricula'); //importar el modelo del usuario  o lo que son las clases comunes
var jwt = require('../services/jwt');
var Periodo = require('../models/periodo');


async function saveCurso(req, res) {

    try {
        let curso = Curso.build();
        var params = req.body;
        var count = 0;
        let cursoEncontrado = await Curso.findOne({ where: { CURSO: params.curso, PARALELO: params.paralelo } });

        if (cursoEncontrado) {
            return res.status(500).send({
                message: "El Curso ya Existe"
            });
        } else {

            let cursos = await Curso.findAll();

            if (cursos) {

                cursos.forEach(element => {
                    console.log("numero de regsitros", count);
                    count++
                });
                count = count + 1;
                //
                curso.CODIGO_CURSO = "CODC" + count;
                curso.CURSO = params.curso;
                curso.PARALELO = '"' + params.paralelo + '"';
                curso.ESTADO_CURSO = 0;
                curso.PERIODO = params.periodo;

                if (params.curso && params.paralelo) {

                    let cursoGuardado = await curso.save();

                    if (!cursoGuardado) {
                        res.status(404).send({
                            message: 'No se ha registrado el curso'
                        });
                    } else {
                        res.status(200).send({
                            message: 'El Curso se ha registrado correctamente'
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
            message: err.name
        });
    }

}


async function getCursos(req, res) {

    try {
        let periodo = await Periodo.findOne();

        if (!periodo) {
            return res.status(200).send({
                message: 'No tiene periodos'
            });
        } else {
            console.log("esto busca", periodo.dataValues.PERIODO);
            let listadoCursos = await Curso.findAll({ where: { PERIODO: periodo.dataValues.PERIODO, ESTADO_CURSO: 0 } });

            if (!listadoCursos) {
                return res.status(200).send({
                    message: 'No tiene cursos'
                });
            }

            return res.status(200).send({

                listadoCursos
            });


        }

    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }

}



async function updateCurso(req, res) {

    try {
        var messageId = req.body.id;  // en este caso e sparametro de ruta es decir el id para todo lo demas req.body



        let curso = await Curso.findOne({ where: { CODIGO_CURSO: messageId, ESTADO_CURSO: 0 } })


        if (!curso) {
            return res.status(200).send({
                message: 'No tiene registrado este curso'
            });
        } else {

            let materiaupdate = await Materia.findOne({ where: { ID_CURSO: curso.dataValues.ID_CURSO, ESTADO_MATERIA: 0 } });

            if (!materiaupdate) {
                let matricula = await Matricula.findOne({ where: { ID_CURSO: curso.dataValues.ID_CURSO, ESTADO_MATRICULA: 0 } });

                if (!matricula) {

                    let cursoUpdate = await curso.update({ ESTADO_CURSO: 1 });

                    if (!cursoUpdate) {
                        res.status(404).send({ message: "El  curso no  se ha actualizado" });
                    } else {
                        res.status(200).send({ message: "El curso se ha actualizado correctamente" });
                    }

                } else {
                    res.status(200).send({ message: "No eliminar, el curso esta asignado a Matriculas" });
                }




            } else {
                res.status(200).send({ message: "No eliminar, el curso esta asignado a Materias" });
            }




        }

    } catch (err) {
        res.status(500).send({
            message: err.name
        });
    }


}

module.exports = {          // para exportar todas las funciones de este modulo

    saveCurso,
    getCursos,
    updateCurso




};
