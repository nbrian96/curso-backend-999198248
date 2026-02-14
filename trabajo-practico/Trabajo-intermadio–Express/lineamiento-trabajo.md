# Lineamientos de Trabajo

## 1. Tecnologías Base
- **Lenguaje:** TypeScript
- **Framework:** Express.js
- **Base de Datos:** MongoDB con Mongoose
- **Entorno:** Node.js

## 2. Arquitectura
Se sigue una arquitectura **MVC (Modelo-Vista-Controlador)** con una capa de **Servicios** para la lógica de negocio.

- `src/models`: Definiciones de esquemas de Mongoose.
- `src/controllers`: Manejo de peticiones HTTP (Request/Response). No debe contener lógica de negocio compleja.
- `src/services`: Lógica de negocio pura. Interacción con la base de datos.
- `src/routes`: Definición de endpoints y asociación con controladores.
- `src/middlewares`: Intermediarios para validación, autenticación, etc.

## 3. Convenciones de Código
- **Idioma:** Variables, funciones, clases y métodos en **Inglés**.
- **Comentarios:** **No** se deben dejar comentarios en el código (código autodocumentado).
- **Formato:** Mantener linteo estricto y buenas prácticas.
- **Nombrado:**
    - Archivos: `kebab-case.type.ts` (ej. `veterinarian.controller.ts`)
    - Clases: `PascalCase`
    - Variables/Funciones: `camelCase`

## 4. Patrones de Diseño
- **Inyección de Dependencias (Implícita):** Los controladores instancian los servicios.
- **Manejo de Errores:** `try/catch` en controladores. Servicios lanzan excepciones.
- **Respuestas:** Formato consistente (ej. `{ success: boolean, data?: any, message?: string }` o similar según el caso).

## 6. Validación
- **Regla:** Cada ruta debe tener su propio validador (middleware) antes de llegar al controlador.
- **Ubicación:** `src/validator/*.validator.ts`.
- **Librería:** `express-validator`.

## 5. Endpoints
- **Públicos:** Definidos en routes públicas (ej. `public.routes.ts` o agrupadores específicos).
- **Privados:** Protegidos por middleware de autenticación (`auth.middleware`).