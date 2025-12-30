# 📖 Clase 13: Introducción a NodeJs

## 🎯 Objetivos de la Clase

- Comprender qué es Node.js y para qué se utiliza en el desarrollo backend.
- Conocer el rol de Express como framework para crear servidores HTTP.
- Crear un proyecto base de backend usando Node.js, Express y TypeScript.
- Configurar correctamente TypeScript, scripts y estructura de carpetas.
- Implementar endpoints HTTP simples y probarlos localmente.

---

## 📚 ¿Qué es Node.js?

### 🔍 Definición

**Node.js** es un entorno de ejecución de JavaScript que permite ejecutar código JS fuera del navegador, principalmente del lado del servidor.

### 🏗️ Características Principales

- Ejecuta JavaScript en el backend
- Basado en el motor **V8** de Google Chrome
- Modelo **asíncrono y orientado a eventos**
- Ideal para APIs y servicios HTTP

### 📖 Historia Breve

- **2009:** Ryan Dahl presenta Node.js
- **2010:** Se populariza npm (Node Package Manager)
- **2015:** Aparece TypeScript y se adopta masivamente
- **Hoy:** Node.js es uno de los pilares del desarrollo backend moderno

---

## 🏛️ Backend básico con Node.js

### 📝 ¿Qué es un backend?

Es la parte de una aplicación que:

- Maneja lógica de negocio
- Expone endpoints (APIs)
- Se comunica con bases de datos

Node.js permite crear servidores HTTP de forma sencilla.

---

## 🏗️ Express + TypeScript

### 📝 ¿Qué es Express?

Express es un framework minimalista para Node.js que facilita:

- Crear servidores HTTP
- Definir rutas (endpoints)
- Manejar requests y responses

### 📝 ¿Por qué TypeScript?

- Tipado estático
- Menos errores en tiempo de desarrollo
- Mejor experiencia de mantenimiento

---

## 🚀 Creando el Proyecto Paso a Paso

### 📁 1. Crear carpeta del proyecto

```bash
mkdir backend-node-ts
cd backend-node-ts
```

### 📦 2. Inicializar proyecto Node.js

```bash
npm init -y
```

### 📥 3. Instalar dependencias

```bash
npm install express
npm install -D typescript ts-node-dev @types/node @types/express
```

---

### 📂 4. Estructura de carpetas

```bash
# Carpeta principal del código fuente
mkdir src

touch src/index.ts
touch tsconfig.json
```

---

### ⚙️ 5. Configurar TypeScript

En este paso configuramos cómo TypeScript va a compilar nuestro código. Definimos versión de JavaScript de salida, carpetas de entrada/salida y reglas básicas.

**Archivo `tsconfig.json`:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```

---

### ▶️ 6. Configurar scripts

**Archivo `package.json`:**

```json
"scripts": {
  // Ejecuta el servidor en modo desarrollo
  // Reinicia automáticamente cuando hay cambios en el código
  "dev": "ts-node-dev --respawn src/index.ts",

  // Compila el proyecto TypeScript y genera la carpeta dist/
  "build": "tsc",

  // Ejecuta el código ya compilado desde dist/
  // Este script se usa normalmente en producción
  "start": "node dist/index.js"
}
```

---

## 🏛️ Creando el Servidor HTTP

### 📄 Archivo `src/index.ts`

```ts
// Importamos Express y los tipos Request y Response desde express
// Esto nos permite tipar correctamente los parámetros de las rutas
import express, { Request, Response } from 'express';

// Creamos la instancia principal de la aplicación Express
const app = express();

// Definimos el puerto donde va a escuchar el servidor
const PORT = 3000;

// Middleware que permite leer JSON en el body de las requests
app.use(express.json());

// Endpoint GET raíz
// URL: http://localhost:3000/
app.get('/', (req: Request, res: Response) => {
  // Respondemos con un objeto JSON simple
  res.json({ message: 'Servidor funcionando 🚀' });
});

// Endpoint GET /saludo
// URL: http://localhost:3000/saludo
app.get('/saludo', (req: Request, res: Response) => {
  res.json({ saludo: 'Hola desde Node.js + Express + TypeScript' });
});

// Iniciamos el servidor HTTP
// Si todo está correcto, veremos el mensaje en consola
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
```

---

### ▶️ Ejecutar el servidor

```bash
npm run dev
```

Probar en el navegador o en Postman:

- [http://localhost:3000/](http://localhost:3000/)
- [http://localhost:3000/saludo](http://localhost:3000/saludo)

---

## 🏠 Tarea para la Próxima Clase

### ✅ Ejercicio:

Crear un backend simple que:

1. Tenga un endpoint `/ping` que responda `{ pong: true }`
2. Tenga un endpoint `/usuario` que devuelva un objeto usuario
3. Use TypeScript correctamente tipado

**Requisitos técnicos:**

- Node.js
- Express
- TypeScript
- Scripts configurados en package.json

---

## 📚 Recursos Adicionales

### 🔗 Enlaces Útiles

- [https://nodejs.org](https://nodejs.org) - Documentación oficial de Node.js
- [https://expressjs.com](https://expressjs.com) - Documentación oficial de Express
- [https://www.typescriptlang.org](https://www.typescriptlang.org) - Documentación de TypeScript
- [https://npmjs.com](https://npmjs.com) - Gestor de paquetes npm

### 📖 Conceptos para Investigar

- **Middleware**: funciones intermedias en Express
- **REST API**: arquitectura de APIs
- **HTTP Methods**: GET, POST, PUT, DELETE
- **Status Codes**: códigos de respuesta HTTP

---

## ❓ Preguntas Frecuentes

### ¿Node.js reemplaza al frontend?

- No, Node.js se usa principalmente en el backend
- El frontend sigue ejecutándose en el navegador

### ¿Express es obligatorio?

- No, pero simplifica mucho la creación de servidores
- Existen alternativas como Fastify o NestJS

### ¿TypeScript es obligatorio?

- No, pero es altamente recomendado
- Reduce errores y mejora el mantenimiento

---

## 🎉 ¡Node.js Iniciado!

¡Excelente trabajo! Ya diste tus primeros pasos en el desarrollo backend con Node.js, Express y TypeScript. En la próxima clase profundizaremos en **rutas, controladores y estructura profesional de un backend**.

**Recuerda:** practicar creando endpoints es clave para aprender backend. ¡Seguí probando y rompiendo cosas! 🚀

---

_📧 **Contacto:** Si tienes dudas sobre Node.js o Express, consúltalas durante la clase o por los canales habituales._
