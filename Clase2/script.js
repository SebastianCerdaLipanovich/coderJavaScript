//Primer entregable del Curso JS

const ESPACIO = " ";
const MI_JUGADA = "Piedra"
alert("Bienvenido a mi segundo desafio, ES UN JUEGO")

let nombre = prompt("Cual es tu nombre?")
let su_jugada = prompt("Hola"+ESPACIO+nombre+ESPACIO+"escribe tu eleccion: Piedra, Papel o Tijera");

if(su_jugada == "Piedra"||su_jugada == "piedra"||su_jugada == "PIEDRA"){
    alert("EMPATAMOS! yo tambien elegi Piedra")
}else if(su_jugada == "Papel"||su_jugada == "papel"||su_jugada == "PAPEL"){
    alert("ME GANASTE! yo elegi Piedra :(")
}else if(su_jugada == "Tijera"||su_jugada == "tijera"||su_jugada == "TIJERA"){
    alert("PERDISTE! yo elegi Piedra! :)")
}else{
    alert("Perdon"+ESPACIO+nombre+", no entendi lo que escribiste, tenes que escribir piedra, papel o tijera, dale F5 y jugemos de nuevo!")
}
