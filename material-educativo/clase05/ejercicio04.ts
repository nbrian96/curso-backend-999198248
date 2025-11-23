// Problema: Crea una interfaz Persona con las propiedades: nombre (string), edad (number) y email (string). Luego:

// Crea un objeto que implemente esta interfaz
// Crea una función mostrarValores que reciba una Persona y muestre su información formateada
// Ejecuta la función con el objeto creado
// 🔥 ¿y si les pido que mostrarValores pueda recibir cualquier objeto y mostrar sus claves y valores?


interface Persona {
    nombre: string;
    edad: number;
    email: string;
}

function mostrarValores(obj: any): void {
    for (const [clave, valor] of Object.entries(obj)) {
        console.log(`${clave}: ${valor}`);
    }
}


const persona1: Persona = {
    nombre: "Juan Pérez",
    edad: 30,
    email: "juanperez@gmail.com"
}

mostrarValores(persona1);