# 📖 Clase 3: TypeScript

## 🎯 Objetivos de la Clase

- Comprender qué es TypeScript y sus ventajas sobre JavaScript
- Dominar los tipos básicos de TypeScript: primitivos, arrays, objetos y funciones
- Aprender a definir interfaces y tipos personalizados
- Entender el concepto de tipado estático y cómo mejora el desarrollo
- Aplicar TypeScript en proyectos prácticos con configuración básica

---

## 📚 ¿Qué es TypeScript?

### 🔍 Definición

**TypeScript** es un superset de JavaScript desarrollado por Microsoft que añade tipado estático opcional al lenguaje. TypeScript se compila a JavaScript puro y permite detectar errores durante el desarrollo antes de la ejecución en tiempo de ejecución.

### 🏗️ Características Principales

- **Tipado estático:** Detecta errores en tiempo de compilación antes de ejecutar el código
- **Superset de JavaScript:** Todo código JavaScript válido es código TypeScript válido
- **IntelliSense mejorado:** Autocompletado y sugerencias más precisas en editores
- **Refactorización segura:** Permite cambiar código con confianza sabiendo que los tipos se actualizan
- **Compatible con JavaScript:** Puede integrarse gradualmente en proyectos existentes

### 📖 Historia Breve

- **2012:** Microsoft lanza TypeScript públicamente como proyecto open source
- **2014:** TypeScript 1.0 se lanza con soporte completo de ES6
- **2016:** TypeScript 2.0 introduce tipos estrictos y null safety
- **2019:** TypeScript 3.7 añade optional chaining y nullish coalescing
- **2024:** TypeScript continúa evolucionando con mejoras de inferencia de tipos y nuevas características

---

## 🏛️ TypeScript Básico

### 📝 Tipos Primitivos

TypeScript extiende JavaScript con tipos explícitos para mayor seguridad.

```typescript
// String
const nombre: string = "Juan";
const mensaje: string = `Hola, ${nombre}!`;

// Number
const edad: number = 25;
const precio: number = 19.99;

// Boolean
const esActivo: boolean = true;
const esAdmin: boolean = false;

// Null y Undefined
const valor: null = null;
const indefinido: undefined = undefined;

// Any (evitar cuando sea posible)
const algo: any = "cualquier cosa";
algo = 42; // No hay verificación de tipos
```

### 📝 Arrays y Tuplas

TypeScript permite definir tipos específicos para arrays.

```typescript
// Array de números
const numeros: number[] = [1, 2, 3, 4, 5];
const numeros2: Array<number> = [1, 2, 3]; // Sintaxis alternativa

// Array de strings
const nombres: string[] = ["Ana", "Luis", "María"];

// Array mixto
const mixto: (string | number)[] = ["texto", 42, "otro", 100];

// Tuplas (arrays con longitud y tipos fijos)
const tupla: [string, number] = ["Juan", 25];
const coordenadas: [number, number, number] = [10, 20, 30];
```

### 📝 Objetos y Tipos

TypeScript permite definir la estructura de objetos de manera explícita.

```typescript
// Tipo de objeto inline
const usuario: { nombre: string; edad: number; email: string } = {
  nombre: "Ana",
  edad: 30,
  email: "ana@example.com"
};

// Propiedades opcionales
const perfil: {
  nombre: string;
  edad?: number; // Opcional
  email: string;
} = {
  nombre: "Luis",
  email: "luis@example.com"
  // edad es opcional, no es necesario
};

// Propiedades de solo lectura
const config: {
  readonly apiUrl: string;
  readonly version: string;
} = {
  apiUrl: "https://api.example.com",
  version: "1.0.0"
};
```

### 📝 Funciones con Tipos

Las funciones en TypeScript pueden tener tipos en parámetros y valores de retorno.

```typescript
// Función con tipos explícitos
function sumar(a: number, b: number): number {
  return a + b;
}

// Función que no retorna nada (void)
function saludar(nombre: string): void {
  console.log(`Hola, ${nombre}!`);
}

// Función con parámetros opcionales
function crearUsuario(nombre: string, edad?: number): string {
  if (edad) {
    return `${nombre} tiene ${edad} años`;
  }
  return nombre;
}

// Función con parámetros por defecto
function multiplicar(a: number, b: number = 1): number {
  return a * b;
}

// Arrow function con tipos
const dividir = (a: number, b: number): number => {
  return a / b;
};
```

---

## 🏗️ TypeScript Avanzado

### 📄 Interfaces

Las interfaces definen la estructura de objetos de manera reutilizable.

```typescript
// Interface básica
interface Usuario {
  nombre: string;
  edad: number;
  email: string;
}

// Uso de interface
const usuario: Usuario = {
  nombre: "María",
  edad: 28,
  email: "maria@example.com"
};

// Interface con propiedades opcionales y readonly
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string; // Opcional
  readonly fechaCreacion: string; // Solo lectura
}

// Interface que extiende otra
interface UsuarioAdmin extends Usuario {
  rol: string;
  permisos: string[];
}

// Interface para funciones
interface Operacion {
  (a: number, b: number): number;
}

const sumar: Operacion = (a, b) => a + b;
```

### 📄 Types (Tipos personalizados)

Los types permiten crear alias de tipos más complejos.

```typescript
// Type alias básico
type ID = string | number;
type Estado = "activo" | "inactivo" | "pendiente";

// Uso de types
const usuarioId: ID = 123;
const estado: Estado = "activo";

// Type para objetos
type Usuario = {
  id: ID;
  nombre: string;
  estado: Estado;
};

// Type union (unión de tipos)
type Respuesta = string | number | boolean;

// Type intersection (intersección de tipos)
type Empleado = {
  nombre: string;
  salario: number;
};

type Gerente = Empleado & {
  departamento: string;
  empleadosACargo: number;
};
```

### 📄 Generics (Genéricos)

Los genéricos permiten crear componentes reutilizables que funcionan con diferentes tipos.

```typescript
// Función genérica
function obtenerPrimerElemento<T>(array: T[]): T | undefined {
  return array[0];
}

// Uso
const numero = obtenerPrimerElemento<number>([1, 2, 3]);
const texto = obtenerPrimerElemento<string>(["a", "b", "c"]);

// Interface genérica
interface Caja<T> {
  contenido: T;
  obtenerContenido(): T;
}

const cajaString: Caja<string> = {
  contenido: "Hola",
  obtenerContenido() {
    return this.contenido;
  }
};

// Clase genérica
class Contenedor<T> {
  private items: T[] = [];

  agregar(item: T): void {
    this.items.push(item);
  }

  obtener(index: number): T | undefined {
    return this.items[index];
  }
}
```

---

## 🚀 Ejercicio Práctico

### 📝 Sistema de Gestión de Productos

Crear un sistema de gestión de productos usando TypeScript con interfaces y tipos.

```typescript
// Definir interfaces
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
  disponible: boolean;
}

interface CarritoItem {
  producto: Producto;
  cantidad: number;
}

// Clase para gestionar productos
class Tienda {
  private productos: Producto[] = [];

  agregarProducto(producto: Producto): void {
    this.productos.push(producto);
  }

  obtenerProductos(): Producto[] {
    return this.productos;
  }

  buscarPorCategoria(categoria: string): Producto[] {
    return this.productos.filter(p => p.categoria === categoria);
  }

  obtenerProductoPorId(id: number): Producto | undefined {
    return this.productos.find(p => p.id === id);
  }

  actualizarStock(id: number, nuevoStock: number): boolean {
    const producto = this.obtenerProductoPorId(id);
    if (producto) {
      producto.stock = nuevoStock;
      producto.disponible = nuevoStock > 0;
      return true;
    }
    return false;
  }
}

// Clase para el carrito de compras
class Carrito {
  private items: CarritoItem[] = [];

  agregarAlCarrito(producto: Producto, cantidad: number = 1): void {
    const itemExistente = this.items.find(
      item => item.producto.id === producto.id
    );

    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      this.items.push({ producto, cantidad });
    }
  }

  calcularTotal(): number {
    return this.items.reduce(
      (total, item) => total + (item.producto.precio * item.cantidad),
      0
    );
  }

  obtenerItems(): CarritoItem[] {
    return this.items;
  }

  vaciar(): void {
    this.items = [];
  }
}

// Uso del sistema
const tienda = new Tienda();
const carrito = new Carrito();

tienda.agregarProducto({
  id: 1,
  nombre: "Laptop",
  precio: 999.99,
  categoria: "Electrónica",
  stock: 5,
  disponible: true
});

tienda.agregarProducto({
  id: 2,
  nombre: "Mouse",
  precio: 29.99,
  categoria: "Electrónica",
  stock: 10,
  disponible: true
});

const productos = tienda.obtenerProductos();
carrito.agregarAlCarrito(productos[0], 1);
carrito.agregarAlCarrito(productos[1], 2);

console.log("Total:", carrito.calcularTotal());
```

**Archivo `tienda.ts`:**

```typescript
// tienda.ts
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
  disponible: boolean;
}

interface CarritoItem {
  producto: Producto;
  cantidad: number;
}

class Tienda {
  private productos: Producto[] = [];

  agregarProducto(producto: Producto): void {
    this.productos.push(producto);
  }

  obtenerProductos(): Producto[] {
    return this.productos;
  }

  buscarPorCategoria(categoria: string): Producto[] {
    return this.productos.filter(p => p.categoria === categoria);
  }

  obtenerProductoPorId(id: number): Producto | undefined {
    return this.productos.find(p => p.id === id);
  }

  actualizarStock(id: number, nuevoStock: number): boolean {
    const producto = this.obtenerProductoPorId(id);
    if (producto) {
      producto.stock = nuevoStock;
      producto.disponible = nuevoStock > 0;
      return true;
    }
    return false;
  }
}

class Carrito {
  private items: CarritoItem[] = [];

  agregarAlCarrito(producto: Producto, cantidad: number = 1): void {
    const itemExistente = this.items.find(
      item => item.producto.id === producto.id
    );

    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      this.items.push({ producto, cantidad });
    }
  }

  calcularTotal(): number {
    return this.items.reduce(
      (total, item) => total + (item.producto.precio * item.cantidad),
      0
    );
  }

  obtenerItems(): CarritoItem[] {
    return this.items;
  }

  vaciar(): void {
    this.items = [];
  }
}

export { Tienda, Carrito, Producto, CarritoItem };
```

---

## 🏠 Tarea para la Próxima Clase

### ✅ Ejercicio:

Crear un sistema de gestión de biblioteca con TypeScript que incluya:

1. **Definir interfaces** para Libro, Usuario y Prestamo
2. **Clase Biblioteca** con métodos para agregar, buscar y eliminar libros
3. **Clase Usuario** con información personal y lista de préstamos
4. **Sistema de préstamos** que permita prestar y devolver libros
5. **Validación de datos** usando tipos de TypeScript para prevenir errores
6. **Generics** para crear contenedores reutilizables (ej: Repositorio<T>)
7. **Tipos union e intersection** para casos específicos (ej: Estado del préstamo)

**Requisitos técnicos:**

- Usar interfaces para definir estructuras de datos
- Implementar clases con métodos tipados correctamente
- Usar tipos union para estados (disponible/prestado/perdido)
- Aplicar generics donde sea apropiado
- Validar tipos en tiempo de compilación
- Código comentado con JSDoc
- Archivo tsconfig.json configurado

---

## 📚 Recursos Adicionales

### 🔗 Enlaces Útiles

- [TypeScript Official Docs](https://www.typescriptlang.org/docs/) - Documentación oficial de TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) - Guía completa del manual
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/) - Guía avanzada de TypeScript
- [TypeScript Playground](https://www.typescriptlang.org/play) - Editor online para experimentar

### 📖 Conceptos para Investigar

- **Decorators** - Característica experimental que permite añadir metadatos a clases y métodos
- **Utility Types** - Tipos predefinidos como Partial, Pick, Omit para transformar tipos
- **Conditional Types** - Tipos que dependen de condiciones para crear tipos dinámicos
- **Mapped Types** - Tipos que permiten crear nuevos tipos basados en propiedades existentes

---

## ❓ Preguntas Frecuentes

### ¿Cuál es la diferencia entre interface y type en TypeScript?

- **Interface:** Ideal para definir la forma de objetos, se puede extender y fusionar (declaration merging), mejor para objetos
- **Type:** Más flexible, puede representar uniones, intersecciones, primitivos y más, mejor para tipos complejos o uniones
- En la mayoría de los casos son intercambiables, pero las interfaces son preferibles para definir contratos de objetos

### ¿Qué es el tipo `any` y cuándo debo usarlo?

- **`any`** desactiva la verificación de tipos de TypeScript para una variable
- **Evítalo cuando sea posible** porque pierdes los beneficios de TypeScript
- **Úsalo solo cuando:** trabajes con código legacy, librerías sin tipos, o cuando realmente no conozcas el tipo
- Prefiere `unknown` sobre `any` para mayor seguridad (requiere verificación de tipos antes de usar)

### ¿Cómo funciona la inferencia de tipos en TypeScript?

- TypeScript puede **inferir tipos automáticamente** sin declararlos explícitamente
- Infiere tipos basándose en el valor asignado, el contexto y el uso
- **Inferencia simple:** `const edad = 25` → TypeScript infiere que es `number`
- **Inferencia de retorno:** TypeScript infiere el tipo de retorno de funciones
- **Inferencia de contexto:** Infiere tipos en callbacks basándose en el contexto

---

## 🎉 ¡TypeScript Dominado!

¡Excelente trabajo! Ya conoces los fundamentos de TypeScript: tipos primitivos, interfaces, tipos personalizados, funciones tipadas y genéricos. En la próxima clase profundizaremos en las clases, propiedades y objetos en TypeScript, donde veremos programación orientada a objetos con tipos estáticos.

**Recuerda:** TypeScript es una herramienta poderosa que mejora significativamente la experiencia de desarrollo. Empieza con tipos básicos y gradualmente incorpora características avanzadas. ¡Sigue practicando y explorando sus capacidades! 🚀

---

_📧 **Contacto:** Si tienes dudas sobre TypeScript, no dudes en consultar durante la clase o por los canales de comunicación establecidos._
