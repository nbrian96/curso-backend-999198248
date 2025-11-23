// Problema: Crea un programa que declare variables de diferentes tipos básicos (string, number, boolean) y las muestre en consola.
// El programa debe incluir:

// Una variable nombre de tipo string con tu nombre
// Una variable edad de tipo number con tu edad
// Una variable esEstudiante de tipo boolean indicando si eres estudiante
// Muestra todas las variables en un mensaje formateado

let nombre: string = 'Brian';
let edad: number = 29;
let esEstudiante: boolean = true;

console.log(`Nombre: ${nombre}`);
console.log(`Edad: ${edad}`);
console.log(`Es estudiante: ${esEstudiante}`);
console.log(`La persona se llama ${nombre} tiene ${edad} años y ${esEstudiante ? 'es' : 'no es'} estudiante.`);