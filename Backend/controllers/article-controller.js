//una clase donde vamos a tener las diferentes rutas y metodos relacionadas con nuestrto backend

'use strict'

const { stat } = require('fs');
var validator = require('validator');
//libreria modulos para validar imagenes
var fs = require('fs');
var path = require('path');

const { update } = require('../models/article-model');
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
        var query = Article.find({});
        var last = req.params.last;

        //cuando va a la url articles/:1 retorna los ultimos 5 arts
        if(last || last != undefined){
            query.limit(5);   
        }

        //Retorna los articulos en orden desc
        query.sort('-_id').exec((err, articles) => {
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

        
    },

    //METODO PARAR RETORNAR EL ARTICULO CUANDO LO BUSCAN POR ID
    getArticle: (req, res) => {
        //recoger el id de la url
        var articleId = req.params.id;

        //comprobar que existe
        if(!articleId || articleId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo'
            }); 
        }

        //buscar articulo
        Article.findById(articleId, (err, article) =>{
          
            if(err || !article){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo'
                });  
            }

            return res.status(404).send({
                status: 'succes',
                article
            }); 

        });

        
    },

    //METODO PARA ACTUALIZAR EL ARTICULO

    update: (req, res) =>{
        //RECOGER EL ID DEL ARTICULO QUE LLEGA POR LA URL
        var articleId = req.params.id;

        //Recoger los datos que llegan por put
        var params = req.body;

        //Validar los datos
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        }catch(err){
            return res.status(404).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });   
        }


        if(validate_title && validate_content){
            //Find(buscar) and update(actualizar)
            Article.findOneAndUpdate({_id: articleId}, params, {new:true}, (err, articleUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar' 
                    });  
                }
                
                if(!articleUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo'
                    });  
                }

                //Devolver la respuesta 
                return res.status(200).send({
                    status: 'success',
                    message: articleUpdated
                });  
            });
        }else{
            return res.status(404).send({
                status: 'error',
                 message: 'La validación no es correcta'
            });  
        }        
    },

    //METODO PARA ELIMINAR ARTICULO
    delete: (req, res) => {
        //recoger el id de la url
        var articleId = req.params.id;

        //Find y delete
        Article.findOneAndDelete({_id: articleId}, (err, articleRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar!!!'
                })
            }
            
            if(!articleRemoved){
                return res.status(404).send({
                    status: 'error',
                     message: 'No se ha borrado el articulo, posiblemente no existe !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            });
              
        });
     
    },

    //METODO DE SUBIDA DE ARCHIVOS
    upload: (req, res) => {

        //Configurar el modulo de connect multyparty router/articles.js (ESTO SE HABILITA PARA RECOGER LO QUE LLEGUE POR FILES)
        // Recoger el fichero de peticion
        var file_name = 'Imagen no subida...'

        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }
        //Conseguir nombre y la extension del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        //nombre del archivo
        var file_name = file_split[2];

        //extensiond el fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        //comprobar la extension, solo imagenes, si es valida borrar el fichero
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
            //borrar el archivo subido
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    satus: 'error',
                    massage: 'La extension de la imagen no es valida !!'
                });        
            });
        }else{
            //si todo es valido
            var articleId = req.params.id;

            //buscar el articulo, asignarle el nombre de la imagen y actualizarlo
            Article.findByIdAndUpdate({_id: articleId}, {image: file_name}, {new:true}, (err, articleUpdated) => {

                if(err || !articleUpdated){
                    return res.status(200).send({
                        status: 'error',
                        message: 'Error al guardar la imagen del articulo !!!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated 
                });

            });

        }

        //METODO PARA SACAR LA IMAGEN DEL BACKEND
   
    }, // end upload file

    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/articles/'+file;
        fs.stat(path_file, (err, exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe la imagen' 
                })
            }
        })        
            
    },

    search: (req, res) => {
        //sacar el string para mostrar
        var searchString = req.params.search;

        //Buscar clausaa or ya sea que encuentr por el titulo o por el contenido
        Article.find({ "$or": [
            {"title": {"$regex": searchString, "$options": "i"}},
            {"content": {"$regex": searchString, "$options": "i"}}
        ]}).sort([['date', 'descending']])
        .exec((err, articles) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la peticion' 
                });  
            }

            if(!articles  || articles.length <= 0 || articles.isEmpty ){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos con ese contenido' 
                });  
            }

            return res.status(404).send({
                status: 'success',
                articles
            });  
        })

    }

}; //end controller
    
//HACER UN MODULE EXPORT Y PODER UTILIZAR ESTE OBJETO CONTROLER FUERA DE ESTE ARCHIVO
//Y USAR TODOS ESTOS METODOS EN EL ARCHIVO DE RUTAS
module.exports = controller;









