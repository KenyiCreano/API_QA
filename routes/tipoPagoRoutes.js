const express = require('express');
const routes = express.Router();
var {TipoPagoModel} = require('../Models/TipoPago');
const tipoPagoModel = new TipoPagoModel();
routes.get('/',async (req,res)=>{
    try{
        const tiposPago = await tipoPagoModel.obtenerTiposPagos();
        res.send(tiposPago);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

routes.post('/:nom_tipopago/:des_tipopago', async (req, res) => {
    try {
        const resultado = await tipoPagoModel.insertarTipoPago(
            [
                req.params.nom_tipopago, 
                req.params.des_tipopago
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el tipo de pago' });
    }
});

routes.put('/:id/:nom_tipopago/:des_tipopago', async (req, res) => {
    try {
        const resultado = await tipoPagoModel.modificarTipoPago(
            [
                req.params.id ||null, 
                req.params.nom_tipopago || null, 
                req.params.des_tipopago || null,
                1
            ]);
        if (resultado[0].mensaje === 'Tipo de pago actualizado correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el tipo de pago' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el tipo de pago' });
    }
});

routes.delete('/:id/:nom_tipopago/:des_tipopago', async (req, res) => {
    try {
        const resultado = await tipoPagoModel.modificarTipoPago(
            [
                req.params.id ||null, 
                req.params.nom_tipopago || null, 
                req.params.des_tipopago || null,
                0
            ]);
        if (resultado[0].mensaje === 'Tipo de pago actualizado correctamente.') {
            res.status(200).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el tipo de pago' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el tipo de pago' });
    }
});

module.exports = routes;