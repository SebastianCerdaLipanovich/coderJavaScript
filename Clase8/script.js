//Septimo entregable del Curso JS
class Alumno {
    constructor(nombre, apellido, carrera, notas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.carrera = carrera;
        if (notas) {
            this.notas = notas;
        } else {
            this.notas = [];
        };

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

let alumno;
if (localStorage.getItem('alumno')) {
    let storageAlumno = localStorage.getItem('alumno');
    alumno = new Alumno(JSON.parse(storageAlumno).nombre, JSON.parse(storageAlumno).apellido, JSON.parse(storageAlumno).carrera, JSON.parse(storageAlumno).notas);
} else {
    alumno = crearAlumno();
    localStorage.setItem('alumno', JSON.stringify(alumno));
}
alert(`Hola ${alumno.nombre}, voy a pedirte que vayas ingresando todas tus notas aclarando materia y nota`);
alumno.agregarNota(crearExamen());
localStorage.setItem('alumno', JSON.stringify(alumno));
let continuar = esContinuar(prompt("Deseas continuar? Y/N").toUpperCase());
while (continuar) {
    alumno.agregarNota(crearExamen());
    localStorage.setItem('alumno', JSON.stringify(alumno));
    continuar = esContinuar(prompt("Deseas continuar? Y/N").toUpperCase());
};
let h2 = document.createElement('h2');
h2.innerHTML = `${alumno.nombre} ${alumno.apellido}`
document.body.appendChild(h2);
let h3 = document.createElement('h3');
h3.innerHTML = `${alumno.carrera}`
document.body.appendChild(h3);
for (const examen of alumno.notas) {
    let div = document.createElement("div");
    div.innerHTML = `<h2>${examen.materia}</h2>
                     <p class="nota">${examen.nota}</p>
                     <hr>`;
    document.body.appendChild(div);
}
let div = document.createElement("div");
div.innerHTML = `<h2>PROMEDIO GENERAL</h2>
                 <p>${alumno.sacarPromedioGeneral()}</p>
                 <hr>`;
document.body.appendChild(div);
notas = document.querySelectorAll(".nota");
notas.forEach(nota => {
    if (parseFloat(nota.innerHTM) < 6) {
        nota.style.color = "red";
    }
});