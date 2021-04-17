
var Nota = require('../models/nota');
var NotaB = require('../models/notaB');
var SubirNota = require('../models/subirNota');

async function subirNotas(req, res) {
  try {
    var params = req.body;

    console.log("veamos que viene como estado", params.estado);


    let subirnotas = await SubirNota.findOne();

    if (subirnotas) {
      let subirnotaUpdate = await SubirNota.update({ ESTADO_SUBIRNOTA: params.estado }, { where: { ID_SUBIRNOTA: subirnotas.dataValues.ID_SUBIRNOTA } })


      if (!subirnotaUpdate) {
        res.status(404).send({
          message: "la afectacion a la subida de notas no ha podido realizarse."
        });
      } else {
        res.status(200).send({
          message: "la afectacion a la subida de notas se ha realizado correctamente."
        });

      }


    } else {

      console.log("antes de asignar el estado", params.estado);
      var subirNota = SubirNota.build();
      subirNota.ESTADO_SUBIRNOTA = params.estado;
      let subirnotaStored = await subirNota.save();
      if (!subirnotaStored) {
        res.status(404).send({
          message: 'No se ha afectado correctamente la subida de notas'
        });
      } else {

        res.status(200).send({
          message: 'La afectacion a la subida de notas se ha realizado correctamente'
        });

      }

    }
  } catch (err) {
    res.status(500).send({
      message: err.name
    });
  }
}


async function saveNotas(req, res) {

  var cont = 0;
  var cont2 = 0;
  var cont3 = 0;
  var paramsi = req.body;

  console.log("veamos si viene materia", paramsi);
  paramsi.forEach(async (params) => {
    try {
      let notas = await Nota.findOne({ where: { ID_ESTUDIANTE: params.estudiante, PERIODO: params.periodo, ID_MATERIA: params.materia } });
      console.log("encontre notas", notas);
      if (notas) {
        cont2++;
        updateNotasFin(notas, params, res, cont2, paramsi);


      } else {
        cont++;
        saveNotas2(params, res, cont, paramsi);

      }
    } catch (err) {
      console.log("err",err);
      cont3++;
      if (cont3 == Object.keys(paramsi).length) {
        res.status(500).send({
          message: "Error al guardar Nota"
        });
      }
    }

  })





}

async function saveNotas2(params, res, cont, paramsi) {

  try {
    var nota = Nota.build();
    nota.ID_MATERIA = params.materia;
    nota.ID_ESTUDIANTE = params.estudiante;
    nota.PERIODO = params.periodo;

    nota.ASISTENCIA1 = params.Asistencia1;
    nota.ASISTENCIA2 = params.Asistencia2;
    nota.ASISTENCIA3 = params.Asistencia3;
    nota.ASISTENCIA4 = params.Asistencia4;
    nota.ASISTENCIA5 = params.Asistencia5;
    nota.ASISTENCIA6 = params.Asistencia6;
    nota.ASISTENCIA7 = params.Asistencia7;
    nota.ASISTENCIA8 = params.Asistencia8;
    nota.PROMEDIOASISTENCIA = params.PromedioAsistencia;

    nota.TAREA1 = params.Tarea1;
    nota.TAREA2 = params.Tarea2;
    nota.TAREA3 = params.Tarea3;
    nota.TAREA4 = params.Tarea4;
    nota.PROYECTO1 = params.Proyecto1;
    nota.EXAMEN1 = params.Examen1;

    nota.TAREA11 = params.Tarea11;
    nota.TAREA22 = params.Tarea22;
    nota.TAREA33 = params.Tarea33;
    nota.TAREA44 = params.Tarea44;
    nota.PROYECTO2 = params.Proyecto2;
    nota.EXAMEN2 = params.Examen2;
    nota.ESTADONOTAS = params.EstadoNotas;

    nota.PT = params.pt;

    let notaStored = await nota.save();

    if (!notaStored && cont == Object.keys(paramsi).length) {
      res.status(404).send({
        message: 'No se han guardado sus notas'
      });
    } else {
      if (cont == Object.keys(paramsi).length) {
        res.status(200).send({
          message: 'Las notas se han guardado correctamente'
        });
      }
    }

  } catch (err) {
   console.log("err",err);
    if (cont == Object.keys(paramsi).length) {
      res.status(500).send({
        message: 'Error al guardar notas'
      });
    }
  }

}


async function updateNotasFin(notas, params, res, cont, paramsi) {

  try {
    console.log("update", notas.ID_NOTA)


    let notaUpdate = await Nota.update({
      ID_MATERIA: params.materia,
      ID_ESTUDIANTE: params.estudiante,
      PERIODO: params.periodo,

      ASISTENCIA1: params.Asistencia1,
      ASISTENCIA2: params.Asistencia2,
      ASISTENCIA3: params.Asistencia3,
      ASISTENCIA4: params.Asistencia4,
      ASISTENCIA5: params.Asistencia5,
      ASISTENCIA6: params.Asistencia6,
      ASISTENCIA7: params.Asistencia7,
      ASISTENCIA8: params.Asistencia8,
      PROMEDIOASISTENCIA: params.PromedioAsistencia,

      TAREA1: params.Tarea1,
      TAREA2: params.Tarea2,
      TAREA3: params.Tarea3,
      TAREA4: params.Tarea4,
      PROYECTO1: params.Proyecto1,
      EXAMEN1: params.Examen1,

      TAREA11: params.Tarea11,
      TAREA22: params.Tarea22,
      TAREA33: params.Tarea33,
      TAREA44: params.Tarea44,
      PROYECTO2: params.Proyecto2,
      EXAMEN2: params.Examen2,
      ESTADONOTAS: params.EstadoNotas,

      PT: params.pt

    }, { where: { ID_NOTA: notas.ID_NOTA } });

    if (!notaUpdate && cont == Object.keys(paramsi).length) {
      res.status(404).send({
        message: "la nota no ha podido actualizarse."
      });
    } else {
      console.log("seguro se actualizo", cont, "contra", paramsi);
      if (cont == Object.keys(paramsi).length) {
        res.status(200).send({
          message: "las notas se actualizaron correctamente."
        });
      }
    }

  } catch (err) {
    if (cont == Object.keys(paramsi).length) {
      res.status(500).send({
        message: err
      });
    }
  }
}


function buscarNotas(req, res) {


  var paramsi = req.body;
  console.log("mostrar el ide que voy a comprar", paramsi);
  var vectorNotas = [];
  var cont2 = 0;
  cont3 = 0;
  cont = 0;
  paramsi.buscar.forEach(async (params) => {
    try {
      let notas = await Nota.findOne({ where: { ID_ESTUDIANTE: params.ID_ESTUDIANTE, PERIODO: params.PERIODO, ID_MATERIA: paramsi.materia } });


      if (notas) {

        cont2++;
        vectorNotas.push(notas);

      } else {
        cont++;

      }

      if ((cont2 + cont + cont3) == Object.keys(paramsi.buscar).length) {
        console.log("notas que traigo", vectorNotas);
        res.status(200).send({
          vectorNotas
        });
      }

    } catch (err) {
      cont3++
      if ((cont3 + cont + cont2) == Object.keys(paramsi.buscar).length) {
        res.status(200).send({
          vectorNotas
        });
      }
    }

  });


}


// notas b // pendiente

async function saveNotasB(req, res) {

  var cont = 0;
  var cont2 = 0;
  var cont3 = 0;
  var paramsi = req.body;

  console.log("veamos si viene materia 2", paramsi);
  paramsi.forEach(async (params) => {
    try {
      console.log("pase");
      let notasB = await NotaB.findOne({ where: { ID_ESTUDIANTE: params.estudiante, PERIODO: params.periodo, ID_MATERIA: params.materia } });

      if (notasB) {
        cont2++;
        updateNotasFinB(notasB, params, res, cont2, paramsi);

      } else {
        cont++;
        console.log("entre a guardar");
        saveNotasB2(params, res, cont, paramsi);

      }

    } catch (err) {
      console.log("error", err)
      cont3++;
      if (cont3 == Object.keys(paramsi).length) {
        res.status(500).send({
          message: "Error al guardar Nota"
        });
      }
    }


  });

}


async function saveNotasB2(params, res, cont, paramsi) {

  try {
    var notaB = NotaB.build();
    notaB.ID_MATERIA = params.materia;
    notaB.ID_ESTUDIANTE = params.estudiante;
    notaB.PERIODO = params.periodo;


    notaB.Q1P1INSUMO1 = params.Q1P1insumo1;
    notaB.Q1P1INSUMO2 = params.Q1P1insumo2;
    notaB.Q1P1INSUMO3 = params.Q1P1insumo3;
    notaB.Q1P1INSUMO4 = params.Q1P1insumo4;
    notaB.Q1P1INSUMO5 = params.Q1P1insumo5;
    notaB.Q1P1INSUMO6 = params.Q1P1insumo6;

    notaB.Q1P2INSUMO1 = params.Q1P2insumo1;
    notaB.Q1P2INSUMO2 = params.Q1P2insumo2;
    notaB.Q1P2INSUMO3 = params.Q1P2insumo3;
    notaB.Q1P2INSUMO4 = params.Q1P2insumo4;
    notaB.Q1P2INSUMO5 = params.Q1P2insumo5;
    notaB.Q1P2INSUMO6 = params.Q1P2insumo6;

    notaB.Q1P3INSUMO1 = params.Q1P3insumo1;
    notaB.Q1P3INSUMO2 = params.Q1P3insumo2;
    notaB.Q1P3INSUMO3 = params.Q1P3insumo3;
    notaB.Q1P3INSUMO4 = params.Q1P3insumo4;
    notaB.Q1P3INSUMO5 = params.Q1P3insumo5;
    notaB.Q1P3INSUMO6 = params.Q1P3insumo6;

    notaB.EXAMEN1 = params.examen1;

    notaB.Q2P1INSUMO1 = params.Q2P1insumo1;
    notaB.Q2P1INSUMO2 = params.Q2P1insumo2;
    notaB.Q2P1INSUMO3 = params.Q2P1insumo3;
    notaB.Q2P1INSUMO4 = params.Q2P1insumo4;
    notaB.Q2P1INSUMO5 = params.Q2P1insumo5;
    notaB.Q2P1INSUMO6 = params.Q1P1insumo6;

    notaB.Q2P2INSUMO1 = params.Q2P2insumo1;
    notaB.Q2P2INSUMO2 = params.Q2P2insumo2;
    notaB.Q2P2INSUMO3 = params.Q2P2insumo3;
    notaB.Q2P2INSUMO4 = params.Q2P2insumo4;
    notaB.Q2P2INSUMO5 = params.Q2P2insumo5;
    notaB.Q2P2INSUMO6 = params.Q2P2insumo6;

    notaB.Q2P3INSUMO1 = params.Q2P3insumo1;
    notaB.Q2P3INSUMO2 = params.Q2P3insumo2;
    notaB.Q2P3INSUMO3 = params.Q2P3insumo3;
    notaB.Q2P3INSUMO4 = params.Q2P3insumo4;
    notaB.Q2P3INSUMO5 = params.Q2P3insumo5;
    notaB.Q2P3INSUMO6 = params.Q2P3insumo6;

    notaB.EXAMEN2 = params.examen2;

    notaB.EXAMENSUPLETORIO = params.examenSupletorio;
    notaB.EXAMENREMEDIAL = params.examenRemedial;
    notaB.EXAMENGRACIA = params.examenGracia;
    notaB.PT = params.pt;

    let notaStored = await notaB.save();

    if (!notaStored && cont == Object.keys(paramsi).length) {
      res.status(404).send({
        message: 'No se han guardado las notas'
      });
    } else {
      if (cont == Object.keys(paramsi).length) {
        res.status(200).send({
          message: 'Las notas se han guardado correctamente'
        });
      }
    }
  } catch (err) {
    if (cont == Object.keys(paramsi).length) {
      res.status(500).send({
        message: 'Error al guardar notas'
      });
    }
  }


}



async function updateNotasFinB(notas, params, res, cont, paramsi) {

  try {
    console.log("id_notab", notas.ID_NOTAB)

    let notaUpdate = await NotaB.update({
      ID_MATERIA: params.materia,
      ID_ESTUDIANTE: params.estudiante,
      PERIODO: params.periodo,


      Q1P1INSUMO1: params.Q1P1insumo1,
      Q1P1INSUMO2: params.Q1P1insumo2,
      Q1P1INSUMO3: params.Q1P1insumo3,
      Q1P1INSUMO4: params.Q1P1insumo4,
      Q1P1INSUMO5: params.Q1P1insumo5,
      Q1P1INSUMO6: params.Q1P1insumo6,

      Q1P2INSUMO1: params.Q1P2insumo1,
      Q1P2INSUMO2: params.Q1P2insumo2,
      Q1P2INSUMO3: params.Q1P2insumo3,
      Q1P2INSUMO4: params.Q1P2insumo4,
      Q1P2INSUMO5: params.Q1P2insumo5,
      Q1P2INSUMO6: params.Q1P2insumo6,

      Q1P3INSUMO1: params.Q1P3insumo1,
      Q1P3INSUMO2: params.Q1P3insumo2,
      Q1P3INSUMO3: params.Q1P3insumo3,
      Q1P3INSUMO4: params.Q1P3insumo4,
      Q1P3INSUMO5: params.Q1P3insumo5,
      Q1P3INSUMO6: params.Q1P3insumo6,

      EXAMEN1: params.examen1,

      Q2P1INSUMO1: params.Q2P1insumo1,
      Q2P1INSUMO2: params.Q2P1insumo2,
      Q2P1INSUMO3: params.Q2P1insumo3,
      Q2P1INSUMO4: params.Q2P1insumo4,
      Q2P1INSUMO5: params.Q2P1insumo5,
      Q2P1INSUMO6: params.Q1P1insumo6,

      Q2P2INSUMO1: params.Q2P2insumo1,
      Q2P2INSUMO2: params.Q2P2insumo2,
      Q2P2INSUMO3: params.Q2P2insumo3,
      Q2P2INSUMO4: params.Q2P2insumo4,
      Q2P2INSUMO5: params.Q2P2insumo5,
      Q2P2INSUMO6: params.Q2P2insumo6,

      Q2P3INSUMO1: params.Q2P3insumo1,
      Q2P3INSUMO2: params.Q2P3insumo2,
      Q2P3INSUMO3: params.Q2P3insumo3,
      Q2P3INSUMO4: params.Q2P3insumo4,
      Q2P3INSUMO5: params.Q2P3insumo5,
      Q2P3INSUMO6: params.Q2P3insumo6,

      EXAMEN2: params.examen2,

      EXAMENSUPLETORIO: params.examenSupletorio,
      EXAMENREMEDIAL: params.examenRemedial,
      EXAMENGRACIA: params.examenGracia,
      PT: params.pt

    }, { where: { ID_NOTAB: notas.ID_NOTAB } });






    if (!notaUpdate && cont == Object.keys(paramsi).length) {
      res.status(404).send({
        message: "las notas no ha podido actualizarse."
      });
    } else {
      console.log("seguro se actualizo", cont, "contra", paramsi);
      if (cont == Object.keys(paramsi).length) {
        res.status(200).send({
          message: "las notas se registraron correctamente."
        });
      }
    }

  } catch (err) {

    console.log("error", err)
    if (cont == Object.keys(paramsi).length) {
      res.status(500).send({
        message: err
      });
    }

  }
}

async function buscarNotasB(req, res) {


  var paramsi = req.body;
  console.log("mostrar el ide que voy a comprar notas b", paramsi);
  var vectorNotas = [];
  var cont2 = 0;
  cont3 = 0;
  cont = 0;
  paramsi.buscar.forEach(async (params) => {
    try {

      let notas = await NotaB.findOne({ where: { ID_ESTUDIANTE: params.ID_ESTUDIANTE, PERIODO: params.PERIODO, ID_MATERIA: paramsi.materia } });
      console.log("suma contadores=", (cont + cont2 + cont3), "numero vector que vino", Object.keys(paramsi).length);

      if (notas) {

        cont2++;
        vectorNotas.push(notas)
      } else {
        cont++;
      }
      if ((cont + cont2 + cont3) == Object.keys(paramsi.buscar).length) {

        console.log("el vector mijin antes de regresar", vectorNotas);
        res.status(200).send({
          vectorNotas
        });
      }
    } catch (err) {
      console.log("error", err)
      cont3++
      if ((cont3 + cont + cont2) == Object.keys(paramsi).length) {
        res.status(200).send({
          vectorNotas
        });
      }
    }



  });

}



async function buscarNotasEstudiante(req, res) {

  try {
    console.log("entre a sacar als notas de las materias");
    var estudianteE = req.user.sub;
    var periodoE = req.body.fecha;

    var vectorNotas = [];


    let notas = await Nota.findAll({ where: { ID_ESTUDIANTE: estudianteE, PERIODO: periodoE } });

    if (notas) {

      console.log("estes es el vector de toditititas las notas que regresa", notas);
      res.status(200).send({
        notas
      });
    }
    else {

      res.status(200).send({
        message: "no existen notas registradas"
      });

    }
  } catch (err) {
    res.status(500).send({
      message: err.name
    });
  }

}


async function buscarNotasEstudianteB(req, res) {

  try {
    console.log("entre a sacar als notas de las materias b");
    var estudianteE = req.user.sub;
    var periodoE = req.body.fecha;

    console.log("notas del estudiante ull params estudiante id", estudianteE, periodoE);
    let notas = await NotaB.findAll({ where: { ID_ESTUDIANTE: estudianteE, PERIODO: periodoE } });
    if (notas) {

      console.log("estes es el vector de toditititas las notas  Basica que regresa", notas);
      res.status(200).send({
        notas
      });
    }
    else {

      res.status(200).send({
        message: "no existen notas registradas"
      });

    }

  } catch (err) {
    res.status(500).send({
      message: err.name
    });
  }


}



function buscarNotasMatris(req, res) {



  var paramsi = req.body;

  var vectorNotas = [];
  var cont2 = 0;
  cont3 = 0;
  cont = 0;

  var contM = Object.keys(paramsi.materias).length;
  var contE = Object.keys(paramsi.buscar).length;
  var multi = contM * contE;

  console.log("esta es la multiplicacion de los vectores", multi);
  paramsi.buscar.forEach(async (params) => {
    paramsi.materias.forEach(async (paramsM) => {
      console.log("estudiante", params.ESTUDIANTE.ID_ESTUDIANTE, "materia", paramsM.ID_MATERIA, "periodo", params.PERIODO);
      try {
        let notas = await Nota.findOne({ where: { ID_ESTUDIANTE: params.ESTUDIANTE.ID_ESTUDIANTE, PERIODO: params.PERIODO, ID_MATERIA: paramsM.ID_MATERIA } });

        if (notas) {
          cont2++
          console.log("este es el contador", cont2);


          vectorNotas.push(notas);
          if (cont2 == multi) {
            console.log("estes es el vector de nbotas que regresa para l matris", vectorNotas);
            res.status(200).send({
              vectorNotas
            });
          }

        } else {
          console.log("de este estudiante no hay notas de ingles", params.estudiante.nombre, "materia", paramsM.nombre)
          cont2++;
          if (cont2 == multi) {
            res.status(200).send({
              message: "no existen notas registradas"
            });
          }

        }

      } catch (err) {

        console.log("error", err)
        cont3++
        if (cont3 == multi) {
          res.status(500).send({
            message: "Error al guardar Curso"
          });
        }
      }
    });

  });


}


async function buscarNotasMatrisB(req, res) {



  var paramsi = req.body;

  var vectorNotas = [];
  var cont2 = 0;
  cont3 = 0;
  cont = 0;

  var contM = Object.keys(paramsi.materias).length;
  var contE = Object.keys(paramsi.buscar).length;
  var multi = contM * contE;

  console.log("esta es la multiplicacion de los vectores", multi);
  paramsi.buscar.forEach(async (params) => {
    paramsi.materias.forEach(async (paramsM) => {
      console.log("estudiante", params, "materia", paramsM.ID_MATERIA);

      try {
        let notas = await NotaB.findOne({ where: { ID_ESTUDIANTE: params.ESTUDIANTE.ID_ESTUDIANTE, PERIODO: params.PERIODO, ID_MATERIA: paramsM.ID_MATERIA } });

        if (notas) {
          console.log("materias una por una", notas);
          cont2++;

          vectorNotas.push(notas);
          if (cont3 + cont2 + cont == multi) {
            console.log("estes es el vector de nbotas que regresa para l matris", vectorNotas);
            res.status(200).send({
              vectorNotas
            });
          }

        } else {
          cont++;
          if (cont3 + cont2 + cont == multi) {
            res.status(200).send({
              message: "no existen notas registradas"
            });
          }


        }

      } catch (err) {
        console.log("error", err);
        cont3++
        if (cont3 + cont2 + cont == multi) {
          res.status(500).send({
            message: "Error al optener promedios finales"
          });
        }
      }

    });

  });

}

module.exports = {          // para exportar todas las funciones de este modulo
  subirNotas,
  saveNotas,
  buscarNotas,
  updateNotasFin,
  saveNotasB,
  buscarNotasB,
  buscarNotasEstudiante,
  buscarNotasEstudianteB,
  buscarNotasMatris,
  buscarNotasMatrisB


};
