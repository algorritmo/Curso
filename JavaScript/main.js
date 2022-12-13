//alertas
//alert('Hola munso');
/*
//variables
var nombre = "juan camilo aragon";
var altura = 190;


var concatenar = nombre + " " + altura

//para mostrar en pantalla las variables
//document.write(nombre + " " + altura);

//para obtener el id del componente en html y ponerle el texto
var datos = document.getElementById("datos");
datos.innerHTML = concatenar;

//TemplateString colocar todo el html en javascript
datos.innerHTML = `<h1>Soy la caja de datos</h1>
                    <h2>mi nombre es: ${nombre} </h2>
                    <h2>mi altura es: ${altura} cm </h2>

`;

//-----------------------------------------------------------

//Condicionales
if(altura >=190){
    datos.innerHTML += '<h1>Eres una persona alta</h1>';
}else{  
    datos.innerHTML += '<h1>Eres una persona baja</h1>';
}

//-----------------------------------------------------------

//bucle for
for(i = 1997; i <= 2020; i++){
    datos.innerHTML += "<h2>Esto son los años que han pasado desde que naciste: " + i;
} */

//-----------------------------------------------------------

//Funcion
function MuestraMiNombre(nombre, altura){
    var misDatos  = `
    <h1>Soy la caja de datos</h1>
    <h2>mi nombre es: ${nombre} </h2>
    <h2>mi altura es: ${altura} cm </h2>`;
    
    return misDatos;
}

function imprimir(){
    var datos = document.getElementById("datos");
    datos.innerHTML = MuestraMiNombre('Juan Camilo Aragon Garcia', 234);
}

imprimir();

//MuestraMiNombre('Juan Camilo Aragon Garcia', 234);
 
//-----------------------------------------------------------------

//COLECCION DE DATOS ARRAYS

var nombres = ['Carlos', 'Jorge', 'Antonio'];

//alert(nombres[2]);

document.write('<h3> Listado de nombres </h3>')
/*
for(i = 0; i < nombres.length; i++){
    document.write(nombres[i] + '<br/>');
}*/

//funcion de calbat anonima (funcion que se ejecuta dentro de otra)

nombres.forEach((nombre) => {
    document.write(nombre + '<br/>')
});

//-----------------------------------------------

//Objetos

var coche = {
    modelo: 'Mercedes Clase A',
    maxima: 500,
    antiguedad: 2020,
    mostrarDatos(){
        console.log(this.modelo, this.maxima, this.antiguedad);
    },
    propiedad1: 'valoraleatorio' 

}

document.write("<h1>"+coche.antiguedad+"</h1>");

coche.mostrarDatos();

//-----------------------------------------------

//PROMERSAS: Captura la respuesta positiva o rechazo de un servicio o peticion ajax

var saludar = new Promise((resolve, reject) => {

    setTimeout(() => {
        let = saludo = "Hola muy buenas a todos";

        if(saludo){
            resolve(saludo);
        }else{
            reject(saludo);
        }
        
    }, 2000)
});

saludar.then(resultado => {
    alert(resultado);
})

//para capturar el error
.catch(err => {
    alert(err);
})