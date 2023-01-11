//EL MODELO ES UNA CLASE QUE NOS DA UN MOLDE PARA UTILZAR LOS DISTINTOS OBJETOS DE ESE MODELO
//MODELO CARRO, OBJETOS LLANTA, ESPEJOS, MOTOR, ASIENTOS ETC
// ES UN MODEL PARA PODER CREAR MAS ARTICULOS
//ES IMPORTANTE QUE POR CADA COLECCION D EDATOS QUE TENGAMOS TENGAMOS UN MODELO PARA INTERACTUAR CON LA BASE DE DATOS
'use strict'

const { REPL_MODE_SLOPPY } = require("repl");

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleShema = Schema({
    title: String,
    content: String,
    date: {type: Date, default: Date.now},
    image: String
});

//aqui es singular pero en mongodb lo guarda como articles --> guarda documentos de este tipo y con etructura dentro de la coleccion
module.exports = mongoose.model('Article', ArticleShema);
