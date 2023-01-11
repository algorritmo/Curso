//una clase donde vamos a tener las diferentes rutas y metodos relacionadas con nuestrto backend

'use strict'

var validator = require('validator');
var Article = require('../models/article-model');

var controller ={
    datosCurso: (req, res) => {
    
    var hola = req.body.hola;
   
    //devolvemos un json
    return res.status(200).send({
        curso: 'Master en framerworks',
        nombre: 'Juan Camilo Aragon',
        url: 'conagon.com',
        hola     
    });
    

    },
    
    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la accion test de mi controlador de artiuclos'
        });
    },

    //Controlador para guardar articulos
    save: (req, res) => {
        //Recogemos los aprametreos por post (lo que el usuario nos enviar por la peticion)
        var params = req.body;
      
        //Validar Datos (validator)
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch(err){
            return res.status(200).send({
                message: 'Faltan datos por enviar'
            });
        }

        if(validate_title && validate_content){
            return res.status(200).send({
                message: 'Validacion correcta'
            }); 
        }

        //Crear el objeto que vamos a guardar 

        //Asignamos valores al objeto

        // Guardarmos el articulo

    }


}; //end controller
    
//HACER UN MODULE EXPORT Y PODER UTILIZAR ESTE OBJETO CONTROLER FUERA DE ESTE ARCHIVO
//Y USAR TODOS ESTOS METODOS EN EL ARCHIVO DE RUTAS

module.exports = controller;









