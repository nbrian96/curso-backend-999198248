// Problema: Crea un programa que maneje un array de números y realice las siguientes operaciones:

// Declara un array de números con al menos 5 elementos
// Calcula la suma de todos los elementos
// Encuentra el número mayor y el menor
// Muestra todos los resultados en consola


class arrayOperations {
    private numbers: number[];

    constructor() {
        this.numbers = this.randomArray(5, 1, 100);
    }

    public randomArray(length: number, min = 0, max = 100): number[] {
        return Array.from({ length }, () =>
            Math.floor(Math.random() * (max - min + 1)) + min
        );
    }

    public getNumbers(): number[] {
        return this.numbers;
    }

    public sum(): number {
        return this.numbers.reduce((acc, curr) => acc + curr, 0);
    }

    public findMax(): number {
        return Math.max(...this.numbers);
    }

    public findMin(): number {
        return Math.min(...this.numbers);
    }
}

const arrayOps = new arrayOperations();
console.log("Array de números:", arrayOps.getNumbers());
console.log("Suma de todos los elementos:", arrayOps.sum());
console.log("Número mayor:", arrayOps.findMax());
console.log("Número menor:", arrayOps.findMin());