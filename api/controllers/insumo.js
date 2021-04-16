

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

        insumo.DESCASISTENCIA1 = params.DescAsistencia1;
        insumo.DESCASISTENCIA2 = params.DescAsistencia2;
        insumo.DESCASISTENCIA3 = params.DescAsistencia3;
        insumo.DESCASISTENCIA4 = params.DescAsistencia4;
        insumo.DESCASISTENCIA5 = params.DescAsistencia5;
        insumo.DESCASISTENCIA6 = params.DescAsistencia6;
        insumo.DESCASISTENCIA7 = params.DescAsistencia7;
        insumo.DESCASISTENCIA8 = params.DescAsistencia8;

        insumo.DESCTAREA1 = params.DescTarea1;
        insumo.DESCTAREA2 = params.DescTarea2;
        insumo.DESCTAREA3 = params.DescTarea3;
        insumo.DESCTAREA4 = params.DescTarea4;
        insumo.DESCPROYECTO1 = params.DescProyecto1;

        insumo.DESCTAREA11 = params.DescTarea11;
        insumo.DESCTAREA22 = params.DescTarea22;
        insumo.DESCTAREA33 = params.DescTarea33;
        insumo.DESCTAREA44 = params.DescTarea44;
        insumo.DESCPROYECTO2 = params.DescProyecto2;

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
            DESCASISTENCIA1 : params.DescAsistencia1,
            DESCASISTENCIA2 : params.DescAsistencia2,
            DESCASISTENCIA3 : params.DescAsistencia3,
            DESCASISTENCIA4 : params.DescAsistencia4,
            DESCASISTENCIA5 : params.DescAsistencia5,
            DESCASISTENCIA6 : params.DescAsistencia6,
            DESCASISTENCIA7 : params.DescAsistencia7,
            DESCASISTENCIA8 : params.DescAsistencia8,

            DESCTAREA1 : params.DescTarea1,
            DESCTAREA2 : params.DescTarea2,
            DESCTAREA3 : params.DescTarea3,
            DESCTAREA4 : params.DescTarea4,
            DESCPROYECTO1 : params.DescProyecto1,

            DESCTAREA11 : params.DescTarea11,
            DESCTAREA22 : params.DescTarea22,
            DESCTAREA33 : params.DescTarea33,
            DESCTAREA44 : params.DescTarea44,
            DESCPROYECTO2 : params.DescProyecto2,

            PERIODO : params.periodo,
            ID_MATERIA : params.materia,
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