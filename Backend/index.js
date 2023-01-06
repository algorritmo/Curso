//ARCHIVO CON CONEXION A LA BD Y CREAREMOS EL SERVIDOR
'use strict'

"user strict";  
var mongoose = require("mongoose");
var app = require('./app');
var port = 3900
var url = "mongodb://127.0.0.1:27017/api_rest_blog";

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log("Se ha realizado la conexión a la base de datos exitosamente !"); 

    //Craer servidor y escuchar peticiones HTTP
    app.listen(port, () => {
        console.log('Servidor corriendo en http://localhost: '+ port)
    })
}); 