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
            
            //Crear el objeto que vamos a guardar 
            var  article = new Article();

            //Asignamos valores al objeto
            article.title = params.title;
            article.content = params.content;
            //fecha se guarda automatica
            article.image = null;
        

            // Guardarmos el articulo
            article.save((err, articleStored) => {

                if(err || !articleStored){
                    return res.status(400).send({
                        status: 'error',
                        message: 'Articulo no se ha guardado!!!'
                    }); 
                }
                //Devolver el articulo
                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                }); 
            });


           

        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }

    },

    //METODO PARA RETORNAR TODOS LOS ARTICULOS DE LA BD

    getArticles: (req, res) => {

        

        Article.find({}).sort('-_id').exec((err, articles) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver articulos'

                }); 
            }

            if(!articles){
                return res.status(404).send({
                    status: 'error',
                    message: 'Error al devolver articulos'

                }); 
            }


            return res.status(200).send({
                status: 'succes',
                articles
            }); 
        });

        
    }


}; //end controller
    
//HACER UN MODULE EXPORT Y PODER UTILIZAR ESTE OBJETO CONTROLER FUERA DE ESTE ARCHIVO
//Y USAR TODOS ESTOS METODOS EN EL ARCHIVO DE RUTAS

module.exports = controller;









