const conexion = require('../.env/conexion');

class EstatusCobranzaModel
{
    constructor()
    {
        this.conexion =  conexion;
    }

    obtenerEstatusCobranza()
    {
       return new Promise((resolve, reject) =>
       {
           this.conexion.execute('call consulta_estatusCobranza("")', (error, resultados) =>
           {
               if (error) return reject(error);
               resolve(resultados[0]);
           });
       });
    }

    obtenerEstatusCobranzaId(identificador)
    {
       return new Promise((resolve, reject) =>
       {
           this.conexion.execute('call consulta_estatusCobranza_ID(?)', 
            [identificador], 
            (error, resultados) =>
           {
               if (error) return reject(error);
               resolve(resultados[0]);
           });
       });
    }

    insertarEstatusCobranza(estatusCobranza)
    {
        return new Promise((resolve, reject) =>{
            this.conexion.execute('call agg_estatusCobranza(?, ?)', 
                estatusCobranza, (error, resultados) =>
                {
                    if (error) return reject(error);
                    resolve(resultados[0]);
                });
    });
    }

    modificarEstatusCobranza(estatusCobranza)
    {
        return new Promise((resolve, reject) =>{
            this.conexion.execute('call modificar_estCobranza(?, ?, ?)', estatusCobranza, (error, resultados) =>
            {
                if (error) return reject(error);
                resolve(resultados[0]);
            });
        });
    }

    borrarEstatusCobranza(estatusCobranza)

    {
        return new Promise((resolve, reject) =>{
            this.conexion.execute('call baja_estCobranza(?)', estatusCobranza, (error, resultados) =>
            {
                if (error) return reject(error);
                resolve(resultados[0]);
            });
        });
    }
}

module.exports = {EstatusCobranzaModel};