//Primer entregable del Curso JS

const ESPACIO = " ";
const MI_JUGADA = "Piedra"
//Preparando codigo para mejorar el juego
//var mi_jugada = Math.floor(Math.random() * (4-1)+1);
//alert(mi_jugada);

alert("Bienvenido a mi Tercer desafio, ES UN JUEGO")

let nombre = prompt("Cual es tu nombre?")
var su_jugada = prompt("Hola" + ESPACIO + nombre + ESPACIO + "escribe tu eleccion: Piedra, Papel o Tijera o Esc si no quieres jugar");

while (su_jugada != "Esc" && su_jugada != "esc" && su_jugada != "ESC") {
    if (su_jugada == "Piedra" || su_jugada == "piedra" || su_jugada == "PIEDRA") {
        alert("EMPATAMOS! yo tambien elegi Piedra")
    } else if (su_jugada == "Papel" || su_jugada == "papel" || su_jugada == "PAPEL") {
        alert("ME GANASTE! yo elegi Piedra :(")
    } else if (su_jugada == "Tijera" || su_jugada == "tijera" || su_jugada == "TIJERA") {
        alert("PERDISTE! yo elegi Piedra! :)")
    } else {
        alert("Perdon" + ESPACIO + nombre + ", no entendi lo que escribiste")
    }
    var su_jugada = prompt("Jugamos de nuevo? escribe tu eleccion: Piedra, Papel o Tijera o Esc para finalizar");
}

alert("Hasta la proxima" + ESPACIO + nombre)
