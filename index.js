var express = require('express');
var cors = require('cors');
var {UnidadModel, Unidad} = require('./Models/Unidad');
var {ProductoModel, Producto} = require('./Models/Producto');
var {ClienteModel} = require('./Models/Cliente');
var {Clasificacion, ClasificacionModel} = require('./Models/Clasificacion');
var {SubclasificacionModel} = require('./Models/SubClasificacion');
var {MaterialModel} = require('./Models/Material');
var {Material_Produccion, Material_ProduccionModel} = require('./Models/Material_Produccion');
var {AcabadosModel} = require('./Models/Acabados');
var {CotizacionModel} = require('./Models/Cotizacion');
var {EstatusCobranzaModel} =  require('./Models/EstatusCobranza');
var {FormaPagoModel} = require('./Models/FormaPago');
var {TipoPagoModel} = require('./Models/TipoPago');
var {TipoTrabajoModel} = require('./Models/TipoTrabajo');
var {TipoVentaModel} = require('./Models/TipoVenta');
var {ProcesoModel} = require('./Models/Proceso');
var {TipoClienteModel} = require('./Models/TipoCliente');
var {EstadoClienteModel} = require('./Models/EstadoCliente');



const productoModel = new ProductoModel();
const procesoModel = new ProcesoModel();
const unidadModel = new UnidadModel();
const clasificacionModel = new ClasificacionModel();
const clienteModel = new ClienteModel();
const subclasificacionModel = new SubclasificacionModel();
const materialModel = new MaterialModel();
const material_ProduccionModel = new Material_ProduccionModel();
const acabadosModel = new AcabadosModel();
const cotizacionModel = new CotizacionModel();
const estatusModel = new EstatusCobranzaModel();
const formaPagoModel = new FormaPagoModel();
const tipoPagoModel = new TipoPagoModel();
const tipoTrabajoModel = new TipoTrabajoModel();
const tipoVentaModel = new TipoVentaModel();
const tipoClienteModel = new TipoClienteModel();
const estadoClienteModel = new EstadoClienteModel();

/*const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
    }*/
var app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
//DE AQUI PARA abajo es para las rutas
app.get('/',(req,res)=>res.send("<h1>Ruta de inicio con nodemon</h1>"));

//Zona de los acabados
app.get('/acabados',async (req,res)=>{
    try{
        const acabados = await acabadosModel.obtenerAcabados();
        res.send(acabados);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


app.post('/acabados/:nom_acabados/:des_acabados', async (req, res)=>{
    try{
        const resultado = await acabadosModel.insertarAcabado(
            [ 
                req.params.nom_acabados, 
                req.params.des_acabados
            ]
        );
        res.status(201).json({message:'Agregado con exito'});
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:'Error al ingresar el acabado'});
    }
});


app.put('/acabados/:id/:nom_acabados/:des_acabados', async (req, res)=>{
    try{
        const resultado = await acabadosModel.modificarAcabado(
            [
                req.params.id, 
                req.params.nom_acabados, 
                req.params.des_acabados,
                1
            ]
        );
        res.status(201).json({message:'Modificado con exito'});
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:'Error al modificar el acabado'});
    }
});

app.delete('/acabados/:id/:nom_acabados/:des_acabados', async (req, res)=>{
    try{
        const resultado = await acabadosModel.modificarAcabado(
            [
                req.params.id, 
                req.params.nom_acabados, 
                req.params.des_acabados,
                0
            ]
        );
        res.status(200).json({message:'Modificado con exito'});
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:'Error al modificar el acabado'});
    }
});

//Zona de las clasificaciones
app.get('/clasificaciones',async (req,res)=>{
    try{
        const unidades = await clasificacionModel.obtenerClasificaciones();    
        res.send(unidades);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


app.post('/clasificaciones/:nom_clasificacion/:des_clasificacion', async (req, res) => {
    try {
        const resultado = await clasificacionModel.insertarClasificacion(
            [
                req.params.nom_clasificacion, 
                req.params.des_clasificacion
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la subclasificación' });
    }
});


app.put('/clasificaciones/:id/:nom_clasificacion/:des_clasificacion', async (req, res) => {
    try {
        const resultado = await clasificacionModel.modificarClasificacion(
            [
                req.params.id, 
                req.params.nom_clasificacion, 
                req.params.des_clasificacion,
                1
            ]);
        res.status(200).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la clasificación' });
    }
});

app.delete('/clasificaciones/:id/:nom_clasificacion/:des_clasificacion', async (req, res) => {
    try {
        const resultado = await clasificacionModel.modificarClasificacion(
            [
                req.params.id, 
                req.params.nom_clasificacion, 
                req.params.des_clasificacion,
                0
            ]);
        res.status(201).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la clasificación' });
    }
});


//Zona de los clientes
app.get('/clientes', async (req, res) => {
    try {
        const clientes = await clienteModel.obtenerClientes();
        res.send(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
});

app.post("/clientes/:nombre/:apellidopaterno/:apellidomaterno/:rutaconstancia/:rfc/:nomnegocio/:domicilio/:telWP/:telFJ/:correo/:tpCliente", 
    async (req, res) => {
    try {
        //console.log(req.params);
        const resultado = await clienteModel.insertarCliente(req.params);
        //console.log(resultado.id_cliente);
        res.status(201).json({"message":resultado.id_registrado});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el cliente' });
    }
});

app.put("/clientes/:id/:nombre/:apellidopaterno/:apellidomaterno/:rutaconstancia/:rfc/:nomnegocio/:domicilio/:telWP/:telFJ/:correo/:tpCliente", 
    async (req, res) => {
    try {
        const resultado = await clienteModel.modificarCliente(req.params);
        //La respuesta de la base de datos es un array con un objeto que tiene un mensaje por eso se toma el primer elemento
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el cliente' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
});


//Zona de las cotizaciones
app.get('/cotizaciones', async (req, res) => {
    try {
        const cotizaciones = await cotizacionModel.obtenerCotizaciones();
        res.send(cotizaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las cotizaciones' });
    }
});

app.post('/cotizaciones/:idCliente/:idtpVenta/:subtotal/:iva/:total/:fechavigencia/:estatus/:facturar/:personal/:observaciones', async (req, res) => {
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

app.put('/cotizaciones/:id/:idCliente/:idtpVenta/:subtotal/:iva/:total/:fechavigencia/:estatus/:facturar/:personal/:observaciones', async (req, res) => {
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

app.delete('/cotizaciones/:id/:idCliente/:idtpVenta/:subtotal/:iva/:total/:fechavigencia/:estatus/:facturar/:personal/:observaciones', async (req, res) => {
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

//Zona de los estatus de cobranza
app.get('/estatus', async (req, res) => {
    try {
        const estatus = await estatusModel.obtenerEstatusCobranza();
        res.send(estatus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los estatus' });
    }
});

app.post('/estatus/:nom_estatus/:des_estatus', async (req, res) => {
    try {
        const resultado = await estatusModel.insertarEstatus(
            [
                req.params.nom_estatus, 
                req.params.des_estatus
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el estatus' });
    }
});

app.put('/estatus/:id/:nom_estatus/:des_estatus', async (req, res) => {
    try {
        const resultado =  estatusModel.modificarEstatusCobranza(
            [
                req.params.id ||null, 
                req.params.nom_estatus || null, 
                req.params.des_estatus || null,
                1
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el estatus' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el estatus' });
    }
});

app.delete('/estatus/:id/:nom_estatus/:des_estatus', async (req, res) => {
    try {
        const resultado =  estatusModel.modificarEstatusCobranza(
            [
                req.params.id ||null, 
                req.params.nom_estatus || null, 
                req.params.des_estatus || null,
                1
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(200).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el estatus' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el estatus' });
    }
});

//Zona de los estatus del cliente
app.get('/estatuscliente', async (req, res) =>  {
    try {
        const estatus = await estadoClienteModel.obtenerestadosClientes();
        res.send(estatus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los estatus' });
    }
});

app.post('/estatuscliente/:nom_estatus/:des_estatus', async (req, res) => {
    try {
        const resultado = await estatusModel.insertarEstatus(
            [
                req.params.nom_estatus, 
                req.params.des_estatus
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el estatus' });
    }
});

app.put('/estatuscliente/:id/:nom_estatus/:des_estatus', async (req, res) => {
    try {
        const resultado = await estatusModel.modificarEstatus(
            [
                req.params.id ||null, 
                req.params.nom_estatus || null, 
                req.params.des_estatus || null
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el estatus' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el estatus' });
    }
});

//Zona de las formas de pago
app.get('/fpago', async (req, res) => {
    try {
        const fpago = await formaPagoModel.obtenerFormasPagos();
        res.send(fpago);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las formas de pago' });
    }
});

app.post('/fpago/:nom_fpago/:des_fpago', async (req, res) => {
    try {
        const resultado = await formaPagoModel.insertarFormaPago(
            [
                req.params.nom_fpago, 
                req.params.des_fpago
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la forma de pago' });
    }
});

app.put('/fpago/:id/:nom_fpago/:des_fpago', async (req, res) => {
    try {
        const resultado = await formaPagoModel.modificarForma_Pago(
            [
                req.params.id ||null, 
                req.params.nom_fpago || null, 
                req.params.des_fpago || null,
                1
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar la forma de pago' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la forma de pago' });
    }
});

app.delete('/fpago/:id/:nom_fpago/:des_fpago', async (req, res) => {
    try {
        const resultado = await formaPagoModel.modificarForma_Pago(
            [
                req.params.id ||null, 
                req.params.nom_fpago || null, 
                req.params.des_fpago || null,
                0
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(200).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar la forma de pago' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la forma de pago' });
    }
});

//Zona de los materiales de produccion
app.get('/matprod',async (req,res)=>{
    try{
        const materiales = await material_ProduccionModel.obtenerMaterial_Produccion();
        res.send(materiales);
    
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
})

app.post('/matprod/:id_material/:id_unidad/:base/:altura/:proveedor', async (req, res) => {
    try {
        const resultado = await material_ProduccionModel.insertarMaterial_Produccion(
            [
                req.params.id_material ||null, 
                req.params.id_unidad || null,
                req.params.base || null,
                req.params.altura || null,
                req.params.proveedor || null
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el material' });
    }
});

app.put('/matprod/:id/:id_material/:id_unidad/:base/:altura/:proveedor', async (req, res) => {
    try {
        const resultado = await material_ProduccionModel.modificarMaterial_Produccion(
            [
                req.params.id ||null,
                req.params.id_material ||null, 
                req.params.id_unidad || null,
                req.params.base || null,
                req.params.altura || null,
                req.params.proveedor || null,
                1
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el material' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el material' });
    }
});

app.delete('/matprod/:id/:id_material/:id_unidad/:base/:altura/:proveedor', async (req, res) => {
    try {
        const resultado = await material_ProduccionModel.modificarMaterial_Produccion(
            [
                req.params.id ||null,
                req.params.id_material ||null, 
                req.params.id_unidad || null,
                req.params.base || null,
                req.params.altura || null,
                req.params.proveedor || null,
                0
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(200).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el material' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el material' });
    }
});

//Zona de los materiales
app.get('/materiales',async (req,res)=>{
    try{
        const unidades = await materialModel.obtenerMateriales();
        res.send(unidades);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.post('/materiales/:nom_material/:des_material', async (req, res) => {
    try {
        const resultado = await materialModel.insertarMaterial(
            [
                req.params.nom_material, 
                req.params.des_material
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la subclasificación' });
    }
});

app.put('/materiales/:id/:nom_material/:des_material', async (req, res) => {
    try {
        const resultado = await materialModel.modificarMaterial(
            [
                req.params.id ||null, 
                req.params.nom_material || null, 
                req.params.des_material || null,
                1
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el material' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el material' });
    }
});

app.delete('/materiales/:id/:nom_material/:des_material', async (req, res) => {
    try {
        const resultado = await materialModel.modificarMaterial(
            [
                req.params.id ||null, 
                req.params.nom_material || null, 
                req.params.des_material || null,
                0
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el material' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el material' });
    }
});



//Zona de los procesos
app.get('/procesos',async (req,res)=>{
    try{
        const procesos = await procesoModel.obtenerProcesos();
        res.send(procesos);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.post('/procesos/:nom_proceso', async (req, res) => {
    try {
        const resultado = await procesoModel.agregarProceso(
            [
                req.params.nom_proceso
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la subclasificación' });
    }
});

app.put('/procesos/:id/:nom_proceso', async (req, res) => {
    try {
        const resultado = await procesoModel.modificarProceso(
            [
                req.params.id ||null, 
                req.params.nom_proceso || null,
                1
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el material' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el material' });
    }
});

app.delete('/procesos/:id/:nom_proceso', async (req, res) => {
    try {
        const resultado = await procesoModel.modificarProceso(
            [
                req.params.id ||null, 
                req.params.nom_proceso || null,
                0
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(200).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el material' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el material' });
    }
})

//Zona de los productos
app.get('/productos', async (req, res) => {
    try {
        const productos = await productoModel.obtenerProductos();
        res.send(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.post('/productos/:id_clasificacion/:id_subclasificacion/:id_tpmaterial/:id_unidad/:apl_inst/:precio_sin_inst/:precio_con_inst/:observaciones', async (req, res) => {
    try {
        const resultado = await productoModel.insertarProducto(
            [
                req.params.id_clasificacion ||null, 
                req.params.id_subclasificacion || null,
                req.params.id_tpmaterial || null, 
                req.params.id_unidad || null,
                req.params.apl_inst || null, 
                req.params.precio_sin_inst || null,
                req.params.precio_con_inst || null, 
                req.params.observaciones || null
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el producto' });
    }
});

app.put('/productos/:id/:id_clasificacion/:id_subclasificacion/:id_tpmaterial/:id_unidad/:apl_inst/:precio_sin_inst/:precio_con_inst/:observaciones', async (req, res) => {
    try {
        const resultado = await productoModel.modificarProducto(
            [
                req.params.id ||null, 
                req.params.id_clasificacion ||null, 
                req.params.id_subclasificacion || null,
                req.params.id_tpmaterial || null, 
                req.params.id_unidad || null,
                req.params.apl_inst || null, 
                req.params.precio_sin_inst || null,
                req.params.precio_con_inst || null, 
                req.params.observaciones || null,
                1
            ]);
        res.status(201).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
    
});

app.delete('/productos/:id/:id_clasificacion/:id_subclasificacion/:id_tpmaterial/:id_unidad/:apl_inst/:precio_sin_inst/:precio_con_inst/:observaciones', async (req, res) => {
    try {
        const resultado = await productoModel.modificarProducto(
            [
                req.params.id ||null, 
                req.params.id_clasificacion ||null, 
                req.params.id_subclasificacion || null,
                req.params.id_tpmaterial || null, 
                req.params.id_unidad || null,
                req.params.apl_inst || null, 
                req.params.precio_sin_inst || null,
                req.params.precio_con_inst || null, 
                req.params.observaciones || null,
                0
            ]);
        res.status(200).json({message:'Actualizado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
    
});

//Zona de las subclasificaciones
app.get('/subclasificaciones',async (req,res)=>{
    try{
        const subclasificaciones = await subclasificacionModel.obtenerSubclasificaciones();
        res.send(subclasificaciones);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


app.post('/subclasificaciones/:nom_subclasificacion/:des_subclasificacion', async (req, res) => {
    try {
        const resultado = await subclasificacionModel.insertarSubclasificacion(
            [
                req.params.nom_subclasificacion, 
                req.params.des_subclasificacion
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar la subclasificación' });
    }
});

app.put('/subclasificaciones/:id/:nom_subclasificacion/:des_subclasificacion', async (req, res) => {
    try {
        const resultado = await subclasificacionModel.modificarSubclasificacion(
            [
                req.params.id ||null, 
                req.params.nom_subclasificacion || null, 
                req.params.des_subclasificacion || null,
                1
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar la subclasificación' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la subclasificación' });
    }
});

app.put('/subclasificaciones/:id/:nom_subclasificacion/:des_subclasificacion', async (req, res) => {
    try {
        const resultado = await subclasificacionModel.modificarSubclasificacion(
            [
                req.params.id ||null, 
                req.params.nom_subclasificacion || null, 
                req.params.des_subclasificacion || null,
                0
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar la subclasificación' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la subclasificación' });
    }
});

//Zona de los tipos de cliente
app.get('/tipocliente',async (req,res)=>{
    try{
        const tiposCliente = await tipoClienteModel.obtenerTiposClientes();
        res.send(tiposCliente);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.post('/tipocliente/:nom_tipocliente/:des_tipocliente', async (req, res) => {
    try {
        const resultado = await tipoClienteModel.insertarTipoCliente(
            [
                req.params.nom_tipocliente, 
                req.params.des_tipocliente
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el tipo de cliente' });
    }
});

app.put('/tipocliente/:id/:nom_tipocliente/:des_tipocliente', async (req, res) => {
    try {
        const resultado = await tipoClienteModel.modificarTipoPago(
            [
                req.params.id ||null, 
                req.params.nom_tipocliente || null, 
                req.params.des_tipocliente || null
            ]);
        if (resultado[0].mensaje === 'Tipo de cliente actualizado correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el tipo de cliente' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el tipo de cliente' });
    }
});

//Zona de los tipos de pago
app.get('/tipopago',async (req,res)=>{
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

app.post('/tipopago/:nom_tipopago/:des_tipopago', async (req, res) => {
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

app.put('/tipopago/:id/:nom_tipopago/:des_tipopago', async (req, res) => {
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

app.delete('/tipopago/:id/:nom_tipopago/:des_tipopago', async (req, res) => {
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
        
//Zona de los tipos de trabajo
app.get('/tipotrabajo',async (req,res)=>{
    try{
        const tiposTrabajo = await tipoTrabajoModel.obtenerTiposTrabajo();
        res.send(tiposTrabajo);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.post('/tipotrabajo/:nom_tipotrabajo/:des_tipotrabajo', async (req, res) => {
    try {
        const resultado = await tipoTrabajoModel.insertarTipoTrabajo(
            [
                req.params.nom_tipotrabajo, 
                req.params.des_tipotrabajo
            ]);
        res.status(201).json({message:'Agregado con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el tipo de trabajo' });
    }
});

app.put('/tipotrabajo/:id/:nom_tipotrabajo/:des_tipotrabajo', async (req, res) => {
    try {
        const resultado = await tipoTrabajoModel.modificarTipoTrabajo(
            [
                req.params.id ||null, 
                req.params.nom_tipotrabajo || null, 
                req.params.des_tipotrabajo || null,
                1
            ]);
        if (resultado[0].mensaje === 'Tipo de trabajo actualizado correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el tipo de trabajo' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el tipo de trabajo' });
    }
});

app.delete('/tipotrabajo/:id/:nom_tipotrabajo/:des_tipotrabajo', async (req, res) => {
    try {
        const resultado = await tipoTrabajoModel.modificarTipoTrabajo(
            [
                req.params.id ||null, 
                req.params.nom_tipotrabajo || null, 
                req.params.des_tipotrabajo || null,
                0
            ]);
        if (resultado[0].mensaje === 'Tipo de trabajo actualizado correctamente.') {
            res.status(200).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el tipo de trabajo' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el tipo de trabajo' });
    }
});

//Zona de los tipos de venta
app.get('/tipoventa',async (req,res)=>{
    try{
        const tiposVenta = await tipoVentaModel.obtenerTiposVentas();
        res.send(tiposVenta);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.post('/tipoventa/:nom_tipos_venta/:des_tipos_venta', async (req, res) => {
    try {
        const resultado = await tipoVentaModel.insertarTipoVenta(
            [
                req.params.nom_tipos_venta, 
                req.params.des_tipos_venta
            ]);
        res.status(201).json({message:'Agregado con exito'});
        res.send(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el tipo de venta' });
    }
});

app.put('/tipoventa/:id/:nom_tipos_venta/:des_tipos_venta', async (req, res) => {
    try {
        const resultado = await tipoVentaModel.modificarTipoVenta(
            [
                req.params.id ||null, 
                req.params.nom_tipos_venta || null, 
                req.params.des_tipos_venta || null,
                1
            ]);
        if (resultado[0].mensaje === 'Tipo de venta actualizado correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el tipo de venta' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el tipo de venta' });
    }
});

app.delete('/tipoventa/:id/:nom_tipos_venta/:des_tipos_venta', async (req, res) => {
    try {
        const resultado = await tipoVentaModel.modificarTipoVenta(
            [
                req.params.id ||null, 
                req.params.nom_tipos_venta || null, 
                req.params.des_tipos_venta || null,
                0
            ]);
        if (resultado[0].mensaje === 'Tipo de venta actualizado correctamente.') {
            res.status(200).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar el tipo de venta' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el tipo de venta' });
    }
});

//Zona de las unidades
app.get('/unidad',async (req,res)=>{
    try{
        const unidades = await unidadModel.obtenerUnidades();
        res.send(unidades);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});


app.post('/unidad/:nom_unidad/:des_unidad', async (req, res)=>{
    try{
        const resultado = await unidadModel.insertarUnidad(
            [
                req.params.nom_unidad, 
                req.params.des_unidad
            ]
        );
        res.status(201).json({message:'Agregado con exito'});
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:'Error al ingresar la unidad'});
    }
})

app.put('/unidad/:id/:nom_unidad/:des_unidad', async (req, res) => {
    try {
        const resultado = await unidadModel.modificarUnidad(
            [
                req.params.id ||null, 
                req.params.nom_unidad || null, 
                req.params.des_unidad || null
            ]);
        if (resultado[0].mensaje === 'Clasificación actualizada correctamente.') {
            res.status(201).json({message:'Actualizado con exito'});
        } else {
            res.status(500).json({ error: 'No se pudo actualizar la clasificación' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la clasificación' });
    }
});

app.listen("3000",()=>console.log("El servidor esta corriendo en el puerto 3000"));