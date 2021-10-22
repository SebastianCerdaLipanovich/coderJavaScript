//Secto entregable del Curso JS
class Alumno {
    constructor(nombre, apellido, carrera) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.carrera = carrera;

        this.presentarse = () => {
            alert(`Hola soy ${nombre} ${apellido} y estoy estudiando ${carrera}`);
        };
    }
}

const crearAlumno = () => {
    let nombre = prompt("Cual es tu nombre?");
    let apellido = prompt("Cual es tu apellido?");
    let carrera = prompt("Que carrera estas cursando?");

    return new Alumno(nombre, apellido, carrera);
}

function pedirNota() {
    let ingreso = prompt(`Ingresa tu ${cantidadNotas + 1} nota:`);
    while (!esCalcular(ingreso) && (!esValido(ingreso))) {
        alert("INGRESO NO VALIDO \nIntente de nuevo");
        ingreso = prompt(`Ingresa tu ${cantidadNotas + 1} nota:`);
    }
    if (esCalcular(ingreso)) {
        return ingreso
    } else {
        ingreso = parseFloat(ingreso);
        return Math.round((ingreso + Number.EPSILON) * 100) / 100;
    }
};

function sacarPromedio() {
    return Math.round((sumaNotas / cantidadNotas + Number.EPSILON) * 100) / 100;
}

function esCalcular(ingreso) {
    return ingreso == "Calcular" || ingreso == "calcular" || ingreso == "CALCULAR"
}

function esValido(ingreso) {
    return !(isNaN(parseFloat(ingreso)) || parseFloat(ingreso) > 10 || parseFloat(ingreso) < 0);
}

function mostrarNotasOrdenadas(orden) {
    switch (orden) {
        case "a":
            notas.sort(function (a, b) { return a - b });
            alert("Mostrando tus notas en forma ascendente:\n" + notas.join(`\n`));
            break;
        case "b":
            alert("Mostrando tus notas en forma descendente:\n" + notas.sort(function (a, b) { return b - a }).join(`\n`));
            break;
        case "c":
            alert("Mostrando tus notas en la forma en que fueron ingresadas:\n" + notas.join(`\n`));
            break;
    }
}

//Ingresa todas tus notas
let cantidadNotas = 0;
let sumaNotas = 0;
let notaAlta = 0;
let notaBaja = 0;
let alumno = crearAlumno();
let notas = [];
console.log(alumno);
alert(`Hola ${alumno.nombre}, voy a pedirte que vayas ingresando todas tus notas.
cuando hayas terminado de ingresarlas escribre CALCULAR`)
notaIngresada = pedirNota()
notaBaja = notaIngresada;
while (!esCalcular(notaIngresada)) {
    cantidadNotas++;
    notas.push(notaIngresada);
    sumaNotas += notaIngresada;
    if (notaIngresada > notaAlta) notaAlta = notaIngresada;
    if (notaIngresada < notaBaja) notaBaja = notaIngresada;
    notaIngresada = pedirNota();
}
if (cantidadNotas > 0) {
    let promedio = sacarPromedio();
    alumno.presentarse();
    alert(`Bueno ${alumno.nombre}, estos son tus resultados: \ningresaste ${cantidadNotas} notas y \ntu promedio es: ${promedio} \ntu nota mas alta fue un ${notaAlta} \ntu nota mas baja un ${notaBaja}`);
    let orden = prompt(`${alumno.nombre}, Como deseas ver tus notas? \nA)Forma ascendente\nB)Forma descendete\nC)En el orden que fue ingresado`).toLocaleLowerCase();
    while(orden!="a" && orden!="b" && orden!="c"){
        orden = prompt(`INGRESO INCORRECTO \n${alumno.nombre}, Como deseas ver tus notas? \nA)Forma ascendente\nB)Forma descendete\nC)En el orden que fue ingresado`).toLocaleLowerCase();
    }
    mostrarNotasOrdenadas(orden);
} else {
    alert(`${alumno.nombre} no ingresaste ninguna nota. \npresiona F5 para reiniciar el programa`)
}
