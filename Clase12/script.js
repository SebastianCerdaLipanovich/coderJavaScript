/******************************************************
 *          CLASES
 ******************************************************/
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
                    sumaNotas += parseInt(examen.nota);
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

/******************************************************
 *          FUNCIONES
 ******************************************************/

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
    return (ingreso >= 0 && ingreso <= 10 && regexp.test(ingreso));
};

var regexp = /^\d+(\.\d{1,2})?$/;

/******************************************************
 *          VARIABLES
 ******************************************************/

let listaAlumnos = [];


/******************************************************
 *          EVENTOS
 ******************************************************/

$(() => {
    $('body').css('display', 'none');
    $('body').fadeIn(1000);

    if ((localStorage.getItem('alumno')) && (document.getElementById("btnCrearAlumno"))) {
        let alumno = new Alumno(JSON.parse(localStorage.getItem('alumno')).nombre, JSON.parse(localStorage.getItem('alumno')).apellido, JSON.parse(localStorage.getItem('alumno')).carrera, JSON.parse(localStorage.getItem('alumno')).notas)
        document.getElementById("nombreInput").value = alumno.nombre;
        document.getElementById("nombreInput").setAttribute("disabled", true);
        document.getElementById("apellidoInput").value = alumno.apellido;
        document.getElementById("apellidoInput").setAttribute("disabled", true);
        document.getElementById("carreraInput").value = alumno.carrera;
        document.getElementById("carreraInput").setAttribute("disabled", true);
        document.getElementById("mensajeLogin").innerHTML = `Continua ingresando examenes para este alumno o <a id="cierraSesion" href="#">cierra sesion</a>`
        document.getElementById("btnCrearAlumno").innerHTML = "Ingresar Examen"
        document.getElementById("btnCrearAlumno").setAttribute("type", "button");
        document.getElementById("cierraSesion").onclick = () => {
            localStorage.removeItem("alumno");
            $("body").fadeOut(1000, function () {
                location.reload();;
            });
        };
    };

    if (document.getElementById("btnCrearAlumno")) {
        document.getElementById("btnCrearAlumno").onclick = () => {
            let nombre = document.getElementById("nombreInput").value.toUpperCase();
            let apellido = document.getElementById("apellidoInput").value.toUpperCase();
            let carrera = document.getElementById("carreraInput").value.toUpperCase();

            if (nombre && apellido && carrera) {
                if (localStorage.getItem('alumno')) {
                    $("body").fadeOut(1000, function () {
                        location.href = "../Clase12/views/examenes.html";
                    });

                } else {
                    localStorage.setItem('alumno', JSON.stringify(new Alumno(nombre, apellido, carrera)));
                    document.getElementById("btnCrearAlumno").setAttribute("type", "button");
                    $("body").fadeOut(1000, function () {
                        location.href = "../Clase12/views/examenes.html";
                    });
                }
            };
        };
    };

    if (document.getElementById('mensajeNotas')) {
        let alumno = new Alumno(JSON.parse(localStorage.getItem('alumno')).nombre, JSON.parse(localStorage.getItem('alumno')).apellido, JSON.parse(localStorage.getItem('alumno')).carrera, JSON.parse(localStorage.getItem('alumno')).notas);
        document.getElementById('mensajeNotas').innerHTML = `Ingresando nuevo examen para ${alumno.nombre} ${alumno.apellido}`;
    };

    if (document.getElementById("btnCrearExamen")) {
        document.getElementById("btnCrearExamen").onclick = () => {
            let materia = document.getElementById("materiaInput").value.toUpperCase();
            let nota = document.getElementById("notaInput").value;
            if (localStorage.getItem('alumno')) {
                let alumno = new Alumno(JSON.parse(localStorage.getItem('alumno')).nombre, JSON.parse(localStorage.getItem('alumno')).apellido, JSON.parse(localStorage.getItem('alumno')).carrera, JSON.parse(localStorage.getItem('alumno')).notas);
                if (esValido(nota) && materia) {
                    alumno.agregarNota(new Examen(materia, nota));
                    localStorage.setItem('alumno', JSON.stringify(alumno));
                };
            };
        };
    };

    //Nueva funcion con JQUERY, Abajo comentada la vieja en JS Vainilla
    if ($("#examenesTable")) {
        let alumno = new Alumno(JSON.parse(localStorage.getItem('alumno')).nombre, JSON.parse(localStorage.getItem('alumno')).apellido, JSON.parse(localStorage.getItem('alumno')).carrera, JSON.parse(localStorage.getItem('alumno')).notas);
        let examenesTable = $("#examenesTable");
        for (const examen of alumno.notas) {
            let tr = document.createElement("tr");
            for (const key in examen) {
                if (examen.hasOwnProperty.call(examen, key)) {
                    const element = examen[key];
                    let td = document.createElement("td");
                    let tdText = document.createTextNode(`${element}`);
                    td.appendChild(tdText);
                    tr.appendChild(td);
                };
            };
            examenesTable.append(tr);
        };
        if (alumno.notas.length > 0) {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            let tdText = document.createTextNode(`PROMEDIO GENERAL`);
            td.appendChild(tdText);
            tr.appendChild(td);
            examenesTable.append(tr);
            td = document.createElement("td");
            tdText = document.createTextNode(`${alumno.sacarPromedioGeneral()}`);
            td.appendChild(tdText);
            tr.appendChild(td);
            examenesTable.append(tr);
        };
    };
    //Vieja funcion en JS Vainilla
    /* if (document.getElementById("examenesTable")) {
        let alumno = new Alumno(JSON.parse(localStorage.getItem('alumno')).nombre, JSON.parse(localStorage.getItem('alumno')).apellido, JSON.parse(localStorage.getItem('alumno')).carrera, JSON.parse(localStorage.getItem('alumno')).notas);
        let examenesTable = document.getElementById("examenesTable");
        for (const examen of alumno.notas) {
            let tr = document.createElement("tr");
            for (const key in examen) {
                if (examen.hasOwnProperty.call(examen, key)) {
                    const element = examen[key];
                    let td = document.createElement("td");
                    let tdText = document.createTextNode(`${element}`);
                    td.appendChild(tdText);
                    tr.appendChild(td);
                };
            };
            examenesTable.appendChild(tr);
        };
        if (alumno.notas.length > 0) {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            let tdText = document.createTextNode(`PROMEDIO GENERAL`);
            td.appendChild(tdText);
            tr.appendChild(td);
            examenesTable.appendChild(tr);
            td = document.createElement("td");
            tdText = document.createTextNode(`${alumno.sacarPromedioGeneral()}`);
            td.appendChild(tdText);
            tr.appendChild(td);
            examenesTable.appendChild(tr);
        };
    
    };
     */


});

