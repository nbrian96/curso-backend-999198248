console.log('hola mi gente!!');
console.log(2 + 2);
console.log(2 * 2);
console.log(2 - 2);

const edad = 18;
if (edad >= 18) {
  console.log('Es mayor de edad');
} else if (edad >= 13) {
  console.log('Es adolescente');
} else {
  console.log('Es menor de edad');
}
// es lo mismo que:
if (edad >= 18) {
  console.log('Es mayor de edad'); // Verdadero
} else {
  if (edad >= 13) {
    console.log('Es adolescente'); // Verdadero
  } else {
    console.log('Es menor de edad'); // Falso
  }
}

const mensaje = edad >= 18 ? 'Es mayor de edad' : 'Es menor de edad'; // simple
const mensaje2 =
  edad >= 18
    ? 'Es mayor de edad'
    : edad >= 13
    ? 'Es adolescente'
    : 'Es menor de edad'; // muy complejo mejor hacer un if else
console.log(mensaje);
console.log(mensaje2);

// Polimorfismo
let aux = 'Hola';
console.log(typeof aux); // string
aux = 10;
console.log(typeof aux); // number
aux = true;
console.log(typeof aux); // boolean
aux = null;
console.log(typeof aux); // object
aux = undefined;
console.log(typeof aux); // undefined

let personas = ['Juan', 'María', 'Pedro'];
personas.push('Ana');
console.log(personas);

let contador = 0;
let auxWhile = 'start';
while (auxWhile != 'salir') {
  if (contador > 9) {
    auxWhile = 'salir';
  }
  contador++;
}

for (let i = 0; i < personas.length; i++) {
  const persona = personas[i];
  console.log(persona);
}

const numeros = [1, 2, 3, 4, 5];

const duplicados = numeros.map((num) => num * 2);
console.log('duplicados:', duplicados);

// Destructuring de arrays
const [primero, segundo, ...resto] = [1, 2, 3, 4, 5];

console.log('primero:', primero);
console.log('segundo:', segundo);
console.log('resto:', resto);

// Destructuring de objetos
const persona = { nombre: 'Juan', edad2: 30, ciudad: 'Madrid' };
const { nombre, edad2 } = persona;

console.log('nombre:', nombre);
console.log('edad2:', edad2);
