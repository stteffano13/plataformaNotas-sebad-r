

var Insumo = require('../models/insumo');
var InsumoB = require('../models/insumoB');



async function saveInsumos(req, res) {

    try {
        var params = req.body;

        let insumos = await Insumo.findOne({ where: { PERIODO: params.periodo, ID_MATERIA: params.materia } });

        if (insumos) {

            updateInsumos(insumos, params, res);


        } else {

            saveInsumos2(params, res);


        }

    } catch (err) {
        await t.rollback()
        res.status(500).send({
            message: 'error:' + err
        });
    }





}


async function saveInsumos2(params, res) {
    try {
        var insumo = Insumo.build();

        insumo.DESCINSUMO1 = params.Descinsumo1;
        insumo.DESCINSUMO2 = params.Descinsumo2;
        insumo.DESCINSUMO3 = params.Descinsumo3;
        insumo.DESCINSUMO4 = params.Descinsumo4;
        params.DESCINSUMO5 = insumo.Descinsumo5;
        insumo.DESCINSUMO6 = params.Descinsumo6;
        insumo.DESCINSUMO7 = params.Descinsumo7;
        insumo.DESCINSUMO8 = params.Descinsumo8;
        insumo.DESCINSUMO11 = params.Descinsumo11;
        insumo.DESCINSUMO22 = params.Descinsumo22;
        insumo.DESCINSUMO33 = params.Descinsumo33;
        insumo.DESCINSUMO44 = params.Descinsumo44;
        insumo.DESCINSUMO55 = params.Descinsumo55;
        insumo.DESCINSUMO66 = params.Descinsumo66;
        insumo.DESCINSUMO77 = params.Descinsumo77;
        insumo.Descinsumo88 = params.Descinsumo88;
        insumo.PERIODO = params.periodo;
        insumo.ID_MATERIA = params.materia;

        let insumoStored = await insumo.save();

        if (!insumoStored) {
            res.status(404).send({
                message: 'No se ha registrado el insumo'
            });
        } else {
            res.status(200).send({
                message: 'El Insumo se ha registrado correctamente'
            });

        }

    } catch (err) {
        await t.rollback()
        res.status(500).send({
            message: 'error:' + err
        });
    }

}


async function updateInsumos(insumos, params, res) {
    try {
        params._id = insumos._id;

        let insumoUpdate = await Insumo.update({
            DESCINSUMO1: params.Descinsumo1,
            DESCINSUMO2: params.Descinsumo2,
            DESCINSUMO3: params.Descinsumo3,
            DESCINSUMO4: params.Descinsumo4,
            DESCINSUMO5: params.Descinsumo5,
            DESCINSUMO6: params.Descinsumo6,
            DESCINSUMO7: params.Descinsumo7,
            DESCINSUMO8: params.Descinsumo8,
            DESCINSUMO11: params.Descinsumo11,
            DESCINSUMO22: params.Descinsumo22,
            DESCINSUMO33: params.Descinsumo33,
            DESCINSUMO44: params.Descinsumo44,
            DESCINSUMO55: params.Descinsumo55,
            DESCINSUMO66: params.Descinsumo66,
            DESCINSUMO77: params.Descinsumo77,
            Descinsumo88: params.Descinsumo88,
            PERIODO: params.periodo,
            ID_MATERIA: params.materia
        }, { where: { ID_INSUMO: insumos.ID_INSUMO } });

        if (!insumoUpdate) {
            res.status(404).send({
                message: "El insumo no ha podido actualizarse."
            });
        } else {

            res.status(200).send({
                message: "El insumo se actualizo correctamente."
            });

        }

    } catch (err) {
        await t.rollback()
        res.status(500).send({
            message: 'error:' + err
        });
    }

}



async function getDiscInsumo(req, res) {

    try {
        var busqueda = req.body;
        console.log("busqueda insumos", busqueda);
        if (!busqueda) {
            res.status(404).send({
                message: 'Ingrese un parametro de busqueda'
            });
        } else {


            var insumos = await Insumo.findOne({ where: { ID_MATERIA: busqueda.materia, PERIODO: busqueda.periodo } })


            if (!insumos) {
                return res.status(200).send({
                    message: 'No existe descripcion de insumos'
                });
            }

            return res.status(200).send({
                insumos
            });

        }
    } catch (err) {
       
        res.status(500).send({
            message: 'error:' + err
        });
    }
}



async function saveInsumosB(req, res) {

    try {
        var params = req.body;
        let insumosB = await InsumoB.findOne({ where: { PERIODO: params.periodo, ID_MATERIA: params.materia } });

        if (insumosB) {

            updateInsumosB(insumosB, params, res);

        } else {

            saveInsumosB2(params, res);

        }
    } catch (err) {
        await t.rollback()
        res.status(500).send({
            message: 'error:' + err
        });
    }

}



async function saveInsumosB2(params, res) {

    try {
        var insumoB = InsumoB.build();
        console.log("entre a los insumos basica 2", params);

        insumoB.DESCQ1P1INSUMO1 = params.DescQ1P1insumo1;
        insumoB.DESCQ1P1INSUMO2 = params.DescQ1P1insumo2;
        insumoB.DESCQ1P1INSUMO3 = params.DescQ1P1insumo3;
        insumoB.DESCQ1P1INSUMO4 = params.DescQ1P1insumo4;
        insumoB.DESCQ1P1INSUMO5 = params.DescQ1P1insumo5;
        insumoB.DESCQ1P1INSUMO6 = params.DescQ1P1insumo6;
        insumoB.DESCQ1P2INSUMO1 = params.DescQ1P2insumo1;
        insumoB.DESCQ1P2INSUMO2 = params.DescQ1P2insumo2;
        insumoB.DESCQ1P2INSUMO3 = params.DescQ1P2insumo3;
        insumoB.DESCQ1P2INSUMO4 = params.DescQ1P2insumo4;
        insumoB.DESCQ1P2INSUMO5 = params.DescQ1P2insumo5;
        insumoB.DESCQ1P2INSUMO6 = params.DescQ1P2insumo6;
        insumoB.DESCQ1P3INSUMO1 = params.DescQ1P3insumo1;
        insumoB.DESCQ1P3INSUMO2 = params.DescQ1P3insumo2;
        insumoB.DESCQ1P3INSUMO3 = params.DescQ1P3insumo3;
        insumoB.DESCQ1P3INSUMO4 = params.DescQ1P3insumo4;
        insumoB.DESCQ1P3INSUMO5 = params.DescQ1P3insumo5;
        insumoB.DESCQ1P3INSUMO6 = params.DescQ1P3insumo6;

        insumoB.DESCQ2P1INSUMO1 = params.DescQ2P1insumo1;
        insumoB.DESCQ2P1INSUMO2 = params.DescQ2P1insumo2;
        insumoB.DESCQ2P1INSUMO3 = params.DescQ2P1insumo3;
        insumoB.DESCQ2P1INSUMO4 = params.DescQ2P1insumo4;
        insumoB.DESCQ2P1INSUMO5 = params.DescQ2P1insumo5;
        insumoB.DESCQ2P1INSUMO6 = params.DescQ2P1insumo6;
        insumoB.DESCQ2P2INSUMO1 = params.DescQ2P2insumo1;
        insumoB.DESCQ2P2INSUMO2 = params.DescQ2P2insumo2;
        insumoB.DESCQ2P2INSUMO3 = params.DescQ2P2insumo3;
        insumoB.DESCQ2P2INSUMO4 = params.DescQ2P2insumo4;
        insumoB.DESCQ2P2INSUMO5 = params.DescQ2P2insumo5;
        insumoB.DESCQ2P2INSUMO6 = params.DescQ2P2insumo6;
        insumoB.DESCQ2P3INSUMO1 = params.DescQ2P3insumo1;
        insumoB.DESCQ2P3INSUMO2 = params.DescQ2P3insumo2;
        insumoB.DESCQ2P3INSUMO3 = params.DescQ2P3insumo3;
        insumoB.DESCQ2P3INSUMO4 = params.DescQ2P3insumo4;
        insumoB.DESCQ2P3INSUMO5 = params.DescQ2P3insumo5;
        insumoB.DESCQ2P3INSUMO6 = params.DescQ2P3insumo6;

        insumoB.PERIODO = params.periodo;
        insumoB.ID_MATERIA = params.materia;
        let insumoBStored = await insumoB.save();
        if (!insumoBStored) {
            res.status(404).send({
                message: 'No se ha registrado el insumo'
            });
        } else {
            res.status(200).send({
                message: 'El Insumo se ha registrado correctamente'
            });
        }
    } catch (err) {
        await t.rollback()
        res.status(500).send({
            message: 'error:' + err
        });
    }
}


async function updateInsumosB(insumosB, params, res) {

    try {
        console.log("estos son losinsumos que viene parael bachillerato en el update", params);

        let insumoBUpdate = await InsumoB.update({
            DESCQ1P1INSUMO1: params.DescQ1P1insumo1,
            DESCQ1P1INSUMO2: params.DescQ1P1insumo2,
            DESCQ1P1INSUMO3: params.DescQ1P1insumo3,
            DESCQ1P1INSUMO4: params.DescQ1P1insumo4,
            DESCQ1P1INSUMO5: params.DescQ1P1insumo5,
            DESCQ1P1INSUMO6: params.DescQ1P1insumo6,
            DESCQ1P2INSUMO1: params.DescQ1P2insumo1,
            DESCQ1P2INSUMO2: params.DescQ1P2insumo2,
            DESCQ1P2INSUMO3: params.DescQ1P2insumo3,
            DESCQ1P2INSUMO4: params.DescQ1P2insumo4,
            DESCQ1P2INSUMO5: params.DescQ1P2insumo5,
            DESCQ1P2INSUMO6: params.DescQ1P2insumo6,
            DESCQ1P3INSUMO1: params.DescQ1P3insumo1,
            DESCQ1P3INSUMO2: params.DescQ1P3insumo2,
            DESCQ1P3INSUMO3: params.DescQ1P3insumo3,
            DESCQ1P3INSUMO4: params.DescQ1P3insumo4,
            DESCQ1P3INSUMO5: params.DescQ1P3insumo5,
            DESCQ1P3INSUMO6: params.DescQ1P3insumo6,

            DESCQ2P1INSUMO1: params.DescQ2P1insumo1,
            DESCQ2P1INSUMO2: params.DescQ2P1insumo2,
            DESCQ2P1INSUMO3: params.DescQ2P1insumo3,
            DESCQ2P1INSUMO4: params.DescQ2P1insumo4,
            DESCQ2P1INSUMO5: params.DescQ2P1insumo5,
            DESCQ2P1INSUMO6: params.DescQ2P1insumo6,
            DESCQ2P2INSUMO1: params.DescQ2P2insumo1,
            DESCQ2P2INSUMO2: params.DescQ2P2insumo2,
            DESCQ2P2INSUMO3: params.DescQ2P2insumo3,
            DESCQ2P2INSUMO4: params.DescQ2P2insumo4,
            DESCQ2P2INSUMO5: params.DescQ2P2insumo5,
            DESCQ2P2INSUMO6: params.DescQ2P2insumo6,
            DESCQ2P3INSUMO1: params.DescQ2P3insumo1,
            DESCQ2P3INSUMO2: params.DescQ2P3insumo2,
            DESCQ2P3INSUMO3: params.DescQ2P3insumo3,
            DESCQ2P3INSUMO4: params.DescQ2P3insumo4,
            DESCQ2P3INSUMO5: params.DescQ2P3insumo5,
            DESCQ2P3INSUMO6: params.DescQ2P3insumo6,

            PERIODO: params.periodo,
            ID_MATERIA: params.materia
        }, { where: { ID_INSUMOB: insumosB.ID_INSUMOB } });


        if (!insumoBUpdate) {
            res.status(404).send({
                message: "El insumo no ha podido actualizarse."
            });
        } else {

            res.status(200).send({
                message: "El insumo se actualizo correctamente."
            });

        }

    } catch (err) {
        await t.rollback()
        res.status(500).send({
            message: 'error:' + err
        });
    }

}


async function getDiscInsumoB(req, res) {

    try {
        var busqueda = req.body;
        console.log("busqueda insumos", busqueda);
        if (!busqueda) {
            res.status(404).send({
                message: 'Ingrese un parametro de busqueda'
            });
        } else {


            let insumosB = await InsumoB.findOne({ where: { ID_MATERIA: busqueda.materia, PERIODO: busqueda.periodo } });

            if (!insumosB) {
                return res.status(200).send({
                    message: 'No existe descripcion algna de insumos'
                });
            }

            return res.status(200).send({
                insumosB
            });

        }
    } catch (err) {
        await t.rollback()
        res.status(500).send({
            message: 'error:' + err
        });
    }
}
module.exports = {          // para exportar todas las funciones de este modulo

    saveInsumos,
    saveInsumos2,
    getDiscInsumo,
    saveInsumosB,
    saveInsumosB2,
    updateInsumosB,
    getDiscInsumoB


};