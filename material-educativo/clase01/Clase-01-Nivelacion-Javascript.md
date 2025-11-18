# 📖 Clase 1: Nivelación Javascript

## 🎯 Objetivos de la Clase

- Reforzar los conceptos fundamentales de JavaScript (variables, tipos de datos, operadores)
- Comprender el manejo de funciones: declaraciones, expresiones y arrow functions
- Dominar el uso de estructuras de control (condicionales y bucles)
- Aplicar métodos de arrays y objetos para manipulación de datos
- Practicar destructuring, spread operator y otras características modernas de ES6+

---

## 📚 ¿Qué es JavaScript?

### 🔍 Definición

**JavaScript** es un lenguaje de programación dinámico, de alto nivel e interpretado que se utiliza principalmente para crear contenido interactivo en páginas web y aplicaciones. Es uno de los tres pilares fundamentales del desarrollo web junto con HTML y CSS.

### 🏗️ Características Principales

- **Lenguaje interpretado:** Se ejecuta directamente sin necesidad de compilación previa
- **Tipado dinámico:** Las variables pueden cambiar de tipo durante la ejecución
- **Multiplataforma:** Funciona en navegadores, servidores (Node.js) y dispositivos móviles
- **Orientado a objetos:** Soporta programación orientada a objetos con prototipos
- **Funcional:** Permite programación funcional con funciones de primera clase

### 📖 Historia Breve

- **1995:** JavaScript fue creado por Brendan Eich para Netscape Navigator en solo 10 días
- **1997:** Se estandarizó como ECMAScript (ES1) por la organización ECMA International
- **2009:** Apareció Node.js, permitiendo ejecutar JavaScript en el servidor
- **2015:** Lanzamiento de ES6 (ES2015) con características modernas como clases, arrow functions y módulos
- **2025:** JavaScript continúa evolucionando con nuevas características en cada versión anual de ECMAScript

---

## 🏛️ JavaScript Básico

### 📝 Variables: let, const y var

Las variables permiten almacenar y referenciar datos en JavaScript.

```javascript
// var (legacy, evítalo)
var nombre = 'Juan';
var nombre = 'Pedro'; // Se puede redeclarar

// let (variable que puede cambiar)
let edad = 25;
edad = 26; // ✅ Correcto
let edad = 30; // ❌ Error: no se puede redeclarar

// const (constante, no puede cambiar)
const PI = 3.14159;
const usuario = { nombre: 'Ana', edad: 28 };
usuario.edad = 29; // ✅ Correcto (modifica propiedad del objeto)
usuario = {}; // ❌ Error: no se puede reasignar
```

### 📝 Tipos de Datos Primitivos

JavaScript tiene 7 tipos de datos primitivos.

```javascript
// String (texto)
const mensaje = 'Hola Mundo';
const otroMensaje = 'JavaScript';

// Number (números)
const entero = 42;
const decimal = 3.14;
const infinito = Infinity;
const noNumero = NaN;

// Boolean (verdadero/falso)
const esVerdadero = true;
const esFalso = false;

// Undefined (valor no definido)
let variable;
console.log(variable); // undefined

// Null (valor nulo intencional)
const valorNulo = null;

// Symbol (identificador único)
const simbolo = Symbol('descripcion');

// BigInt (números grandes)
const numeroGrande = 9007199254740991n;
```

### 📝 Funciones

Las funciones son bloques de código reutilizables que pueden recibir parámetros y retornar valores.

```javascript
// Declaración de función
function saludar(nombre) {
  return `Hola, ${nombre}!`;
}

// Expresión de función
const sumar = function (a, b) {
  return a + b;
};

// Arrow function (ES6+)
const multiplicar = (a, b) => {
  return a * b;
};

// Arrow function con return implícito
const dividir = (a, b) => a / b;

// Arrow function con un solo parámetro
const duplicar = (x) => x * 2;
```

### 📝 Estructuras de Control

Permiten controlar el flujo de ejecución del programa.

```javascript
// if/else
const edad = 18;
if (edad >= 18) {
  console.log('Es mayor de edad');
} else if (edad >= 13) {
  console.log('Es adolescente');
} else {
  console.log('Es menor de edad');
}

// Switch
const dia = 'lunes';
switch (dia) {
  case 'lunes':
  case 'martes':
  case 'miércoles':
  case 'jueves':
  case 'viernes':
    console.log('Día laboral');
    break;
  case 'sábado':
  case 'domingo':
    console.log('Fin de semana');
    break;
  default:
    console.log('Día inválido');
}

// For loop
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// While loop
let contador = 0;
while (contador < 3) {
  console.log(contador);
  contador++;
}
```

---

## 🏗️ JavaScript Avanzado

### 📄 Arrays y Métodos de Array

```javascript
// Crear array
const numeros = [1, 2, 3, 4, 5];

// Métodos comunes
const duplicados = numeros.map((num) => num * 2);
const pares = numeros.filter((num) => num % 2 === 0);
const suma = numeros.reduce((acc, num) => acc + num, 0);
const existe = numeros.includes(3);
const indice = numeros.findIndex((num) => num > 3);
```

### 📄 Destructuring y Spread Operator

```javascript
// Destructuring de arrays
const [primero, segundo, ...resto] = [1, 2, 3, 4, 5];

// Destructuring de objetos
const persona = { nombre: 'Juan', edad: 30, ciudad: 'Madrid' };
const { nombre, edad } = persona;

// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combinado = [...arr1, ...arr2];

// Spread en objetos
const nuevoObjeto = { ...persona, edad: 31 };
```

### 📄 Async/Await y Promesas

```javascript
// Promesas
const obtenerDatos = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ datos: 'Información' });
    }, 1000);
  });
};

// async/await
async function procesarDatos() {
  try {
    const resultado = await obtenerDatos();
    console.log(resultado);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## 🚀 Ejercicio Práctico

### 📝 Calculadora de Estadísticas

Crear una función que reciba un array de números y calcule estadísticas básicas.

```javascript
function calcularEstadisticas(numeros) {
  // Validar que todos sean números
  if (!Array.isArray(numeros) || numeros.length === 0) {
    return { error: 'Array inválido' };
  }

  // Calcular estadísticas
  const suma = numeros.reduce((acc, num) => acc + num, 0);
  const promedio = suma / numeros.length;
  const maximo = Math.max(...numeros);
  const minimo = Math.min(...numeros);
  const pares = numeros.filter((num) => num % 2 === 0).length;
  const impares = numeros.length - pares;

  return {
    suma,
    promedio: Number(promedio.toFixed(2)),
    maximo,
    minimo,
    cantidad: numeros.length,
    pares,
    impares,
  };
}

// Uso
const numeros = [10, 20, 30, 40, 50, 15, 25, 35];
const estadisticas = calcularEstadisticas(numeros);
console.log(estadisticas);
```

**Archivo `calculadora.js`:**

```javascript
// calculadora.js
function calcularEstadisticas(numeros) {
  if (!Array.isArray(numeros) || numeros.length === 0) {
    return { error: 'Array inválido' };
  }

  const suma = numeros.reduce((acc, num) => acc + num, 0);
  const promedio = suma / numeros.length;
  const maximo = Math.max(...numeros);
  const minimo = Math.min(...numeros);
  const pares = numeros.filter((num) => num % 2 === 0).length;

  return {
    suma,
    promedio: Number(promedio.toFixed(2)),
    maximo,
    minimo,
    cantidad: numeros.length,
    pares,
    impares: numeros.length - pares,
  };
}

// Exportar para usar en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = calcularEstadisticas;
}
```

---

## 🏠 Tarea para la Próxima Clase

### ✅ Ejercicio:

Crear un programa de gestión de tareas (to-do list) que permita:

1. **Agregar tareas** con título y descripción
2. **Marcar tareas como completadas** o pendientes
3. **Eliminar tareas** de la lista
4. **Filtrar tareas** por estado (completadas/pendientes/todas)
5. **Contar estadísticas** de tareas (total, completadas, pendientes)
6. **Buscar tareas** por título o descripción
7. **Guardar en localStorage** para persistencia de datos

**Requisitos técnicos:**

- Usar funciones arrow y métodos modernos de arrays
- Implementar destructuring donde sea apropiado
- Utilizar spread operator cuando sea necesario
- Validar entradas de usuario
- Manejar errores apropiadamente
- Usar const/let (no var)
- Código comentado y organizado

---

## 📚 Recursos Adicionales

### 🔗 Enlaces Útiles

- [MDN JavaScript Guide](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide) - Documentación completa de JavaScript
- [JavaScript.info](https://es.javascript.info/) - Tutorial moderno y detallado de JavaScript
- [Eloquent JavaScript](https://eloquentjavascript.net/) - Libro gratuito sobre programación en JavaScript
- [ES6 Features](https://github.com/lukehoban/es6features) - Guía de características de ES6+

### 📖 Conceptos para Investigar

- **Closures** - Funciones que tienen acceso a variables de su contexto externo
- **Prototipos** - Sistema de herencia basado en prototipos en JavaScript
- **Event Loop** - Mecanismo que permite operaciones asíncronas en JavaScript
- **Hoisting** - Comportamiento de elevación de declaraciones de variables y funciones

---

## ❓ Preguntas Frecuentes

### ¿Cuál es la diferencia entre let, const y var?

- **var:** Scope de función, se puede redeclarar, tiene hoisting (evítalo)
- **let:** Scope de bloque, no se puede redeclarar, no tiene hoisting en TDZ (Temporal Dead Zone)
- **const:** Similar a let pero no se puede reasignar (las propiedades de objetos sí se pueden modificar)

### ¿Qué es el hoisting en JavaScript?

- El hoisting es un comportamiento donde las declaraciones de variables y funciones se mueven al inicio de su scope antes de la ejecución
- Con `var`, la variable existe como `undefined` antes de su declaración
- Con `let` y `const`, existe una "zona muerta temporal" (TDZ) donde no se puede acceder antes de su declaración

### ¿Cuándo usar arrow functions vs funciones regulares?

- **Arrow functions:** Úsala cuando necesites mantener el contexto de `this` del scope padre, o para funciones cortas y simples
- **Funciones regulares:** Úsala cuando necesites tu propio contexto de `this`, cuando necesites `arguments`, o para métodos de objetos donde `this` es importante

---

## 🎉 ¡JavaScript Dominado!

¡Excelente trabajo! Ya conoces los conceptos fundamentales de JavaScript, desde variables y tipos de datos hasta funciones y estructuras de control. En la próxima clase exploraremos React, donde aplicaremos estos conocimientos de JavaScript para construir interfaces de usuario interactivas.

**Recuerda:** La práctica constante es clave para dominar JavaScript. Experimenta con los ejemplos, crea tus propios proyectos y no tengas miedo de cometer errores. ¡Sigue practicando! 🚀

---

_📧 **Contacto:** Si tienes dudas sobre JavaScript, no dudes en consultar durante la clase o por los canales de comunicación establecidos._
