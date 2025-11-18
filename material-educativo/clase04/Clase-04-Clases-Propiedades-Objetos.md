# 📖 Clase 4: Clases, Propiedades y Objetos

## 🎯 Objetivos de la Clase

- Dominar la creación y uso de clases en TypeScript con sintaxis moderna
- Comprender los modificadores de acceso: public, private, protected y readonly
- Aprender a implementar herencia y polimorfismo con TypeScript
- Entender conceptos avanzados: abstract classes, interfaces vs clases, y decorators
- Aplicar programación orientada a objetos en proyectos TypeScript reales

---

## 📚 ¿Qué es la Programación Orientada a Objetos en TypeScript?

### 🔍 Definición

**La Programación Orientada a Objetos (POO)** en TypeScript permite crear estructuras de código basadas en clases, objetos, herencia y encapsulación. TypeScript añade tipado estático a los conceptos de POO, proporcionando mayor seguridad y herramientas de desarrollo mejoradas.

### 🏗️ Características Principales

- **Clases:** Plantillas para crear objetos con propiedades y métodos tipados
- **Herencia:** Permite que una clase extienda otra, reutilizando código
- **Encapsulación:** Control de acceso a propiedades y métodos mediante modificadores
- **Polimorfismo:** Capacidad de objetos de diferentes clases de ser tratados de manera uniforme
- **Abstracción:** Interfaces y clases abstractas para definir contratos

### 📖 Historia Breve

- **2012:** TypeScript introduce soporte para clases siguiendo el estándar ES6
- **2015:** ES6 oficializa las clases en JavaScript, TypeScript ya las tenía
- **2016:** TypeScript 2.0 mejora el soporte de clases con acceso modifiers
- **2019:** Se añaden campos privados con sintaxis `#` (private fields)
- **2024:** TypeScript continúa mejorando el soporte de POO con decorators y características avanzadas

---

## 🏛️ Clases Básicas en TypeScript

### 📝 Definición de Clases

Las clases en TypeScript son similares a JavaScript pero con tipado estático.

```typescript
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
    this.edad++;
  }
}

// Uso
const persona = new Persona("Juan", 25);
console.log(persona.saludar()); // "Hola, soy Juan y tengo 25 años"
persona.cumplirAnios();
console.log(persona.edad); // 26
```

### 📝 Modificadores de Acceso

TypeScript proporciona modificadores para controlar el acceso a propiedades y métodos.

```typescript
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

// Uso
const cuenta = new CuentaBancaria("12345", 1000);
console.log(cuenta.numeroCuenta); // ✅ Accesible
console.log(cuenta.obtenerSaldo()); // ✅ Accesible
// console.log(cuenta.saldo); // ❌ Error: private
```

### 📝 Propiedades Estáticas

Las propiedades y métodos estáticos pertenecen a la clase, no a las instancias.

```typescript
class Contador {
  private static totalInstancias: number = 0;
  private valor: number = 0;

  constructor() {
    Contador.totalInstancias++;
  }

  incrementar(): void {
    this.valor++;
  }

  obtenerValor(): number {
    return this.valor;
  }

  static obtenerTotalInstancias(): number {
    return Contador.totalInstancias;
  }
}

const contador1 = new Contador();
const contador2 = new Contador();
const contador3 = new Contador();

contador1.incrementar();
contador1.incrementar();

console.log(contador1.obtenerValor()); // 2
console.log(Contador.obtenerTotalInstancias()); // 3
```

### 📝 Getters y Setters

Permiten controlar el acceso a propiedades con lógica personalizada.

```typescript
class Temperatura {
  private _celsius: number = 0;

  // Getter
  get celsius(): number {
    return this._celsius;
  }

  // Setter
  set celsius(valor: number) {
    if (valor < -273.15) {
      throw new Error("La temperatura no puede ser menor al cero absoluto");
    }
    this._celsius = valor;
  }

  // Getter calculado
  get fahrenheit(): number {
    return (this._celsius * 9/5) + 32;
  }

  // Setter calculado
  set fahrenheit(valor: number) {
    this._celsius = (valor - 32) * 5/9;
  }
}

const temp = new Temperatura();
temp.celsius = 25;
console.log(temp.celsius); // 25
console.log(temp.fahrenheit); // 77

temp.fahrenheit = 68;
console.log(temp.celsius); // 20
```

---

## 🏗️ Herencia y Polimorfismo

### 📄 Herencia

Las clases pueden extender otras clases para heredar propiedades y métodos.

```typescript
// Clase base
class Animal {
  protected nombre: string;
  protected edad: number;

  constructor(nombre: string, edad: number) {
    this.nombre = nombre;
    this.edad = edad;
  }

  hacerSonido(): string {
    return "El animal hace un sonido";
  }

  obtenerInfo(): string {
    return `${this.nombre} tiene ${this.edad} años`;
  }
}

// Clase derivada (hereda de Animal)
class Perro extends Animal {
  private raza: string;

  constructor(nombre: string, edad: number, raza: string) {
    super(nombre, edad); // Llama al constructor de la clase padre
    this.raza = raza;
  }

  // Sobrescribir método
  hacerSonido(): string {
    return "Guau guau!";
  }

  // Método adicional
  obtenerRaza(): string {
    return this.raza;
  }

  // Método que usa propiedades protegidas
  obtenerInfoCompleta(): string {
    return `${this.obtenerInfo()}, raza: ${this.raza}`;
  }
}

class Gato extends Animal {
  hacerSonido(): string {
    return "Miau miau!";
  }

  ronronear(): string {
    return "Prrrr...";
  }
}

// Uso
const perro = new Perro("Max", 3, "Labrador");
const gato = new Gato("Luna", 2);

console.log(perro.hacerSonido()); // "Guau guau!"
console.log(gato.hacerSonido()); // "Miau miau!"
```

### 📄 Clases Abstractas

Las clases abstractas no pueden ser instanciadas directamente, sirven como plantillas.

```typescript
// Clase abstracta
abstract class Forma {
  abstract calcularArea(): number;
  abstract calcularPerimetro(): number;

  // Método concreto (con implementación)
  obtenerInfo(): string {
    return `Área: ${this.calcularArea()}, Perímetro: ${this.calcularPerimetro()}`;
  }
}

// Clase que extiende clase abstracta
class Circulo extends Forma {
  private radio: number;

  constructor(radio: number) {
    super();
    this.radio = radio;
  }

  calcularArea(): number {
    return Math.PI * this.radio * this.radio;
  }

  calcularPerimetro(): number {
    return 2 * Math.PI * this.radio;
  }
}

class Rectangulo extends Forma {
  private ancho: number;
  private alto: number;

  constructor(ancho: number, alto: number) {
    super();
    this.ancho = ancho;
    this.alto = alto;
  }

  calcularArea(): number {
    return this.ancho * this.alto;
  }

  calcularPerimetro(): number {
    return 2 * (this.ancho + this.alto);
  }
}

// Uso
const circulo = new Circulo(5);
const rectangulo = new Rectangulo(4, 6);

console.log(circulo.obtenerInfo());
console.log(rectangulo.obtenerInfo());
```

### 📄 Implementación de Interfaces en Clases

Las clases pueden implementar interfaces para garantizar cierta estructura.

```typescript
// Interface
interface Volador {
  velocidadMaxima: number;
  volar(): void;
  aterrizar(): void;
}

interface Nadador {
  profundidadMaxima: number;
  nadar(): void;
}

// Clase que implementa interface
class Pato implements Volador, Nadador {
  velocidadMaxima: number;
  profundidadMaxima: number;

  constructor() {
    this.velocidadMaxima = 50;
    this.profundidadMaxima = 5;
  }

  volar(): void {
    console.log("El pato está volando");
  }

  aterrizar(): void {
    console.log("El pato está aterrizando");
  }

  nadar(): void {
    console.log("El pato está nadando");
  }
}

// Clase que extiende e implementa
class Avion extends Vehiculo implements Volador {
  velocidadMaxima: number = 800;

  volar(): void {
    console.log("El avión está volando a alta velocidad");
  }

  aterrizar(): void {
    console.log("El avión está aterrizando");
  }
}
```

---

## 🚀 Ejercicio Práctico

### 📝 Sistema de Gestión de Empleados

Crear un sistema completo de gestión de empleados usando clases, herencia y interfaces.

```typescript
// Interface base
interface Trabajador {
  id: number;
  nombre: string;
  calcularSalario(): number;
  obtenerInformacion(): string;
}

// Clase abstracta base
abstract class Empleado implements Trabajador {
  protected nombre: string;
  protected id: number;
  protected salarioBase: number;

  constructor(id: number, nombre: string, salarioBase: number) {
    this.id = id;
    this.nombre = nombre;
    this.salarioBase = salarioBase;
  }

  abstract calcularSalario(): number;

  obtenerInformacion(): string {
    return `ID: ${this.id}, Nombre: ${this.nombre}, Salario: ${this.calcularSalario()}`;
  }

  // Método protegido para uso en subclases
  protected getSalarioBase(): number {
    return this.salarioBase;
  }
}

// Clase concreta: Empleado a tiempo completo
class EmpleadoTiempoCompleto extends Empleado {
  private horasExtras: number;
  private tarifaHoraExtra: number = 50;

  constructor(id: number, nombre: string, salarioBase: number, horasExtras: number = 0) {
    super(id, nombre, salarioBase);
    this.horasExtras = horasExtras;
  }

  calcularSalario(): number {
    return this.salarioBase + (this.horasExtras * this.tarifaHoraExtra);
  }

  agregarHorasExtras(horas: number): void {
    this.horasExtras += horas;
  }
}

// Clase concreta: Empleado por horas
class EmpleadoPorHoras extends Empleado {
  private horasTrabajadas: number;
  private tarifaPorHora: number;

  constructor(id: number, nombre: string, tarifaPorHora: number, horasTrabajadas: number = 0) {
    super(id, nombre, 0); // Salario base 0 para empleados por horas
    this.tarifaPorHora = tarifaPorHora;
    this.horasTrabajadas = horasTrabajadas;
  }

  calcularSalario(): number {
    return this.horasTrabajadas * this.tarifaPorHora;
  }

  registrarHoras(horas: number): void {
    this.horasTrabajadas += horas;
  }

  obtenerHorasTrabajadas(): number {
    return this.horasTrabajadas;
  }
}

// Clase para gestionar empleados
class SistemaRecursosHumanos {
  private empleados: Trabajador[] = [];

  contratar(empleado: Trabajador): void {
    this.empleados.push(empleado);
  }

  obtenerEmpleado(id: number): Trabajador | undefined {
    return this.empleados.find(e => e.id === id);
  }

  calcularNominaTotal(): number {
    return this.empleados.reduce((total, empleado) => {
      return total + empleado.calcularSalario();
    }, 0);
  }

  listarEmpleados(): void {
    this.empleados.forEach(empleado => {
      console.log(empleado.obtenerInformacion());
    });
  }

  obtenerTotalEmpleados(): number {
    return this.empleados.length;
  }
}

// Uso del sistema
const rrhh = new SistemaRecursosHumanos();

const empleado1 = new EmpleadoTiempoCompleto(1, "Ana García", 50000, 10);
const empleado2 = new EmpleadoTiempoCompleto(2, "Luis Martínez", 60000, 5);
const empleado3 = new EmpleadoPorHoras(3, "María López", 25, 120);
const empleado4 = new EmpleadoPorHoras(4, "Carlos Ruiz", 30, 100);

rrhh.contratar(empleado1);
rrhh.contratar(empleado2);
rrhh.contratar(empleado3);
rrhh.contratar(empleado4);

rrhh.listarEmpleados();
console.log(`Total nómina: $${rrhh.calcularNominaTotal()}`);
```

**Archivo `empleados.ts`:**

```typescript
// empleados.ts
interface Trabajador {
  id: number;
  nombre: string;
  calcularSalario(): number;
  obtenerInformacion(): string;
}

abstract class Empleado implements Trabajador {
  protected nombre: string;
  protected id: number;
  protected salarioBase: number;

  constructor(id: number, nombre: string, salarioBase: number) {
    this.id = id;
    this.nombre = nombre;
    this.salarioBase = salarioBase;
  }

  abstract calcularSalario(): number;

  obtenerInformacion(): string {
    return `ID: ${this.id}, Nombre: ${this.nombre}, Salario: ${this.calcularSalario()}`;
  }

  protected getSalarioBase(): number {
    return this.salarioBase;
  }
}

class EmpleadoTiempoCompleto extends Empleado {
  private horasExtras: number;
  private tarifaHoraExtra: number = 50;

  constructor(id: number, nombre: string, salarioBase: number, horasExtras: number = 0) {
    super(id, nombre, salarioBase);
    this.horasExtras = horasExtras;
  }

  calcularSalario(): number {
    return this.salarioBase + (this.horasExtras * this.tarifaHoraExtra);
  }

  agregarHorasExtras(horas: number): void {
    this.horasExtras += horas;
  }
}

class EmpleadoPorHoras extends Empleado {
  private horasTrabajadas: number;
  private tarifaPorHora: number;

  constructor(id: number, nombre: string, tarifaPorHora: number, horasTrabajadas: number = 0) {
    super(id, nombre, 0);
    this.tarifaPorHora = tarifaPorHora;
    this.horasTrabajadas = horasTrabajadas;
  }

  calcularSalario(): number {
    return this.horasTrabajadas * this.tarifaPorHora;
  }

  registrarHoras(horas: number): void {
    this.horasTrabajadas += horas;
  }

  obtenerHorasTrabajadas(): number {
    return this.horasTrabajadas;
  }
}

class SistemaRecursosHumanos {
  private empleados: Trabajador[] = [];

  contratar(empleado: Trabajador): void {
    this.empleados.push(empleado);
  }

  obtenerEmpleado(id: number): Trabajador | undefined {
    return this.empleados.find(e => e.id === id);
  }

  calcularNominaTotal(): number {
    return this.empleados.reduce((total, empleado) => {
      return total + empleado.calcularSalario();
    }, 0);
  }

  listarEmpleados(): void {
    this.empleados.forEach(empleado => {
      console.log(empleado.obtenerInformacion());
    });
  }

  obtenerTotalEmpleados(): number {
    return this.empleados.length;
  }
}

export { Empleado, EmpleadoTiempoCompleto, EmpleadoPorHoras, SistemaRecursosHumanos, Trabajador };
```

---

## 🏠 Tarea para la Próxima Clase

### ✅ Ejercicio:

Crear un sistema de gestión de vehículos con las siguientes características:

1. **Clase abstracta Vehiculo** con propiedades comunes (marca, modelo, año) y métodos abstractos
2. **Clases concretas** que extiendan Vehiculo: Coche, Moto, Camion
3. **Interface Combustible** con métodos para repostar y verificar nivel
4. **Modificadores de acceso** apropiados (private para propiedades internas, public para métodos de acceso)
5. **Getters y setters** para propiedades que necesiten validación
6. **Clase GestorFlota** que gestione una colección de vehículos con métodos para agregar, buscar y calcular estadísticas
7. **Propiedades estáticas** para contadores o constantes compartidas

**Requisitos técnicos:**

- Usar herencia y clases abstractas correctamente
- Implementar interfaces donde sea apropiado
- Aplicar encapsulación con modificadores de acceso
- Validar datos en setters
- Código bien documentado con comentarios
- Tipos explícitos en todos los lugares necesarios
- Estructura modular con archivos separados

---

## 📚 Recursos Adicionales

### 🔗 Enlaces Útiles

- [TypeScript Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) - Documentación oficial sobre clases
- [TypeScript OOP](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html) - Programación orientada a objetos en TypeScript
- [MDN Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) - Clases en JavaScript/TypeScript
- [TypeScript Design Patterns](https://refactoring.guru/design-patterns/typescript) - Patrones de diseño en TypeScript

### 📖 Conceptos para Investigar

- **Mixins** - Patrón para combinar funcionalidades de múltiples clases
- **Decorators** - Metadatos y anotaciones para clases y métodos (característica experimental)
- **Property Decorators** - Decoradores para propiedades que permiten observar o transformar valores
- **Method Overloading** - Múltiples firmas para el mismo método con diferentes parámetros

---

## ❓ Preguntas Frecuentes

### ¿Cuándo debo usar una clase abstracta vs una interfaz?

- **Clase abstracta:** Úsala cuando tengas código común que quieras compartir entre subclases, o cuando quieras que las subclases tengan implementaciones parciales
- **Interfaz:** Úsala cuando solo necesites definir un contrato sin implementación, o cuando quieras que múltiples clases no relacionadas implementen el mismo comportamiento
- **Regla general:** Si necesitas código compartido → clase abstracta; si solo necesitas un contrato → interfaz

### ¿Qué es la diferencia entre protected y private?

- **private:** Solo accesible dentro de la misma clase, no es accesible en subclases
- **protected:** Accesible dentro de la clase y en todas sus subclases, pero no desde fuera
- **Ejemplo:** Si tienes una propiedad `protected` en una clase padre, las clases hijas pueden accederla; si es `private`, no pueden

### ¿Puedo tener métodos estáticos y de instancia en la misma clase?

- **Sí, absolutamente.** Los métodos estáticos pertenecen a la clase y se llaman con `Clase.metodo()`
- Los métodos de instancia pertenecen a cada objeto y se llaman con `objeto.metodo()`
- Los métodos estáticos no pueden acceder a propiedades de instancia (no tienen acceso a `this`)
- Los métodos de instancia sí pueden acceder a métodos y propiedades estáticas usando `Clase.propiedad`

---

## 🎉 ¡POO en TypeScript Dominado!

¡Excelente trabajo! Ya dominas las clases, propiedades, herencia, interfaces y conceptos avanzados de programación orientada a objetos en TypeScript. Has aprendido a crear estructuras de código robustas y bien organizadas usando tipado estático. En la próxima clase veremos una demostración práctica desde la terminal del uso de TypeScript en aplicaciones reales.

**Recuerda:** La POO es una herramienta poderosa para organizar código complejo. Practica creando diferentes jerarquías de clases, experimenta con herencia múltiple mediante interfaces, y siempre piensa en la reutilización y mantenibilidad del código. ¡Sigue construyendo sistemas bien estructurados! 🚀

---

_📧 **Contacto:** Si tienes dudas sobre clases, propiedades y objetos en TypeScript, no dudes en consultar durante la clase o por los canales de comunicación establecidos._
