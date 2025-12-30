# 📖 Clase 15: Routing, Vistas y Handlebars

## 🎯 Objetivos de la Clase

- Comprender qué es el **routing** en Express y para qué se utiliza.
- Separar rutas de API y rutas de vistas.
- Introducir el concepto de **vistas** en un backend.
- Configurar **Handlebars** como motor de plantillas.
- Renderizar vistas dinámicas desde Express.

---

## 📚 ¿Qué es el Routing?

### 🔍 Definición

El **routing** es el mecanismo que permite definir cómo una aplicación responde a una request según:

- La URL solicitada
- El método HTTP (GET, POST, etc.)

En Express, el routing se implementa mediante rutas.

### 🏗️ Características Principales

- Permite organizar el backend
- Define puntos de entrada claros
- Facilita el mantenimiento del código
- Separa responsabilidades

### 📖 Historia Breve

- **2010:** Express introduce un sistema simple de rutas
- **2012:** Se populariza el uso de routers separados
- **Hoy:** El routing es base de cualquier API o backend MVC

---

## 🏛️ Routing Básico en Express

El routing define **qué hace el servidor cuando llega una request**.
Cada ruta combina:

- Un **método HTTP**
- Una **URL**
- Una **función handler** que ejecuta lógica y devuelve una respuesta

### 📝 Rutas de API

Las rutas de API devuelven datos (JSON) y no HTML.

```ts
app.get('/api/ping', (req, res) => {
  res.json({ pong: true });
});
```

### 📋 Métodos HTTP

Los métodos HTTP indican **la intención de la request**.

| Método      | Uso principal        | Ejemplo        | Descripción                                  |
| ----------- | -------------------- | -------------- | -------------------------------------------- |
| **GET**     | Obtener datos        | `/api/users`   | Solicita información sin modificar el estado |
| **POST**    | Crear datos          | `/api/users`   | Envía datos para crear un recurso            |
| **PUT**     | Actualizar completo  | `/api/users/1` | Reemplaza un recurso existente               |
| **PATCH**   | Actualizar parcial   | `/api/users/1` | Modifica solo parte del recurso              |
| **DELETE**  | Eliminar datos       | `/api/users/1` | Borra un recurso                             |
| **OPTIONS** | Info de comunicación | `/api/users`   | Usado para CORS y preflight                  |
| **HEAD**    | Headers solamente    | `/api/users`   | Similar a GET pero sin body                  |

---

## 🏗️ Introducción a Vistas

### 📝 ¿Qué son las vistas?

Las **vistas** son archivos que:

- Se renderizan en el servidor
- Generan HTML dinámico
- Se envían al navegador ya procesados

Esto es distinto a servir HTML estático.

---

## 🧩 Handlebars como Motor de Plantillas

### 📝 ¿Qué es Handlebars?

**Handlebars** es un motor de plantillas que permite:

- Insertar variables en HTML
- Usar estructuras simples (if, each)
- Mantener el HTML legible

---

## 🚀 Configuración Paso a Paso

### 📦 1. Instalar dependencias

```bash
npm install express-handlebars
```

---

### 📂 2. Crear estructura de vistas

```bash
mkdir src/routes
mkdir src/views
mkdir src/views/layouts

touch src/routes/views.routes.ts
touch src/views/layouts/main.handlebars
touch src/views/home.handlebars
```

### 🗂️ Esquema de carpetas

```text
src/
├── index.ts               # Archivo principal del servidor
├── routes/
│   └── views.routes.ts    # Routing de vistas
└── views/
    ├── layouts/
    │   └── main.handlebars # Layout base reutilizable
    └── home.handlebars     # Vista principal

public/
└── (archivos estáticos)
```

Este esquema muestra claramente:

- Separación entre **lógica de rutas** y **vistas**
- Uso de layouts para reutilizar HTML
- Convivencia entre backend y frontend en un monolito

---

## ⚙️ Configurar Handlebars en Express

### 📄 Modificación de `src/index.ts`

```ts
import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import viewsRouter from './routes/views.routes';

const app = express();
const PORT = 3000;

// Configuración del motor de plantillas Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rutas de vistas
app.use('/', viewsRouter);

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
```

### 📝 Explicación

- `app.engine` registra Handlebars
- `view engine` define la extensión por defecto
- `views` indica dónde están las plantillas

---

## 🧭 Routing de Vistas

### 📄 Archivo `src/routes/views.routes.ts`

```ts
import { Router } from 'express';

const router = Router();

// Ruta principal que renderiza una vista
router.get('/', (req, res) => {
  res.render('home', {
    titulo: 'Home',
    mensaje: 'Renderizando vistas con Handlebars 🚀',
  });
});

export default router;
```

---

## 🎨 Creación de Vistas

### 📄 Layout principal `main.handlebars`

```handlebars
<html lang='es'>
  <head>
    <meta charset='UTF-8' />
    <title>{{titulo}}</title>
  </head>
  <body>
    {{{body}}}
  </body>
</html>
```

### 📄 Vista `home.handlebars`

```handlebars
<h1>{{titulo}}</h1>
<p>{{mensaje}}</p>
```

---

## ▶️ Probar la Aplicación

```bash
npm run dev
```

Abrir:

- [http://localhost:3000](http://localhost:3000)

Resultado esperado:

- HTML renderizado desde el servidor
- Datos dinámicos inyectados en la vista

---

## 🏠 Tarea para la Próxima Clase

### ✅ Ejercicio

1. Crear una vista `about.handlebars`
2. Agregar una ruta `/about`
3. Pasar variables distintas a cada vista
4. Reutilizar el layout

**Requisitos técnicos:**

- Express
- Handlebars
- Routing separado

---

## 📚 Recursos Adicionales

### 🔗 Enlaces Útiles

- [https://expressjs.com](https://expressjs.com) - Express
- [https://handlebarsjs.com](https://handlebarsjs.com) - Handlebars
- [https://www.npmjs.com/package/express-handlebars](https://www.npmjs.com/package/express-handlebars) - express-handlebars

### 📖 Conceptos para Investigar

- MVC
- SSR (Server Side Rendering)
- Layouts y partials
- Motores de plantillas

---

## ❓ Preguntas Frecuentes

### ¿Esto reemplaza al frontend?

- No, es renderizado del lado servidor
- Es ideal para apps simples o educativas

### ¿Se sigue usando?

- Sí, en dashboards, backoffices y apps SSR

### ¿Es mejor que React?

- Son enfoques distintos
- Handlebars renderiza en servidor

---

## 🎉 ¡Routing y Vistas Dominados!

Excelente trabajo. Ahora tu backend no solo responde APIs, sino que renderiza vistas dinámicas usando Handlebars. En la próxima clase veremos **separación de lógica y patrones MVC**.

---

_📧 **Contacto:** Ante dudas sobre routing o Handlebars, consultá durante la clase o por los canales habituales._
