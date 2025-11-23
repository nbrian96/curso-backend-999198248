// Problema: Crea una función que calcule el área de un rectángulo. La función debe:

// Recibir dos parámetros: ancho (number) y alto (number)
// Retornar el área calculada (number)
// Incluir validación para asegurar que los valores sean positivos
// Mostrar el resultado en consola

abstract class Forma {
    abstract calcularArea(): number;

    obtenerInfo(): string {
        return `Área: ${this.calcularArea()}`;
    }
}

class Rectangulo extends Forma {
    private ancho: number;
    private alto: number;

    constructor(ancho: number, alto: number) {
        super();
        this.ancho = ancho > 0 ? ancho : 1;
        this.alto = alto > 0 ? alto : 1;
    }

    calcularArea(): number {
        return this.ancho * this.alto;
    }
}

const rectangulo = new Rectangulo(0, 0);

console.log(rectangulo.obtenerInfo());