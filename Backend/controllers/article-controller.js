//una clase donde vamos a tener las diferentes rutas y metodos relacionadas con nuestrto backend

'use strict'


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
        console.log(params);

        //Validar Datos (validator)

        //Crear el objeto que vamos a guardar

        //Asignamos valores al objeto

        // Guardarmos el articulo

        return res.status(200).send({
            message: 'soy la accion save'
        });
    }


}; //end controller
    
//HACER UN MODULE EXPORT Y PODER UTILIZAR ESTE OBJETO CONTROLER FUERA DE ESTE ARCHIVO
//Y USAR TODOS ESTOS METODOS EN EL ARCHIVO DE RUTAS

module.exports = controller;









