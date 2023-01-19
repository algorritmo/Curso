//

'use strict'

var express = require('express');
var ArticleController =  require('../controllers/article-controller');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './upload/articles'});

//Rutas de prueba
router.post('/datos-curso', ArticleController.datosCurso);
router.get('/test-de-controlador', ArticleController.test);

//Rutas para articulos utiles
router.post('/save', ArticleController.save);

//ruta para retornar datos last es para que traiga los ultimos 5 arts
router.get('/articles/:last?', ArticleController.getArticles);

//ruta para retornar 1 dato
router.get('/article/:id', ArticleController.getArticle);

//ruta para actualizar dato
router.put('/article/:id', ArticleController.update);

//ruta para eliminar dato
router.delete('/article/:id', ArticleController.delete);

//ruta para subir archivos
router.post('/upload-image/:id', md_upload,  ArticleController.upload);

//ruta para obtener la imagen del backend
router.get('/get-image/:image', ArticleController.getImage);

//ruta para buscar cualquier articulo
router.get('/search/:search', ArticleController.search);

module.exports = router;



//GET: SACAR DATOS DE LA BD
//POST: PARA GUARDAR EN LA BD O ENVIAR DATOS AL BACKEND
//PUT: PARA ACTUALIZAR
//DELETE PARA BORRAR