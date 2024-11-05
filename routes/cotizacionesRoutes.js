const express = require('express');
const routes = express.Router();
var {CotizacionModel} = require('../Models/Cotizacion');
const cotizacionModel = new CotizacionModel();
routes.get('/', async (req, res) => {
    try {
        const cotizaciones = await cotizacionModel.obtenerCotizaciones();
        res.send(cotizaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las cotizaciones' });
    }
});

routes.post('/:idCliente/:idtpVenta/:subtotal/:iva/:total/:fechavigencia/:estatus/:facturar/:personal/:observaciones', async (req, res) => {
    try {
        const resultado = await cotizacionModel.insertarCotizacion(
            [
                req.params.idCliente,
                req.params.idtpVenta,
                req.params.subtotal,
                req.params.iva,
                req.params.total,
                req.params.fechavigencia,
                req.params.estatus,
                req.params.facturar,
                req.params.personal,
                req.params.observaciones,
                0
        ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la cotización' });
    }
});

routes.put('/:id/:idCliente/:idtpVenta/:subtotal/:iva/:total/:fechavigencia/:estatus/:facturar/:personal/:observaciones', async (req, res) => {
    try {
        const resultado = await cotizacionModel.modificarCotizacion([
            req.params.id,
            req.params.idCliente,
            req.params.idtpVenta,
            req.params.subtotal,
            req.params.iva,
            req.params.total,
            req.params.fechavigencia,
            req.params.estatus,
            req.params.facturar,
            req.params.personal,
            req.params.observaciones,
            0
    ]);
        res.status(201).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la cotización' });
    }
});

routes.delete('/:id/:idCliente/:idtpVenta/:subtotal/:iva/:total/:fechavigencia/:estatus/:facturar/:personal/:observaciones', async (req, res) => {
    try {
        const resultado = await cotizacionModel.modificarCotizacion([
            req.params.id,
            req.params.idCliente,
            req.params.idtpVenta,
            req.params.subtotal,
            req.params.iva,
            req.params.total,
            req.params.fechavigencia,
            req.params.estatus,
            req.params.facturar,
            req.params.personal,
            req.params.observaciones,
            1
    ]);
        res.status(201).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la cotización' });
    }
});


module.exports = routes;