type ID = string; // Alias de tipo

interface User {
  name: string;
  date: number;
  lastname: string;
  id: ID;
}

interface Mascota {
  name: string;
  ownerId: ID;
}

// Interface genérica
interface Caja<T> {
  contenido: T;
  obtenerContenido(): T;
}

const cajaString: Caja<string> = {
  contenido: 'Hola',
  obtenerContenido() {
    return this.contenido;
  },
};

const cajaNumber: Caja<number> = {
  contenido: 9999,
  obtenerContenido() {
    return this.contenido;
  },
};

// console.log(cajaString.obtenerContenido());
// console.log(cajaNumber.obtenerContenido());

// Clase básica
class Persona {
  nombre: string;
  edad: number;

  constructor(nombre: string, edad: number) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar(): string {
    return `Hola, soy ${this.nombre} y tengo ${this.edad} años`;
  }

  cumplirAnios(): void {
    this.edad++; // this.edad = this.edad + 1
  }
}

// Uso
const persona = new Persona('Juan', 25);
console.log(persona.saludar()); // "Hola, soy Juan y tengo 25 años"
persona.cumplirAnios();
console.log(persona.edad); // 26

class CuentaBancaria {
  // Public (por defecto, accesible desde cualquier lugar)
  public numeroCuenta: string;

  // Private (solo accesible dentro de la clase)
  private saldo: number;

  // Protected (accesible en la clase y sus subclases)
  protected codigoSeguridad: string;

  // Readonly (solo lectura después de la inicialización)
  readonly fechaCreacion: Date;

  constructor(numeroCuenta: string, saldoInicial: number) {
    this.numeroCuenta = numeroCuenta;
    this.saldo = saldoInicial;
    this.codigoSeguridad = this.generarCodigo();
    this.fechaCreacion = new Date();
  }

  // Métodos públicos
  public obtenerSaldo(): number {
    return this.saldo;
  }

  public depositar(cantidad: number): void {
    if (cantidad > 0) {
      this.saldo += cantidad;
    }
  }

  public retirar(cantidad: number): boolean {
    if (cantidad > 0 && cantidad <= this.saldo) {
      this.saldo -= cantidad;
      return true;
    }
    return false;
  }

  // Método privado
  private generarCodigo(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  // Método protegido (accesible en subclases)
  protected validarCodigo(codigo: string): boolean {
    return codigo === this.codigoSeguridad;
  }
}

console.clear();
// Uso
const cuenta = new CuentaBancaria('12345', 1000);
console.log(cuenta.numeroCuenta); // ✅ Accesible
console.log(cuenta.obtenerSaldo()); // ✅ Accesible
// console.log(cuenta.saldo); // ❌ Error: private
console.log(cuenta.fechaCreacion);
// cuenta.fechaCreacion = new Date(); // ❌ Error: readonly
