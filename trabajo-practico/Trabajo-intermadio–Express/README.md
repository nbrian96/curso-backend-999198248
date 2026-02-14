# TP Intermedio - Backend con Express + MongoDB + JWT

Servidor backend desarrollado con Express.js, MongoDB, autenticación JWT y arquitectura MVC. El sistema permite gestionar veterinarios (como administrador) y citas veterinarias (asociadas a usuarios autenticados).

## 🚀 Tecnologías

- **Node.js** con **TypeScript**
- **Express.js** - Framework web
- **MongoDB** con **Mongoose** - Base de datos
- **JWT** (jsonwebtoken) - Autenticación
- **bcrypt** - Hash de contraseñas
- **express-validator** - Validación de datos
- **CORS** - Control de acceso entre orígenes

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- MongoDB (local o MongoDB Atlas)
- npm o yarn

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd tp-intermedio-nelson-avila
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

4. Editar el archivo `.env` con tus configuraciones:
```env
PORT=3000
BASE_URL=http://localhost
MONGODB_URI=mongodb://localhost:27017/tp_intermedio_db
JWT_SECRET=tu_secret_key_muy_segura
JWT_EXPIRES_IN=1d
NODE_ENV=development
```

5. Compilar TypeScript:
```bash
npm run build
```

## 🏃 Ejecución

### Modo Desarrollo
```bash
npm run dev
```

### Modo Producción
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000` (o el puerto configurado en `.env`).

## 📚 Endpoints

### Autenticación (Públicos)

#### Registrar Usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "User created successfully"
}
```

#### Iniciar Sesión
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Veterinarios (Administrador)

#### Listar Veterinarios (Público)
```http
GET /api/veterinarians
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "Juan",
      "lastName": "Pérez",
      "specialty": "Cirugía"
    }
  ]
}
```

#### Crear Veterinario (Protegido - Requiere Token)
```http
POST /api/veterinarians
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "María",
  "lastName": "González",
  "medicalLicense": "VET12345",
  "specialty": "Cardiología"
}
```

#### Obtener Veterinario por ID (Protegido)
```http
GET /api/veterinarians/:id
Authorization: Bearer <token>
```

#### Actualizar Veterinario (Protegido)
```http
PATCH /api/veterinarians/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "specialty": "Neurología"
}
```

#### Eliminar Veterinario (Protegido)
```http
DELETE /api/veterinarians/:id
Authorization: Bearer <token>
```

### Citas (Usuario Autenticado)

#### Listar Mis Citas (Protegido)
```http
GET /api/appointments
Authorization: Bearer <token>
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "petName": "Max",
      "date": "2024-12-25T10:00:00.000Z",
      "reason": "Vacunación anual",
      "status": "scheduled",
      "veterinarianId": {
        "name": "Juan",
        "lastName": "Pérez",
        "specialty": "Cirugía"
      }
    }
  ]
}
```

#### Crear Cita (Protegido)
```http
POST /api/appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "veterinarianId": "507f1f77bcf86cd799439011",
  "petName": "Max",
  "date": "2024-12-25T10:00:00.000Z",
  "reason": "Vacunación anual",
  "status": "scheduled"
}
```

#### Obtener Cita por ID (Protegido)
```http
GET /api/appointments/:id
Authorization: Bearer <token>
```

#### Actualizar Cita (Protegido)
```http
PATCH /api/appointments/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed"
}
```

#### Eliminar Cita (Protegido)
```http
DELETE /api/appointments/:id
Authorization: Bearer <token>
```

## 🔐 Autenticación

Todas las rutas protegidas requieren un token JWT en el header:

```http
Authorization: Bearer <token>
```

El token se obtiene al hacer login exitoso y expira según la configuración de `JWT_EXPIRES_IN` (por defecto: 1 día).

## 📝 Validaciones

### Registro de Usuario
- `username`: Requerido, string
- `email`: Requerido, email válido
- `password`: Requerido, entre 6 y 12 caracteres

### Login
- `email`: Requerido, email válido
- `password`: Requerido

### Veterinario
- `name`: Requerido, string
- `lastName`: Requerido, string
- `medicalLicense`: Requerido, string único
- `specialty`: Requerido, string

### Cita
- `veterinarianId`: Requerido, MongoDB ID válido
- `petName`: Requerido, string
- `date`: Requerido, fecha ISO 8601
- `reason`: Requerido, string
- `status`: Opcional, uno de: `scheduled`, `completed`, `cancelled`

## 🧪 Colección de Pruebas

### Postman / Thunder Client

Importa la siguiente colección para probar todos los endpoints:

```json
{
  "info": {
    "name": "TP Intermedio - API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"username\": \"testuser\",\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/auth/register",
              "host": ["{{baseUrl}}"],
              "path": ["api", "auth", "register"]
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/auth/login",
              "host": ["{{baseUrl}}"],
              "path": ["api", "auth", "login"]
            }
          }
        }
      ]
    },
    {
      "name": "Veterinarians",
      "item": [
        {
          "name": "List Veterinarians",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{baseUrl}}/api/veterinarians",
              "host": ["{{baseUrl}}"],
              "path": ["api", "veterinarians"]
            }
          }
        },
        {
          "name": "Create Veterinarian",
          "request": {
            "method": "POST",
            "header": [
              {"key": "Authorization", "value": "Bearer {{token}}"},
              {"key": "Content-Type", "value": "application/json"}
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"María\",\n  \"lastName\": \"González\",\n  \"medicalLicense\": \"VET12345\",\n  \"specialty\": \"Cardiología\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/veterinarians",
              "host": ["{{baseUrl}}"],
              "path": ["api", "veterinarians"]
            }
          }
        }
      ]
    },
    {
      "name": "Appointments",
      "item": [
        {
          "name": "List My Appointments",
          "request": {
            "method": "GET",
            "header": [{"key": "Authorization", "value": "Bearer {{token}}"}],
            "url": {
              "raw": "{{baseUrl}}/api/appointments",
              "host": ["{{baseUrl}}"],
              "path": ["api", "appointments"]
            }
          }
        },
        {
          "name": "Create Appointment",
          "request": {
            "method": "POST",
            "header": [
              {"key": "Authorization", "value": "Bearer {{token}}"},
              {"key": "Content-Type", "value": "application/json"}
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"veterinarianId\": \"507f1f77bcf86cd799439011\",\n  \"petName\": \"Max\",\n  \"date\": \"2024-12-25T10:00:00.000Z\",\n  \"reason\": \"Vacunación anual\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/appointments",
              "host": ["{{baseUrl}}"],
              "path": ["api", "appointments"]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000"
    },
    {
      "key": "token",
      "value": ""
    }
  ]
}
```

**Nota:** Guarda el token obtenido del login en la variable `{{token}}` para usar en las peticiones protegidas.

## 🏗️ Arquitectura

El proyecto sigue el patrón **MVC (Modelo-Vista-Controlador)** con capa de servicios:

```
src/
├── config/          # Configuración (base de datos)
├── controllers/     # Controladores HTTP
├── middlewares/     # Middlewares (auth, errores)
├── models/           # Modelos de Mongoose
├── routes/           # Definición de rutas
├── services/         # Lógica de negocio
├── utils/            # Utilidades (JWT)
└── validator/        # Validadores de express-validator
```

## 🔒 Seguridad

- Contraseñas hasheadas con **bcrypt** (salt rounds: 10)
- Tokens JWT con expiración configurable
- Validación de datos con **express-validator**
- Middleware de autenticación para rutas protegidas
- Soft delete para preservar datos históricos

## 🛠️ Scripts Disponibles

- `npm run dev` - Ejecuta en modo desarrollo con hot-reload
- `npm run build` - Compila TypeScript a JavaScript
- `npm start` - Ejecuta la versión compilada en producción

## 📄 Licencia

Ver archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

Nelson Avila

