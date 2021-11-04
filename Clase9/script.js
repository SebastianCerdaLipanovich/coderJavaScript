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

/******************************************************
 *          FUNCIONES
 ******************************************************/

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

/******************************************************
 *          VARIABLES
 ******************************************************/

let listaAlumnos = [];


/******************************************************
 *          EVENTOS
 ******************************************************/

if (document.getElementById("btnCrearAlumno")) {
    document.getElementById("btnCrearAlumno").onclick = () => {
        let nombre = document.getElementById("nombreInput").value.toUpperCase();
        let apellido = document.getElementById("apellidoInput").value.toUpperCase();
        let carrera = document.getElementById("carreraInput").value.toUpperCase();

        localStorage.setItem('alumno', JSON.stringify(new Alumno(nombre, apellido, carrera)));
        location.href = "../Clase9/views/examenes.html";
    };
};

if (document.getElementById('nombreAlumnoActivo')) {
    let alumno = new Alumno(JSON.parse(localStorage.getItem('alumno')).nombre, JSON.parse(localStorage.getItem('alumno')).apellido, JSON.parse(localStorage.getItem('alumno')).carrera, JSON.parse(localStorage.getItem('alumno')).notas);
    document.getElementById('nombreAlumnoActivo').innerHTML = alumno.nombre + " " + alumno.apellido;
};

if (document.getElementById("btnCrearExamen")) {
    document.getElementById("btnCrearExamen").onclick = () => {
        let materia = document.getElementById("materiaInput").value.toUpperCase();
        let nota = document.getElementById("notaInput").value;
        if (localStorage.getItem('alumno')) {
            let alumno = new Alumno(JSON.parse(localStorage.getItem('alumno')).nombre, JSON.parse(localStorage.getItem('alumno')).apellido, JSON.parse(localStorage.getItem('alumno')).carrera, JSON.parse(localStorage.getItem('alumno')).notas);
            alumno.agregarNota(new Examen(materia, nota));
            localStorage.setItem('alumno', JSON.stringify(alumno));
        }
    };
};

if(document.getElementById("examenesTable")){
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
            }
        }
        examenesTable.appendChild(tr);
    }
    
};

function genera_tabla() {
    // Obtener la referencia del elemento body
    var body = document.getElementsByTagName("body")[0];
  
    // Crea un elemento <table> y un elemento <tbody>
    var tabla   = document.createElement("table");
    var tblBody = document.createElement("tbody");
  
    // Crea las celdas
    for (var i = 0; i < 2; i++) {
      // Crea las hileras de la tabla
      var hilera = document.createElement("tr");
  
      for (var j = 0; j < 2; j++) {
        // Crea un elemento <td> y un nodo de texto, haz que el nodo de
        // texto sea el contenido de <td>, ubica el elemento <td> al final
        // de la hilera de la tabla
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode("celda en la hilera "+i+", columna "+j);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
      }
  
      // agrega la hilera al final de la tabla (al final del elemento tblbody)
      tblBody.appendChild(hilera);
    }
  
    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
  }
/* let alumno;
if (localStorage.getItem('alumno')) {
    let storageAlumno = localStorage.getItem('alumno');
    alumno = new Alumno(JSON.parse(storageAlumno).nombre, JSON.parse(storageAlumno).apellido, JSON.parse(storageAlumno).carrera, JSON.parse(storageAlumno).notas);
} else {
    document.getElementById(nombreInput);
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
}); */