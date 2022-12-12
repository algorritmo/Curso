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

//Condicionales
if(altura >=190){
    datos.innerHTML += '<h1>Eres una persona alta</h1>';
}else{  
    datos.innerHTML += '<h1>Eres una persona baja</h1>';
}


//bucle for
for(i = 1997; i <= 2020; i++){
    datos.innerHTML += "<h2>Esto son los años que han pasado desde que naciste: " + i;
} */

//Funcion
function MuestraMiNombre(nombre, altura){

    var datos = document.getElementById("datos");

    datos.innerHTML = `<h1>Soy la caja de datos</h1>
    <h2>mi nombre es: ${nombre} </h2>
    <h2>mi altura es: ${altura} cm </h2>`;  
};

MuestraMiNombre('Juan Camilo Aragon Garcia', 234);