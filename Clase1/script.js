//Primer entregable del Curso JS

const ESPACIO = " ";


alert("Bienvenido a mi primer desafio")
let nombre = prompt("Cual es tu nombre?")
let apellido = prompt("Cual es tu apellido?")
let anioActual = 2021;
let anioNacimiento = parseInt(prompt("En que año naciste?"));

let nombreCompleto = nombre + ESPACIO + apellido;
let edad = anioActual - anioNacimiento;

alert("Gracias"+ESPACIO+nombreCompleto+ESPACIO+"podras ver tu edad en la consola");
console.log(nombreCompleto+ESPACIO+"tiene o va a cumplir:"+ESPACIO+edad);
