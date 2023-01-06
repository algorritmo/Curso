//SERVIDOR WEB QUE PERMITE PROCESAR PETICIONES HTTP (AQUI SE CREAN RUTAS)

'use strict'

//CARGAR MODULES DE NODE PARA CREAR SERVIDOR
var express = require('express');
var bodyParser = require('body-parser');

//EJECUTAR EXPRESS (HTTP)
var app = express();

//CARGAR FICHEROS RUTAS
var article_routes = require('./routes/article-routes');

//CARGAR MIDDLEWARES (SE EJECUTA ANTES DE CARGAR UNA RUTA
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//CORS (PETICIONES DESDE EL FRONTEND)


//AÑADIR PREFIJOS DE RUTAS / CARGAR RUTAS
app.use('/api', article_routes);


//AÑADIR PREFIJOS A RUTAS


//EXPORTAR MODULO (FICHERO ACTUAL)
module.exports = app;