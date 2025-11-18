// Para ejecutar esto y verlo en consola:
// 1- tsc Clase-03/test.ts
// 2- node Clase-03/test.ts

//Typescript

interface Persona {
  readonly id?: number; // lo pongo opcional para que no moleste
  nombre: string | number;
  apellido: string;
  dni: number;
  sangre?: string;

  apellido2?: string;
  colorFavorito?: string;
  saludar?: () => void;
}

let aux: Persona | null | undefined;

aux = null;
aux = undefined;

aux = { dni: 12345678, nombre: 'Lucas', apellido: 'Perez', id: 1 };

// aux.id = 12345678;

console.log(aux.nombre);

let aux2 = { nombre: 'Ana', apellido: 'Gomez' };

console.log(aux2.nombre);

// Función con tipos explícitos
function sumar(a: number, b: number): number {
  return a + b;
}

const sumar2 = (a: number = 1, b: number = 2): number => {
  return a + b;
};

// Función que no retorna nada (void)
function saludar(nombre: string): void {
  console.log(`Hola, ${nombre}!`);
  // return 'algo';
}

interface UsuarioAdmin extends Persona {
  rol: string;
  permisos: string[];
}

// Feo hacer esto, mejor lo de arriba y mejora la legibilidad y si Persona cambia, UsuarioAdmin tambien cambia
interface UsuarioAdmin2 {
  readonly id?: number; // lo pongo opcional para que no moleste
  nombre: string | number;
  apellido: string;
  dni: number;
  sangre?: string;

  apellido2?: string;
  colorFavorito?: string;
  rol: string;
  permisos: string[];
}

const admin: UsuarioAdmin = {
  nombre: 'pepe',
  apellido: 'gomez',
  dni: 12345678,
  colorFavorito: 'blue',

  rol: 'admin',
  permisos: ['crear', 'editar'],
};

interface crud {
  create(item: Persona): void;
  read(id: number): Persona | null;
  update(id: number, item: Persona): void;
  delete(id: number): void;
}

// Función genérica
function obtenerPrimerElemento<T>(array: T[]): T | undefined {
  return array[0];
}

// Uso
const numero = obtenerPrimerElemento<number>([1, 2, 3]);
const texto = obtenerPrimerElemento<string>(['a', 'b', 'c']);
const mixto = obtenerPrimerElemento<string | number>([0, 'b', 'c', 4]);

console.log(numero);
console.log(texto);
console.log(mixto);
