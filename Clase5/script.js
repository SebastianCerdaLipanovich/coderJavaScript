//Quinto entregable del Curso JS
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

const crearAlumno = () =>{
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

//Ingresa todas tus notas
let cantidadNotas = 0;
let sumaNotas = 0;
let notaAlta = 0;
let notaBaja = 0;
let alumno = crearAlumno();
console.log(alumno);
alert(`Hola ${alumno.nombre}, voy a pedirte que vayas ingresando todas tus notas.
cuando hayas terminado de ingresarlas escribre CALCULAR`)
notaIngresada = pedirNota()
notaBaja = notaIngresada;
while (!esCalcular(notaIngresada)) {
    cantidadNotas++;
    sumaNotas += notaIngresada;
    if (notaIngresada > notaAlta) notaAlta = notaIngresada;
    if (notaIngresada < notaBaja) notaBaja = notaIngresada;
    notaIngresada = pedirNota();
}
if (cantidadNotas > 0) {
    let promedio = sacarPromedio();
    alumno.presentarse();
    alert(`Bueno ${alumno.nombre}, estos son tus resultados: \ningresaste ${cantidadNotas} notas y \ntu promedio es: ${promedio} \ntu nota mas alta fue un ${notaAlta} \ntu nota mas baja un ${notaBaja} \nGracias por usar mi programa!`)
} else {
    alert(`${alumno.nombre} no ingresaste ninguna nota. \npresiona F5 para reiniciar el programa`)
}
