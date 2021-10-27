//Secto entregable del Curso JS
class Alumno {
    constructor(nombre, apellido, carrera) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.carrera = carrera;
        this.notas = [];

        this.agregarNota = (examen) => {
            this.notas.push(examen);
        };

        this.sacarPromedioGeneral = () => {
            if (this.notas.length === 0) {
                return 0;
            } else {
                let sumaNotas = 0;
                this.notas.forEach(examen => {
                    sumaNotas += examen.nota;
                });
                return Math.round((sumaNotas / this.notas.length + Number.EPSILON) * 100) / 100;
            }

        }

        this.mostrarMateriasOrdenadas = (orden) => {
            let listaMaterias = [];
            switch (orden) {
                case "a":
                    this.notas.sort((a, b) => (a.materia < b.materia) ? 1 : ((b.materia < a.materia) ? -1 : 0));
                    this.notas.forEach(examen => {
                        if (listaMaterias.indexOf(examen.materia) == -1) {
                            listaMaterias.push(examen.materia);
                        }
                    });
                    alert("Mostrando tus materias en forma ascendente:\n" + listaMaterias.join(`\n`));
                    break;
                case "b":
                    this.notas.sort((a, b) => (a.materia > b.materia) ? 1 : ((b.materia > a.materia) ? -1 : 0));
                    this.notas.forEach(examen => {
                        if (listaMaterias.indexOf(examen.materia) == -1) {
                            listaMaterias.push(examen.materia);
                        }
                    });
                    alert("Mostrando tus materias en forma descendente:\n" + listaMaterias.join(`\n`));
                    break;
            }
        }
    }
};
class Examen {
    constructor(materia, nota) {
        this.materia = materia;
        this.nota = nota;
    };
};
function crearAlumno() {
    let nombre = prompt("Cual es tu nombre?").toUpperCase();
    let apellido = prompt("Cual es tu apellido?").toUpperCase();
    let carrera = prompt("Que carrera estas cursando?").toUpperCase();

    return new Alumno(nombre, apellido, carrera);
};
function crearExamen() {
    let materia = prompt("A que materia pertenece este examen?").toUpperCase();
    let nota = pedirNota(materia);

    return new Examen(materia, nota);
};
function pedirNota(materia) {
    let ingreso = prompt(`Cual fue la nota del examen de ${materia}?`);
    while (!esValido(ingreso)) {
        alert("INGRESO NO VALIDO \nIntente de nuevo");
        ingreso = prompt(`Cual fue la nota del examen de ${materia}?`);
    }
    ingreso = parseFloat(ingreso);
    return Math.round((ingreso + Number.EPSILON) * 100) / 100;
};
function esContinuar(ingreso) {
    while (ingreso != "N" && ingreso != "Y") {
        alert("INGRESO NO VALIDO \nIntente de nuevo");
        ingreso = prompt("Deseas continuar? Y/N").toUpperCase();
    }
    if (ingreso === "Y") {
        return true;
    } else if (ingreso === "N") {
        return false;
    }
};
function esValido(ingreso) {
    return !(isNaN(parseFloat(ingreso)) || parseFloat(ingreso) > 10 || parseFloat(ingreso) < 0);
};

let alumno = crearAlumno();
alert(`Hola ${alumno.nombre}, voy a pedirte que vayas ingresando todas tus notas aclarando materia y nota`);
alumno.agregarNota(crearExamen());
let continuar = esContinuar(prompt("Deseas continuar? Y/N").toUpperCase());
while (continuar) {
    alumno.agregarNota(crearExamen());
    continuar = esContinuar(prompt("Deseas continuar? Y/N").toUpperCase());
}
alert(`${alumno.nombre} tu promedio es:` + alumno.sacarPromedioGeneral());
let orden = prompt(`${alumno.nombre}, Como deseas ver tus materias? \nA)Forma ascendente\nB)Forma descendete`).toLocaleLowerCase();
while (orden != "a" && orden != "b") {
    orden = prompt(`INGRESO INCORRECTO \n${alumno.nombre}, Como deseas ver tus materias? \nA)Forma ascendente\nB)Forma descendete`).toLocaleLowerCase();
}
alumno.mostrarMateriasOrdenadas(orden);
