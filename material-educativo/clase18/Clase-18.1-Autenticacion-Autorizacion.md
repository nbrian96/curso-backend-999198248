# 📖 Clase 18.1: Autenticación y Autorización

## 🎯 Objetivos de la Clase

- Comprender la diferencia entre **autenticación** y **autorización** en aplicaciones web
- Implementar autenticación basada en **JWT (JSON Web Token)** en un backend con Express y TypeScript
- Encriptar contraseñas de forma segura usando **bcrypt** para proteger datos sensibles
- Validar datos de entrada usando **express-validator** y **DTOs** para garantizar la integridad de los datos
- Proteger rutas del backend mediante middlewares de autenticación y autorización

---

## 📚 ¿Qué es Autenticación y Autorización?

### 🔍 Definición

**Autenticación y Autorización** son dos conceptos fundamentales de seguridad en aplicaciones web que trabajan juntos para proteger los recursos y datos de un sistema.

- **Autenticación:** Es el proceso de verificar **quién eres** (identidad del usuario). Se realiza típicamente mediante login con credenciales (email/username y contraseña).

- **Autorización:** Es el proceso de verificar **qué puedes hacer** (permisos y roles). Determina si un usuario autenticado tiene los permisos necesarios para acceder a un recurso específico.

### 🏗️ Características Principales

- **Separación de responsabilidades:** La autenticación verifica la identidad, mientras que la autorización verifica los permisos
- **Tokens seguros:** Uso de JWT para mantener sesiones sin necesidad de almacenar estado en el servidor
- **Encriptación de contraseñas:** Las contraseñas nunca se almacenan en texto plano, siempre se encriptan usando algoritmos como bcrypt
- **Validación de datos:** Validación exhaustiva de datos de entrada para prevenir ataques y errores
- **Protección de rutas:** Middlewares que interceptan peticiones para verificar autenticación y autorización antes de procesar la solicitud

### 📖 Historia Breve

- **1994:** Se introduce el concepto de cookies HTTP para mantener sesiones
- **2005:** OAuth 1.0 se publica como estándar para autorización
- **2010:** JWT (JSON Web Token) se propone como RFC 7519, revolucionando la autenticación stateless
- **2012:** OAuth 2.0 se estandariza, convirtiéndose en el protocolo más usado para autorización
- **2015:** bcrypt se populariza como estándar de facto para hash de contraseñas en Node.js
- **2020:** JWT se convierte en el estándar más utilizado para autenticación en APIs REST modernas

---

## 🏛️ Conceptos Fundamentales de Seguridad

### 📝 Autenticación vs Autorización

| Concepto      | Descripción                                     |
| ------------- | ----------------------------------------------- |
| Autenticación | Verifica **quién sos** (login)                  |
| Autorización  | Verifica **qué podés hacer** (permisos / roles) |

**Ejemplo práctico:**

- Login correcto → usuario **autenticado** ✅
- Acceder a `/admin` → requiere estar **autorizado** con rol `ADMIN` ✅

### 📝 ¿Qué es JWT (JSON Web Token)?

**JWT** es un estándar abierto (RFC 7519) para transmitir información de manera segura entre dos partes como un objeto JSON. Se usa comúnmente para autenticación en aplicaciones web y APIs.

Un JWT contiene tres partes separadas por puntos (`.`):

- **Header** → tipo de token y algoritmo de encriptación
- **Payload** → datos del usuario (id, email, rol, etc.)
- **Signature** → firma que garantiza que el token no fue modificado

```typescript
// Ejemplo de estructura JWT
header.payload.signature

// Header (codificado en Base64)
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload (codificado en Base64)
{
  "id": 1,
  "role": "user",
  "iat": 1234567890,
  "exp": 1234571490
}
```

🧾 **¿Para qué sirve en nuestro caso?**

Permite que, tras hacer login, el servidor genere un token con los datos del usuario. Este token se envía con cada petición en el header `Authorization` para verificar que el usuario está autenticado, sin necesidad de mantener sesiones en el servidor.

### 📝 ¿Qué es bcrypt?

**bcrypt** es una biblioteca de hash de contraseñas diseñada por Niels Provos y David Mazières. Es ampliamente utilizada para encriptar contraseñas de forma segura.

```typescript
import bcrypt from 'bcrypt';

// Encriptar contraseña
const hashedPassword = await bcrypt.hash('miContraseña123', 10);

// Verificar contraseña
const isValid = await bcrypt.compare('miContraseña123', hashedPassword);
```

✅ **Ventajas de usar bcrypt:**

- Las contraseñas nunca se guardan en texto plano
- Si alguien accede a la base de datos, no puede ver las contraseñas reales
- El hash es irreversible (no se puede obtener la contraseña original)
- Incluye un "salt" automático para mayor seguridad

### 📝 ¿Por qué encriptar contraseñas?

Nunca debemos guardar contraseñas planas en la base de datos. Usamos **bcrypt** para generar hashes seguros que no se pueden revertir.

**Ejemplo de lo que NO hacer:**

```typescript
// ❌ MAL - Nunca hacer esto
const user = {
  email: 'usuario@example.com',
  password: 'contraseña123', // Contraseña en texto plano
};
```

**Ejemplo correcto:**

```typescript
// ✅ BIEN - Siempre encriptar
const hashedPassword = await bcrypt.hash('contraseña123', 10);
const user = {
  email: 'usuario@example.com',
  password: hashedPassword, // Hash encriptado
};
```

---

## 🏗️ Sistema de Autenticación Completo

### 📘 ¿Cómo funciona el sistema final? (paso a paso)

1️⃣ **🧑 Un usuario se registra**
→ ✍️ Su contraseña se encripta con bcrypt y se guarda en la base de datos junto con el **rol** (por defecto: `USER`).

2️⃣ **🧑 Un usuario hace login**
→ Si la contraseña coincide con la encriptada, se genera un 🔐 **JWT** con su `id` y `rol`. Este token se envía al cliente.

3️⃣ **✅ En las siguientes peticiones**
→ El cliente envía el **TOKEN** en los headers (`Authorization: Bearer <token>`). El servidor lo verifica en cada ruta protegida.

4️⃣ **🛡️ Autorización por rol**
→ Algunas rutas requieren tener el rol `ADMIN` y serán restringidas para usuarios comunes (`USER`).

---

## 🧱 Estructura de Archivos

Creamos la siguiente estructura para organizar nuestro sistema de autenticación:

```bash
# Auth
touch src/models/users.model.ts
touch src/services/auth.service.ts
touch src/controllers/auth.controller.ts
touch src/routes/auth.routes.ts

# Seguridad
mkdir src/middlewares
mkdir src/validators

touch src/middlewares/auth.middleware.ts
touch src/validators/auth.validator.ts
touch src/types/auth.ts
touch src/types/express.d.ts
```

---

## 📦 Instalación de Dependencias

Instalamos las dependencias necesarias para implementar autenticación:

```bash
npm install jsonwebtoken bcrypt express-validator express-rate-limit
```

```bash
npm install -D @types/jsonwebtoken @types/bcrypt
```

---

## 🔧 Variables de entorno necesarias

Agrega a tu archivo `.env`:

```env
JWT_SECRET=mi-secreto-super-seguro
JWT_EXPIRES_IN=1d
```

### ⏳ Ejemplos de expiración de tokens con expiresIn

El campo `expiresIn` puede aceptar valores en **segundos** o con **sufijos de tiempo**:

| Tiempo                         | Valor `expiresIn`                    |
| ------------------------------ | ------------------------------------ |
| 30 segundos                    | `'30s'`                              |
| 10 minutos                     | `'10m'`                              |
| 1 hora                         | `'1h'`                               |
| 12 horas                       | `'12h'`                              |
| 1 día (recomendado para login) | `'1d'`                               |
| 7 días                         | `'7d'`                               |
| 1 mes aprox.                   | `'30d'`                              |
| Permanente (NO recomendado)    | sin `expiresIn` o con valor muy alto |

> 📌 **Recomendación:** Usa `'1h'` o `'1d'` para sesiones de usuarios comunes. Si es una API pública o sensible, lo ideal es corto (`'15m'` a `'1h'`) con refresh tokens.

---

## 🗃️ Estructura SQL inicial

Creamos las tablas necesarias para el sistema de autenticación:

```sql
-- Crear tabla de roles primero
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Insertar roles básicos si no existen
INSERT IGNORE INTO roles (name) VALUES ('admin'), ('user');

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de user x roles
CREATE TABLE IF NOT EXISTS user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Trigger para asignar role user por defecto
DELIMITER $$

CREATE TRIGGER assign_user_role
AFTER INSERT ON users
FOR EACH ROW
BEGIN
  DECLARE userRoleId INT;

  -- Buscar ID del rol 'user'
  SELECT id INTO userRoleId FROM roles WHERE name = 'user' LIMIT 1;

  -- Si lo encontró, insertamos
  IF userRoleId IS NOT NULL THEN
    INSERT INTO user_roles (user_id, role_id) VALUES (NEW.id, userRoleId);
  END IF;
END$$

DELIMITER ;
```

📌 **Explicación rápida:**

- `username`, `email`: deben ser únicos.
- `password`: se guarda encriptada (hash de bcrypt).
- `role`: se obtiene de la relación con la tabla `roles`.
- `created_at`: para saber cuándo se registró el usuario.
- `updated_at`: para saber cuándo se actualizó el usuario.

---

## 🧩 Modelo de Usuario

### 📄 `src/models/users.model.ts`

```typescript
import pool from '../database/mysql';
import { RowDataPacket } from 'mysql2';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export type UserRow = User & RowDataPacket;

export const findUser = async (
  email: string = '',
  username: string = ''
): Promise<User | null> => {
  const [rows] = await pool.query<UserRow[]>(
    'SELECT u.*, r.name as role FROM users u LEFT JOIN user_roles ur ON u.id = ur.user_id LEFT JOIN roles r ON ur.role_id = r.id WHERE u.email = ? OR u.username = ? LIMIT 1',
    [email, username]
  );

  return rows.length ? rows[0] : null;
};

export const createUser = async (
  user: Omit<User, 'id' | 'role'>
): Promise<number> => {
  const [userResult] = await pool.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [user.username, user.email, user.password]
  );

  console.log('User result:', userResult);

  return (userResult as any).insertId;
};
```

---

## 🧠 Auth Service

### 📄 `src/services/auth.service.ts`

```typescript
import bcrypt from 'bcrypt';
import * as userModel from '../models/users.model';
import jwt, { SignOptions } from 'jsonwebtoken';
import { JwtPayload, UserRole } from '../types/auth';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET no definido');
}

const secretKey: string = process.env.JWT_SECRET;

export const register = async (
  username: string,
  email: string,
  password: string
): Promise<number> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await userModel.createUser({
    username,
    email,
    password: hashedPassword,
  });

  return userId;
};

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  const invalidCredentialsError = new Error('Credenciales inválidas');

  const user = await userModel.findUser(email);
  if (!user) throw invalidCredentialsError;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw invalidCredentialsError;

  /**
   * Payload del token JWT
   * Contiene la información básica del usuario
   */
  const payload: JwtPayload = {
    id: user.id,
    role: user.role as UserRole,
  };

  /**
   * Configuración del token JWT
   * expiresIn: tiempo de expiración
   * issuer: emisor del token
   */
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || '1h',
    issuer: 'curso-utn-backend',
  };

  /**
   * Generación del token JWT
   * Se firma el payload con el secreto y las opciones definidas
   */
  return jwt.sign(payload, secretKey, options);
};
```

### 📄 `src/types/auth.ts`

```typescript
// src/types/auth.ts
export interface JwtPayload {
  id: number;
  role: UserRole;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
```

---

## 🎮 Controller de Autenticación

### 📄 `src/controllers/auth.controller.ts`

```typescript
import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { validationResult } from 'express-validator';

export const register = async (req: Request, res: Response) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    await authService.register(username, email, password);

    return res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'El usuario o email ya existe' });
    }
    return res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const token = await authService.login(email, password);

    return res.json({ token });
  } catch (error: any) {
    if (error.message === 'Credenciales inválidas') {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
```

---

## 🛡️ Middleware de autenticación y autorización

### ¿Qué es un middleware?

🧩 Un middleware en Express es una función que se ejecuta antes de que una ruta final responda al cliente. Puede hacer tareas como:

- Verificar que haya un token válido (autenticación)
- Verificar que el usuario tenga un rol permitido (autorización)
- Validar datos del cuerpo de la petición
- Registrar logs de uso
- Manipular la respuesta o continuar hacia el siguiente middleware

🧠 Se ejecutan en orden y tienen acceso a `req`, `res` y una función `next()` que los conecta en cadena. Si un middleware no llama a `next()`, la ejecución se detiene ahí.

### 📄 `src/middlewares/auth.middleware.ts`

```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/auth';

const JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * Middleware de autenticación
 *
 * Verifica que el token sea válido y lo almacena en req.user
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token or expired' });
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

/**
 * Middleware de autorización
 *
 * Verifica que el usuario tenga uno de los roles permitidos
 */
export const authorize = (roles: Array<'user' | 'admin'>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
  };
};
```

### 📄 `src/types/express.d.ts`

TypeScript no puede agregar al `request` el tipo de dato que necesitamos para el usuario autenticado. Para solucionarlo, debemos extender el tipo `Request` de Express:

```typescript
import { JwtPayload } from './auth';
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
```

Esto nos permite que TypeScript reconozca que el objeto `req` tiene una propiedad `user` de tipo `JwtPayload`, lo que evita errores de tipado.

### Actualizar `tsconfig.json`

Cambiamos el archivo de configuración de TypeScript para que reconozca los tipos personalizados:

```json
{
  "compilerOptions": {
    // ... otras opciones
    "typeRoots": ["./src/types", "./node_modules/@types"]
  }
}
```

---

## 🧪 Validación con express-validator + DTOs

### 📄 `src/validators/auth.validator.ts`

```typescript
import { body } from 'express-validator';
import { ValidationChain } from 'express-validator';

export const validatePassword: ValidationChain[] = [
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe contener al menos un número')
    .matches(/[A-Z]/)
    .withMessage('La contraseña debe contener al menos una mayúscula')
    .matches(/[^A-Za-z0-9]/)
    .withMessage('La contraseña debe contener al menos un carácter especial'),
];

export const validateEmail: ValidationChain[] = [
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),
];

export const registerValidator: ValidationChain[] = [
  ...validateEmail,
  ...validatePassword,
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      'Username solo puede contener letras, números y guiones bajos'
    ),
];

export const loginValidator: ValidationChain[] = [
  ...validateEmail,
  body('password').notEmpty().withMessage('La contraseña es requerida'),
];
```

---

## 🧭 Routing de Autenticación

### 📄 `src/routes/auth.routes.ts`

```typescript
import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import {
  registerValidator,
  loginValidator,
} from '../validators/auth.validator';
import rateLimit from 'express-rate-limit';

const router = Router();

// Limitar intentos de registro y login
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 intentos
  message: 'Demasiados intentos, inténtalo de nuevo más tarde',
});

router.post('/register', authLimiter, registerValidator, register);
router.post('/login', authLimiter, loginValidator, login);

export default router;
```

### Agregar el router al `src/index.ts`

```typescript
import express from 'express';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);

// ... resto de la configuración
```

---

## 🔗 Uso del Middleware

### 📄 Ejemplo de uso en `src/index.ts`

```typescript
import { authenticate, authorize } from './middlewares/auth.middleware';

// Ruta protegida (requiere autenticación)
app.get('/protected', authenticate, (req, res) => {
  res.json({
    message: 'Acceso permitido',
    user: req.user,
  });
});

// Ruta de administrador (requiere autenticación y rol admin)
app.get('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.json({
    message: 'Acceso de administrador permitido',
    user: req.user,
  });
});
```

---

## 🚀 Ejercicio Práctico

### 📝 Implementar Sistema de Autenticación Completo

Vamos a implementar un sistema de autenticación completo paso a paso:

**Paso 1: Configurar la base de datos**

Ejecuta el script SQL proporcionado anteriormente para crear las tablas necesarias.

**Paso 2: Crear los archivos de tipos**

Crea `src/types/auth.ts` y `src/types/express.d.ts` con el código mostrado anteriormente.

**Paso 3: Crear el modelo de usuario**

Crea `src/models/users.model.ts` con las funciones para buscar y crear usuarios.

**Paso 4: Crear el servicio de autenticación**

Crea `src/services/auth.service.ts` con las funciones `register` y `login`.

**Paso 5: Crear el controlador**

Crea `src/controllers/auth.controller.ts` con los controladores de registro e inicio de sesión.

**Paso 6: Crear validadores**

Crea `src/validators/auth.validator.ts` con las validaciones necesarias.

**Paso 7: Crear middlewares**

Crea `src/middlewares/auth.middleware.ts` con los middlewares de autenticación y autorización.

**Paso 8: Crear rutas**

Crea `src/routes/auth.routes.ts` y agrégalo a tu aplicación principal.

**Paso 9: Probar el sistema**

Usa los siguientes comandos CURL para probar el sistema:

```bash
# Registrar un usuario
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!",
    "username": "testuser"
  }'

# Iniciar sesión
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!"
  }'

# Acceder a ruta protegida (reemplaza <token> con el token recibido)
curl -X GET http://localhost:3000/protected \
  -H "Authorization: Bearer <token>"

# Acceder a ruta de admin (reemplaza <token> con el token recibido)
curl -X GET http://localhost:3000/admin \
  -H "Authorization: Bearer <token>"
```

> ⚠️ **Asegúrate de que el servidor esté corriendo antes de ejecutar estos comandos.**

---

## 🏠 Tarea para la Próxima Clase

### ✅ Ejercicio: Sistema de Autenticación y Autorización

Implementa un sistema completo de autenticación y autorización en tu proyecto backend con los siguientes requisitos:

1. **Registro de usuarios** - Crea un endpoint `/auth/register` que permita registrar nuevos usuarios con validación completa de datos
2. **Login de usuarios** - Crea un endpoint `/auth/login` que genere un JWT válido al autenticar correctamente
3. **Protección de rutas** - Protege al menos 3 rutas de tu aplicación usando el middleware `authenticate`
4. **Autorización por roles** - Crea al menos 2 rutas que requieran el rol `admin` usando el middleware `authorize`
5. **Validación de datos** - Implementa validaciones para email, contraseña y username usando `express-validator`
6. **Protección contra fuerza bruta** - Implementa rate limiting en los endpoints de autenticación
7. **Manejo de errores** - Implementa manejo adecuado de errores en todos los endpoints de autenticación

**Requisitos técnicos:**

- Usar TypeScript con tipado estricto
- Encriptar contraseñas con bcrypt (salt rounds: 10)
- Generar JWT con expiración de 1 día
- Validar que las contraseñas tengan al menos 8 caracteres, una mayúscula, un número y un carácter especial
- Usar variables de entorno para `JWT_SECRET` y `JWT_EXPIRES_IN`
- Documentar los endpoints con ejemplos de uso (CURL o Postman)

---

## 📚 Recursos Adicionales

### 🔗 Enlaces Útiles

- [JWT.io](https://jwt.io/) - Herramienta para decodificar y verificar tokens JWT
- [bcrypt Documentation](https://www.npmjs.com/package/bcrypt) - Documentación oficial de bcrypt para Node.js
- [express-validator Guide](https://express-validator.github.io/docs/) - Guía completa de express-validator
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) - Mejores prácticas de seguridad para autenticación

### 📖 Conceptos para Investigar

- **OAuth 2.0** - Protocolo estándar para autorización, usado por Google, Facebook, etc.
- **Refresh Tokens** - Tokens de larga duración para renovar access tokens sin requerir login
- **Session Management** - Gestión de sesiones en aplicaciones web (cookies vs tokens)
- **Password Hashing Algorithms** - Diferentes algoritmos de hash (bcrypt, argon2, scrypt)

---

## ❓ Preguntas Frecuentes

### ¿Cuál es la diferencia entre autenticación y autorización?

- **Autenticación:** Verifica la identidad del usuario (¿quién eres?). Se realiza mediante login con credenciales. Ejemplo: "Soy Juan, mi contraseña es correcta".

- **Autorización:** Verifica los permisos del usuario (¿qué puedes hacer?). Se realiza después de la autenticación. Ejemplo: "Juan tiene rol de admin, puede acceder a esta ruta".

- **En resumen:** Primero te autenticas (verificas quién eres), luego te autorizan (verifican qué puedes hacer).

### ¿Por qué usar JWT en lugar de sesiones tradicionales?

- **Stateless:** No requiere almacenar sesiones en el servidor, lo que facilita el escalado horizontal
- **Portabilidad:** El token puede ser usado en diferentes dominios y servicios
- **Seguridad:** La firma garantiza que el token no ha sido modificado
- **Eficiencia:** No requiere consultas a base de datos para verificar la sesión en cada petición
- **Desventaja:** No se puede revocar un token antes de su expiración (a menos que se use una blacklist)

### ¿Cómo funciona bcrypt para encriptar contraseñas?

- **Hash unidireccional:** bcrypt genera un hash que no se puede revertir a la contraseña original
- **Salt automático:** Cada hash incluye un "salt" único que previene ataques de rainbow tables
- **Cost factor:** El parámetro (10) determina cuántas iteraciones se realizan, aumentando la seguridad pero también el tiempo de procesamiento
- **Comparación segura:** `bcrypt.compare()` compara la contraseña ingresada con el hash almacenado sin necesidad de desencriptar

### ¿Qué pasa si un token JWT expira?

- El token expirado generará un error 403 (Forbidden) cuando se intente usar
- El usuario deberá hacer login nuevamente para obtener un nuevo token
- En aplicaciones más avanzadas, se puede implementar un sistema de refresh tokens que permite obtener un nuevo access token sin requerir login

---

## 🧰 Buenas Prácticas de Seguridad

- ✔️ Nunca guardar contraseñas en texto plano
- ✔️ Usar JWT con expiración adecuada (no demasiado larga)
- ✔️ Validar todos los datos de entrada
- ✔️ Separar lógica de autenticación del dominio de negocio
- ✔️ Proteger contra ataques de fuerza bruta con rate limiting
- ✔️ Usar HTTPS en producción para proteger los tokens en tránsito
- ✔️ Almacenar tokens de forma segura en el cliente (no en localStorage si es posible)
- ✔️ Implementar logout que invalide tokens (usando blacklist si es necesario)

---

## 🎉 ¡Autenticación y Autorización Dominado!

¡Excelente trabajo! Ya conoces los conceptos fundamentales de autenticación y autorización, cómo implementar JWT, encriptar contraseñas con bcrypt, validar datos de entrada y proteger rutas con middlewares. En la próxima clase veremos cómo implementar roles y permisos dinámicos para tener un control más granular sobre los accesos.

**Recuerda:** La seguridad es un aspecto crítico en cualquier aplicación. Siempre valida los datos de entrada, encripta las contraseñas y protege tus rutas. ¡Sigue practicando y construyendo aplicaciones seguras! 🚀

---

_📧 **Contacto:** Si tienes dudas sobre autenticación y autorización, no dudes en consultar durante la clase o por los canales de comunicación establecidos._
