// **Problema:** Crea una función `saludar` que reciba un `nombre` (string) y un `titulo` opcional (string). La función debe:

// - Si se proporciona el título, mostrar: "Hola, [título] [nombre]"
// - Si no se proporciona el título, mostrar: "Hola, [nombre]"
// - Probar la función con y sin título


function saludar(nombre: string, titulo?: string): void {
    if (!titulo) {
    console.log(`Hola, ${titulo} ${nombre}`);
    } else {
    console.log(`Hola, ${nombre}`);
    }
}

saludar('Juan', 'Dr.');