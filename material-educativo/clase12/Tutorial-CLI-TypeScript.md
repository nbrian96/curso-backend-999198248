# 📚 Tutorial Completo: Cómo Construir un CLI con TypeScript

## 📋 Tabla de Contenidos

1. [Introducción y Conceptos Básicos](#1-introducción-y-conceptos-básicos)
2. [Configuración Inicial del Proyecto](#2-configuración-inicial-del-proyecto)
3. [Crear el CLI Básico](#3-crear-el-cli-básico)
4. [Implementar Múltiples Comandos](#4-implementar-múltiples-comandos)
5. [Organización Modular](#5-organización-modular)
6. [Funcionalidades Avanzadas](#6-funcionalidades-avanzadas)
7. [Ejemplos Completos](#7-ejemplos-completos)

---

## 1. Introducción y Conceptos Básicos

### ¿Qué es un CLI?

Un **CLI (Command Line Interface)** es una interfaz de línea de comandos que permite interactuar con un programa desde la terminal. En lugar de usar una interfaz gráfica, escribes comandos de texto que el programa ejecuta.

**Ejemplos de CLIs conocidos:**
- `git` - Control de versiones
- `npm` - Gestor de paquetes de Node.js
- `docker` - Contenedores
- `ls`, `cd`, `mkdir` - Comandos del sistema operativo

### ¿Por qué usar TypeScript para CLIs?

✅ **Type Safety**: TypeScript detecta errores antes de ejecutar el código  
✅ **Mejor Autocompletado**: Los editores ofrecen mejor ayuda  
✅ **Código más mantenible**: Facilita el trabajo en equipo  
✅ **Escalabilidad**: Fácil agregar nuevas funcionalidades  

### Estructura Básica de un CLI

Un CLI típico tiene esta estructura:

```
mi-cli/
├── src/
│   ├── index.ts          # Punto de entrada
│   ├── commands/         # Comandos individuales
│   └── utils/           # Utilidades
├── package.json
├── tsconfig.json
└── README.md
```

### Cómo Funciona un CLI

Cuando ejecutas un comando como:
```bash
ts-node src/index.ts saludar "Juan"
```

El sistema operativo:
1. Ejecuta el programa TypeScript
2. Pasa los argumentos (`saludar` y `"Juan"`) al programa
3. El programa procesa los argumentos y ejecuta la acción correspondiente
4. Muestra el resultado en la terminal

---

## 2. Configuración Inicial del Proyecto

### Paso 1: Crear la Estructura de Carpetas

Abre tu terminal y ejecuta estos comandos:

```bash
# Crear el directorio del proyecto
mkdir mi-cli-tutorial
cd mi-cli-tutorial

# Crear la estructura de carpetas
mkdir -p src/commands src/utils
```

**Explicación:**
- `mkdir -p` crea las carpetas y sus padres si no existen
- `src/` contendrá todo el código fuente
- `src/commands/` almacenará los comandos individuales
- `src/utils/` contendrá funciones auxiliares

### Paso 2: Inicializar npm

```bash
# Inicializar el proyecto npm
npm init -y
```

**Explicación:**
- `npm init` crea un archivo `package.json`
- El flag `-y` acepta todos los valores por defecto

**Resultado esperado:** Se crea el archivo `package.json` con la configuración básica.

### Paso 3: Instalar Dependencias

```bash
# Instalar TypeScript y ts-node como dependencias de desarrollo
npm install --save-dev typescript ts-node @types/node
```

**Explicación de cada paquete:**
- `typescript`: El compilador de TypeScript
- `ts-node`: Permite ejecutar archivos TypeScript directamente sin compilar
- `@types/node`: Tipos de TypeScript para Node.js (necesario para `process.argv`)

**Verificación:** Después de ejecutar, deberías ver una carpeta `node_modules/` y el `package.json` actualizado.

### Paso 4: Configurar TypeScript

Crea el archivo `tsconfig.json`:

```bash
# Crear el archivo de configuración de TypeScript
touch tsconfig.json
```

Ahora edita el archivo `tsconfig.json` y agrega esta configuración:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Explicación de las opciones:**
- `target`: Versión de JavaScript a generar
- `module`: Sistema de módulos (commonjs para Node.js)
- `rootDir`: Carpeta donde están los archivos fuente
- `outDir`: Carpeta donde se compilará el código
- `strict`: Habilita todas las verificaciones estrictas de TypeScript
- `include`: Archivos a incluir en la compilación

### Paso 5: Actualizar package.json

Edita el archivo `package.json` y agrega un script para ejecutar el CLI:

```json
{
  "name": "mi-cli-tutorial",
  "version": "1.0.0",
  "scripts": {
    "start": "ts-node src/index.ts"
  }
}
```

**Nota:** Puedes mantener los otros campos que `npm init` creó automáticamente.

### Verificación del Setup

Para verificar que todo está correcto, crea un archivo de prueba:

```bash
# Crear un archivo de prueba
echo 'console.log("¡TypeScript funciona!");' > src/index.ts
```

Ejecuta el archivo:

```bash
npm start
```

**Resultado esperado:** Deberías ver en la terminal:
```
¡TypeScript funciona!
```

Si ves este mensaje, ¡felicidades! Tu entorno está configurado correctamente. 🎉

---

## 3. Crear el CLI Básico

### Entender process.argv

`process.argv` es un array que contiene los argumentos de la línea de comandos.

**Ejemplo:**
Si ejecutas:
```bash
ts-node src/index.ts saludar "Juan" 25
```

El array `process.argv` será:
```javascript
[
  '/ruta/al/node',           // [0] Ruta al ejecutable de Node.js
  '/ruta/al/ts-node',        // [1] Ruta al script ejecutado
  'saludar',                 // [2] Primer argumento (nuestro comando)
  'Juan',                    // [3] Segundo argumento
  '25'                       // [4] Tercer argumento
]
```

**Importante:** Los argumentos que nos interesan empiezan desde el índice `[2]`.

### Paso 1: Crear el Archivo index.ts Básico

Crea o edita el archivo `src/index.ts`:

```typescript
// src/index.ts

/**
 * Obtener argumentos de la línea de comandos
 * process.argv.slice(2) omite los dos primeros elementos
 * que son la ruta de Node.js y la ruta del script
 */
const args = process.argv.slice(2);

/**
 * El primer argumento es el comando que queremos ejecutar
 */
const comando = args[0];

/**
 * Mostrar información sobre los argumentos recibidos
 */
console.log('=== Información de Argumentos ===');
console.log('Argumentos completos:', process.argv);
console.log('Argumentos del CLI:', args);
console.log('Comando recibido:', comando);
console.log('Número de argumentos:', args.length);
```

### Paso 2: Probar el CLI Básico

Ejecuta diferentes comandos para ver cómo funcionan:

```bash
# Sin argumentos
npm start

# Con un comando
npm start saludar

# Con un comando y argumentos
npm start saludar "Juan" "Pérez"
```

**Resultado esperado (sin argumentos):**
```
=== Información de Argumentos ===
Argumentos completos: [ '/ruta/node', '/ruta/ts-node', '/ruta/src/index.ts' ]
Argumentos del CLI: []
Comando recibido: undefined
Número de argumentos: 0
```

**Resultado esperado (con comando):**
```
=== Información de Argumentos ===
Argumentos completos: [ '/ruta/node', '/ruta/ts-node', '/ruta/src/index.ts', 'saludar' ]
Argumentos del CLI: [ 'saludar' ]
Comando recibido: saludar
Número de argumentos: 1
```

### Paso 3: Implementar el Primer Comando

Ahora vamos a crear nuestro primer comando funcional. Actualiza `src/index.ts`:

```typescript
// src/index.ts

const args = process.argv.slice(2);
const comando = args[0];

/**
 * Función principal que procesa los comandos
 */
function main() {
  // Si no se proporciona ningún comando, mostrar ayuda
  if (!comando) {
    console.log('📖 Bienvenido al CLI Tutorial');
    console.log('Usa: npm start <comando>');
    console.log('Comandos disponibles: saludar');
    return;
  }

  // Procesar el comando
  switch (comando) {
    case 'saludar':
      // Obtener el nombre (segundo argumento)
      const nombre = args[1] || 'Mundo';
      console.log(`👋 ¡Hola, ${nombre}!`);
      break;

    default:
      console.log(`❌ Comando "${comando}" no reconocido`);
      console.log('Comandos disponibles: saludar');
      break;
  }
}

// Ejecutar la función principal
main();
```

### Paso 4: Probar el Primer Comando

```bash
# Sin argumentos (muestra ayuda)
npm start

# Con el comando saludar sin nombre
npm start saludar

# Con el comando saludar y un nombre
npm start saludar "Juan"
```

**Resultado esperado:**
```
👋 ¡Hola, Juan!
```

¡Has creado tu primer CLI funcional! 🎉

---

## 4. Implementar Múltiples Comandos

Ahora vamos a expandir nuestro CLI con múltiples comandos y validaciones.

### Paso 1: Agregar Más Comandos

Actualiza `src/index.ts` con más comandos:

```typescript
// src/index.ts

const args = process.argv.slice(2);
const comando = args[0];

function main() {
  if (!comando) {
    mostrarAyuda();
    return;
  }

  switch (comando) {
    case 'saludar':
      comandoSaludar();
      break;

    case 'sumar':
      comandoSumar();
      break;

    case 'listar':
      comandoListar();
      break;

    case 'info':
      comandoInfo();
      break;

    case 'ayuda':
    case 'help':
      mostrarAyuda();
      break;

    default:
      console.log(`❌ Comando "${comando}" no reconocido`);
      console.log('Usa: npm start ayuda para ver los comandos disponibles');
      break;
  }
}

/**
 * Comando: saludar
 * Uso: npm start saludar [nombre]
 */
function comandoSaludar() {
  const nombre = args[1] || 'Mundo';
  console.log(`👋 ¡Hola, ${nombre}!`);
  console.log(`📅 Fecha actual: ${new Date().toLocaleString()}`);
}

/**
 * Comando: sumar
 * Uso: npm start sumar <numero1> <numero2>
 */
function comandoSumar() {
  // Validar que se proporcionen los argumentos necesarios
  if (args.length < 3) {
    console.error('❌ Error: Faltan argumentos');
    console.log('Uso: npm start sumar <numero1> <numero2>');
    console.log('Ejemplo: npm start sumar 5 3');
    process.exit(1); // Salir con código de error
  }

  const numero1 = parseFloat(args[1]);
  const numero2 = parseFloat(args[2]);

  // Validar que los argumentos sean números
  if (isNaN(numero1) || isNaN(numero2)) {
    console.error('❌ Error: Los argumentos deben ser números');
    process.exit(1);
  }

  const resultado = numero1 + numero2;
  console.log(`➕ ${numero1} + ${numero2} = ${resultado}`);
}

/**
 * Comando: listar
 * Uso: npm start listar [cantidad]
 */
function comandoListar() {
  const cantidad = parseInt(args[1]) || 5;
  
  if (cantidad < 1 || cantidad > 20) {
    console.error('❌ Error: La cantidad debe estar entre 1 y 20');
    process.exit(1);
  }

  console.log(`📋 Listando ${cantidad} elementos:`);
  for (let i = 1; i <= cantidad; i++) {
    console.log(`  ${i}. Elemento número ${i}`);
  }
}

/**
 * Comando: info
 * Uso: npm start info
 */
function comandoInfo() {
  console.log('ℹ️  Información del Sistema:');
  console.log(`   Node.js versión: ${process.version}`);
  console.log(`   Plataforma: ${process.platform}`);
  console.log(`   Directorio actual: ${process.cwd()}`);
  console.log(`   Argumentos recibidos: ${args.length}`);
  console.log(`   Variables de entorno NODE_ENV: ${process.env.NODE_ENV || 'no definida'}`);
}

/**
 * Mostrar ayuda con todos los comandos disponibles
 */
function mostrarAyuda() {
  console.log('📖 CLI Tutorial - Comandos Disponibles\n');
  console.log('  saludar [nombre]     - Saluda a una persona');
  console.log('  sumar <n1> <n2>      - Suma dos números');
  console.log('  listar [cantidad]    - Lista elementos (1-20, default: 5)');
  console.log('  info                 - Muestra información del sistema');
  console.log('  ayuda / help         - Muestra esta ayuda\n');
  console.log('Ejemplos:');
  console.log('  npm start saludar "Juan"');
  console.log('  npm start sumar 10 5');
  console.log('  npm start listar 3');
}

// Ejecutar la función principal
main();
```

### Paso 2: Probar Todos los Comandos

Ejecuta estos comandos uno por uno para probar cada funcionalidad:

```bash
# Ver ayuda
npm start ayuda

# Saludar
npm start saludar "María"

# Sumar números
npm start sumar 15 27

# Listar elementos
npm start listar 3

# Información del sistema
npm start info

# Probar validaciones (debería mostrar error)
npm start sumar
npm start sumar 5
npm start listar 25
```

### Conceptos Importantes

**1. Validación de Argumentos:**
```typescript
if (args.length < 3) {
  console.error('❌ Error: Faltan argumentos');
  process.exit(1);
}
```

**2. Conversión de Tipos:**
```typescript
const numero = parseFloat(args[1]); // Convierte string a número
const cantidad = parseInt(args[1]); // Convierte a entero
```

**3. Valores por Defecto:**
```typescript
const nombre = args[1] || 'Mundo'; // Si no hay argumento, usa 'Mundo'
```

**4. Códigos de Salida:**
```typescript
process.exit(1); // Salir con error (cualquier número != 0 es error)
process.exit(0); // Salir exitosamente (implícito si no hay error)
```

---

## 5. Organización Modular

A medida que el CLI crece, es importante organizar el código en módulos separados.

### Paso 1: Crear Estructura de Carpetas

```bash
# Ya tenemos estas carpetas, pero vamos a organizarlas mejor
mkdir -p src/commands
mkdir -p src/utils
```

### Paso 2: Crear Módulo de Utilidades

Crea `src/utils/helpers.ts`:

```typescript
// src/utils/helpers.ts

/**
 * Valida que un string sea un número válido
 */
export function esNumero(valor: string): boolean {
  return !isNaN(parseFloat(valor)) && isFinite(parseFloat(valor));
}

/**
 * Muestra un mensaje de error y sale del programa
 */
export function mostrarError(mensaje: string, codigo: number = 1): never {
  console.error(`❌ Error: ${mensaje}`);
  process.exit(codigo);
}

/**
 * Valida que se proporcionen los argumentos necesarios
 */
export function validarArgumentos(
  args: string[],
  cantidadMinima: number,
  mensajeError: string
): void {
  if (args.length < cantidadMinima) {
    mostrarError(mensajeError);
  }
}

/**
 * Obtiene un argumento o devuelve un valor por defecto
 */
export function obtenerArgumento(
  args: string[],
  indice: number,
  valorPorDefecto?: string
): string {
  return args[indice] || valorPorDefecto || '';
}
```

### Paso 3: Crear Comandos Separados

Crea `src/commands/saludar.ts`:

```typescript
// src/commands/saludar.ts

import { obtenerArgumento } from '../utils/helpers';

/**
 * Comando: saludar
 * Saluda a una persona
 */
export function ejecutarSaludar(args: string[]): void {
  const nombre = obtenerArgumento(args, 1, 'Mundo');
  console.log(`👋 ¡Hola, ${nombre}!`);
  console.log(`📅 Fecha actual: ${new Date().toLocaleString()}`);
}
```

Crea `src/commands/sumar.ts`:

```typescript
// src/commands/sumar.ts

import { validarArgumentos, esNumero, mostrarError } from '../utils/helpers';

/**
 * Comando: sumar
 * Suma dos números
 */
export function ejecutarSumar(args: string[]): void {
  validarArgumentos(
    args,
    3,
    'Faltan argumentos. Uso: npm start sumar <numero1> <numero2>'
  );

  const numero1Str = args[1];
  const numero2Str = args[2];

  if (!esNumero(numero1Str) || !esNumero(numero2Str)) {
    mostrarError('Los argumentos deben ser números');
  }

  const numero1 = parseFloat(numero1Str);
  const numero2 = parseFloat(numero2Str);
  const resultado = numero1 + numero2;

  console.log(`➕ ${numero1} + ${numero2} = ${resultado}`);
}
```

Crea `src/commands/listar.ts`:

```typescript
// src/commands/listar.ts

import { obtenerArgumento, mostrarError } from '../utils/helpers';

/**
 * Comando: listar
 * Lista una cantidad de elementos
 */
export function ejecutarListar(args: string[]): void {
  const cantidadStr = obtenerArgumento(args, 1, '5');
  const cantidad = parseInt(cantidadStr);

  if (isNaN(cantidad) || cantidad < 1 || cantidad > 20) {
    mostrarError('La cantidad debe ser un número entre 1 y 20');
  }

  console.log(`📋 Listando ${cantidad} elementos:`);
  for (let i = 1; i <= cantidad; i++) {
    console.log(`  ${i}. Elemento número ${i}`);
  }
}
```

Crea `src/commands/info.ts`:

```typescript
// src/commands/info.ts

/**
 * Comando: info
 * Muestra información del sistema
 */
export function ejecutarInfo(): void {
  console.log('ℹ️  Información del Sistema:');
  console.log(`   Node.js versión: ${process.version}`);
  console.log(`   Plataforma: ${process.platform}`);
  console.log(`   Directorio actual: ${process.cwd()}`);
  console.log(`   Variables de entorno NODE_ENV: ${process.env.NODE_ENV || 'no definida'}`);
}
```

Crea `src/commands/ayuda.ts`:

```typescript
// src/commands/ayuda.ts

/**
 * Comando: ayuda
 * Muestra la ayuda con todos los comandos
 */
export function ejecutarAyuda(): void {
  console.log('📖 CLI Tutorial - Comandos Disponibles\n');
  console.log('  saludar [nombre]     - Saluda a una persona');
  console.log('  sumar <n1> <n2>      - Suma dos números');
  console.log('  listar [cantidad]    - Lista elementos (1-20, default: 5)');
  console.log('  info                 - Muestra información del sistema');
  console.log('  ayuda / help         - Muestra esta ayuda\n');
  console.log('Ejemplos:');
  console.log('  npm start saludar "Juan"');
  console.log('  npm start sumar 10 5');
  console.log('  npm start listar 3');
}
```

### Paso 4: Actualizar index.ts para Usar los Módulos

Actualiza `src/index.ts`:

```typescript
// src/index.ts

import { ejecutarSaludar } from './commands/saludar';
import { ejecutarSumar } from './commands/sumar';
import { ejecutarListar } from './commands/listar';
import { ejecutarInfo } from './commands/info';
import { ejecutarAyuda } from './commands/ayuda';

const args = process.argv.slice(2);
const comando = args[0];

function main() {
  if (!comando) {
    ejecutarAyuda();
    return;
  }

  switch (comando) {
    case 'saludar':
      ejecutarSaludar(args);
      break;

    case 'sumar':
      ejecutarSumar(args);
      break;

    case 'listar':
      ejecutarListar(args);
      break;

    case 'info':
      ejecutarInfo();
      break;

    case 'ayuda':
    case 'help':
      ejecutarAyuda();
      break;

    default:
      console.log(`❌ Comando "${comando}" no reconocido`);
      console.log('Usa: npm start ayuda para ver los comandos disponibles');
      process.exit(1);
  }
}

main();
```

### Ventajas de la Organización Modular

✅ **Código más limpio**: Cada comando en su propio archivo  
✅ **Fácil de mantener**: Cambios aislados por funcionalidad  
✅ **Reutilizable**: Las utilidades se pueden usar en múltiples comandos  
✅ **Escalable**: Fácil agregar nuevos comandos  
✅ **Testeable**: Cada módulo se puede probar independientemente  

---

## 6. Funcionalidades Avanzadas

### 6.1. Colores en la Terminal

Para agregar colores a la terminal, puedes usar códigos ANSI o una librería como `chalk`.

**Opción 1: Códigos ANSI (sin dependencias)**

Crea `src/utils/colores.ts`:

```typescript
// src/utils/colores.ts

export const colores = {
  reset: '\x1b[0m',
  rojo: '\x1b[31m',
  verde: '\x1b[32m',
  amarillo: '\x1b[33m',
  azul: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  blanco: '\x1b[37m',
};

export function textoRojo(texto: string): string {
  return `${colores.rojo}${texto}${colores.reset}`;
}

export function textoVerde(texto: string): string {
  return `${colores.verde}${texto}${colores.reset}`;
}

export function textoAmarillo(texto: string): string {
  return `${colores.amarillo}${texto}${colores.reset}`;
}

export function textoAzul(texto: string): string {
  return `${colores.azul}${texto}${colores.reset}`;
}
```

**Uso:**
```typescript
import { textoVerde, textoRojo } from './utils/colores';

console.log(textoVerde('✅ Operación exitosa'));
console.log(textoRojo('❌ Error en la operación'));
```

**Opción 2: Usar la librería chalk (recomendado)**

```bash
npm install chalk
npm install --save-dev @types/chalk
```

```typescript
import chalk from 'chalk';

console.log(chalk.green('✅ Operación exitosa'));
console.log(chalk.red('❌ Error en la operación'));
console.log(chalk.blue.bold('Texto en azul y negrita'));
```

### 6.2. Manejo de Errores Mejorado

Crea `src/utils/errores.ts`:

```typescript
// src/utils/errores.ts

export class ErrorCLI extends Error {
  constructor(
    mensaje: string,
    public codigo: number = 1,
    public mostrarAyuda: boolean = false
  ) {
    super(mensaje);
    this.name = 'ErrorCLI';
  }
}

export function manejarError(error: unknown): void {
  if (error instanceof ErrorCLI) {
    console.error(`❌ ${error.message}`);
    if (error.mostrarAyuda) {
      console.log('\nUsa: npm start ayuda para ver los comandos disponibles');
    }
    process.exit(error.codigo);
  } else if (error instanceof Error) {
    console.error(`❌ Error inesperado: ${error.message}`);
    process.exit(1);
  } else {
    console.error('❌ Error desconocido');
    process.exit(1);
  }
}
```

**Uso:**
```typescript
import { ErrorCLI } from './utils/errores';

if (args.length < 3) {
  throw new ErrorCLI('Faltan argumentos', 1, true);
}
```

### 6.3. Argumentos Opcionales y Flags

Crea `src/utils/parser.ts` para parsear argumentos más complejos:

```typescript
// src/utils/parser.ts

export interface Opciones {
  [key: string]: string | boolean;
}

/**
 * Parsea argumentos en formato --flag o --flag=valor
 */
export function parsearArgumentos(args: string[]): {
  comandos: string[];
  opciones: Opciones;
} {
  const comandos: string[] = [];
  const opciones: Opciones = {};

  for (const arg of args) {
    if (arg.startsWith('--')) {
      // Es una opción
      const sinGuiones = arg.slice(2);
      if (sinGuiones.includes('=')) {
        // Formato: --flag=valor
        const [flag, valor] = sinGuiones.split('=');
        opciones[flag] = valor;
      } else {
        // Formato: --flag (booleano)
        opciones[sinGuiones] = true;
      }
    } else {
      // Es un comando o argumento
      comandos.push(arg);
    }
  }

  return { comandos, opciones };
}
```

**Ejemplo de uso:**
```typescript
// npm start saludar "Juan" --formato=json --verbose

const { comandos, opciones } = parsearArgumentos(args);
// comandos = ['saludar', 'Juan']
// opciones = { formato: 'json', verbose: true }
```

### 6.4. Progreso y Animaciones

Para mostrar barras de progreso, puedes usar `cli-progress`:

```bash
npm install cli-progress
```

```typescript
import cliProgress from 'cli-progress';

const barra = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

barra.start(100, 0);

// Simular progreso
for (let i = 0; i <= 100; i++) {
  await new Promise(resolve => setTimeout(resolve, 50));
  barra.update(i);
}

barra.stop();
```

---

## 7. Ejemplos Completos

### Ejemplo 1: CLI de Tareas Simple

Crea `src/commands/tareas.ts`:

```typescript
// src/commands/tareas.ts

interface Tarea {
  id: number;
  descripcion: string;
  completada: boolean;
}

let tareas: Tarea[] = [];
let siguienteId = 1;

export function agregarTarea(descripcion: string): void {
  const tarea: Tarea = {
    id: siguienteId++,
    descripcion,
    completada: false
  };
  tareas.push(tarea);
  console.log(`✅ Tarea agregada: [${tarea.id}] ${descripcion}`);
}

export function listarTareas(): void {
  if (tareas.length === 0) {
    console.log('📭 No hay tareas');
    return;
  }

  console.log('📋 Lista de Tareas:');
  tareas.forEach(tarea => {
    const estado = tarea.completada ? '✅' : '⏳';
    console.log(`  ${estado} [${tarea.id}] ${tarea.descripcion}`);
  });
}

export function completarTarea(id: number): void {
  const tarea = tareas.find(t => t.id === id);
  if (!tarea) {
    console.log(`❌ Tarea ${id} no encontrada`);
    return;
  }
  tarea.completada = true;
  console.log(`✅ Tarea ${id} completada`);
}

export function eliminarTarea(id: number): void {
  const indice = tareas.findIndex(t => t.id === id);
  if (indice === -1) {
    console.log(`❌ Tarea ${id} no encontrada`);
    return;
  }
  tareas.splice(indice, 1);
  console.log(`🗑️  Tarea ${id} eliminada`);
}
```

### Ejemplo 2: CLI con Archivos

Crea `src/commands/archivos.ts`:

```typescript
// src/commands/archivos.ts

import * as fs from 'fs';
import * as path from 'path';

export function listarArchivos(directorio: string = '.'): void {
  try {
    const archivos = fs.readdirSync(directorio);
    console.log(`📁 Archivos en ${path.resolve(directorio)}:`);
    archivos.forEach(archivo => {
      const rutaCompleta = path.join(directorio, archivo);
      const stats = fs.statSync(rutaCompleta);
      const tipo = stats.isDirectory() ? '📁' : '📄';
      const tamano = stats.isFile() ? ` (${stats.size} bytes)` : '';
      console.log(`  ${tipo} ${archivo}${tamano}`);
    });
  } catch (error) {
    console.error(`❌ Error al leer directorio: ${error}`);
  }
}

export function crearArchivo(nombre: string, contenido: string = ''): void {
  try {
    fs.writeFileSync(nombre, contenido, 'utf8');
    console.log(`✅ Archivo "${nombre}" creado`);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error}`);
  }
}

export function leerArchivo(nombre: string): void {
  try {
    const contenido = fs.readFileSync(nombre, 'utf8');
    console.log(`📄 Contenido de "${nombre}":`);
    console.log('---');
    console.log(contenido);
    console.log('---');
  } catch (error) {
    console.error(`❌ Error al leer archivo: ${error}`);
  }
}
```

### Ejemplo 3: CLI Completo Integrado

Aquí tienes un `src/index.ts` completo que integra todos los conceptos:

```typescript
// src/index.ts

import { ejecutarSaludar } from './commands/saludar';
import { ejecutarSumar } from './commands/sumar';
import { ejecutarListar } from './commands/listar';
import { ejecutarInfo } from './commands/info';
import { ejecutarAyuda } from './commands/ayuda';
import { manejarError } from './utils/errores';

const args = process.argv.slice(2);
const comando = args[0];

async function main() {
  try {
    if (!comando) {
      ejecutarAyuda();
      return;
    }

    switch (comando) {
      case 'saludar':
        ejecutarSaludar(args);
        break;

      case 'sumar':
        ejecutarSumar(args);
        break;

      case 'listar':
        ejecutarListar(args);
        break;

      case 'info':
        ejecutarInfo();
        break;

      case 'ayuda':
      case 'help':
      case '--help':
      case '-h':
        ejecutarAyuda();
        break;

      default:
        console.log(`❌ Comando "${comando}" no reconocido`);
        console.log('Usa: npm start ayuda para ver los comandos disponibles');
        process.exit(1);
    }
  } catch (error) {
    manejarError(error);
  }
}

main();
```

---

## 📝 Resumen y Mejores Prácticas

### Estructura Recomendada

```
mi-cli/
├── src/
│   ├── index.ts              # Punto de entrada
│   ├── commands/             # Comandos individuales
│   │   ├── saludar.ts
│   │   ├── sumar.ts
│   │   └── ...
│   └── utils/                # Utilidades
│       ├── helpers.ts
│       ├── colores.ts
│       └── errores.ts
├── package.json
├── tsconfig.json
└── README.md
```

### Mejores Prácticas

1. ✅ **Validar siempre los argumentos** antes de usarlos
2. ✅ **Mostrar mensajes de error claros** con ejemplos de uso
3. ✅ **Usar códigos de salida apropiados** (0 = éxito, != 0 = error)
4. ✅ **Organizar el código en módulos** para mantenerlo limpio
5. ✅ **Documentar cada comando** con comentarios
6. ✅ **Proporcionar ayuda** con el comando `ayuda` o `help`
7. ✅ **Manejar errores apropiadamente** con try/catch
8. ✅ **Usar TypeScript** para type safety

### Comandos Útiles para Desarrollo

```bash
# Ejecutar el CLI
npm start <comando>

# Compilar TypeScript (si quieres generar JavaScript)
npx tsc

# Ejecutar con Node.js directamente (después de compilar)
node dist/index.js <comando>

# Verificar tipos sin compilar
npx tsc --noEmit
```

### Próximos Pasos

Una vez que domines estos conceptos, puedes:

1. **Agregar persistencia**: Guardar datos en archivos JSON o bases de datos
2. **Crear comandos interactivos**: Usar librerías como `inquirer` para prompts
3. **Agregar tests**: Probar tus comandos con Jest o Mocha
4. **Publicar como paquete npm**: Hacer tu CLI instalable globalmente
5. **Agregar autocompletado**: Permitir que la terminal autocomplete comandos

---

## 🎓 Ejercicios Prácticos

### Ejercicio 1: Crear un comando "multiplicar"
Crea un comando que multiplique dos números, similar al comando `sumar`.

### Ejercicio 2: Crear un comando "contar"
Crea un comando que cuente las palabras en un texto proporcionado.

### Ejercicio 3: Crear un comando "aleatorio"
Crea un comando que genere un número aleatorio entre dos valores.

### Ejercicio 4: Mejorar el manejo de errores
Agrega manejo de errores con try/catch a todos los comandos.

### Ejercicio 5: Agregar colores
Implementa colores en los mensajes de éxito y error.

---

## 📚 Recursos Adicionales

- [Documentación de Node.js - process.argv](https://nodejs.org/api/process.html#processargv)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [npm - Crear paquetes ejecutables](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#bin)

---

¡Felicitaciones! 🎉 Ahora tienes todas las herramientas para crear CLIs profesionales con TypeScript. ¡A construir! 🚀

