# 📖 Clase 19: Integración JS + MongoDB

## 🎯 Objetivos de la Clase

- Comprender cómo migrar un proyecto backend de MySQL a MongoDB manteniendo la misma funcionalidad
- Configurar la conexión a MongoDB usando Mongoose en un proyecto Express con TypeScript
- Implementar modelos de datos con Mongoose que repliquen la estructura relacional de MySQL
- Migrar el sistema de autenticación y autorización con JWT de MySQL a MongoDB
- Crear un nuevo proyecto backend-stock-mongo replicando todas las funcionalidades del proyecto original
- Aplicar los conceptos aprendidos de MongoDB y Mongoose en un proyecto real paso a paso

---

## 📚 ¿Qué es la Integración JS + MongoDB?

### 🔍 Definición

**Integración JS + MongoDB** es el proceso de conectar una aplicación backend desarrollada en Node.js/Express con MongoDB como base de datos, utilizando Mongoose como ODM (Object Document Mapper) para gestionar los esquemas, modelos y operaciones de base de datos de manera similar a como se hace con bases de datos relacionales.

### 🏗️ Características Principales

- **ODM (Object Document Mapper):** Mongoose permite trabajar con MongoDB de forma similar a un ORM, facilitando la migración desde bases de datos relacionales
- **Esquemas flexibles:** MongoDB permite estructuras de datos más flexibles que las bases de datos relacionales
- **Misma lógica de negocio:** La lógica de autenticación, autorización y servicios se mantiene igual, solo cambia la capa de acceso a datos
- **TypeScript compatible:** Mongoose funciona perfectamente con TypeScript, manteniendo el tipado fuerte

### 📖 Historia Breve

- **2009:** MongoDB se lanza como base de datos NoSQL orientada a documentos
- **2010:** Mongoose se crea como ODM para Node.js, facilitando el trabajo con MongoDB
- **2015:** TypeScript gana popularidad, y Mongoose añade soporte completo para tipos
- **2020:** MongoDB se convierte en una de las bases de datos NoSQL más populares para aplicaciones Node.js
- **2024:** La integración de MongoDB con TypeScript y Express es estándar en el desarrollo backend moderno

---

## 🏛️ Conceptos Fundamentales de Migración

### 📝 Diferencias entre MySQL y MongoDB

| Aspecto        | MySQL (Relacional)          | MongoDB (NoSQL)                    |
| -------------- | --------------------------- | ---------------------------------- |
| **Estructura** | Tablas con filas y columnas | Colecciones con documentos         |
| **Relaciones** | Claves foráneas y JOINs     | Referencias o documentos embebidos |
| **Esquema**    | Fijo y rígido               | Flexible y dinámico                |
| **Consultas**  | SQL                         | Query API de MongoDB               |
| **ID**         | AUTO_INCREMENT              | ObjectId único                     |

### 📝 ¿Qué es Mongoose?

**Mongoose** es una biblioteca de Node.js que proporciona una solución basada en esquemas para modelar los datos de tu aplicación. Incluye validación incorporada, construcción de consultas, lógica de negocio y más.

```typescript
import mongoose from 'mongoose';

// Definir un esquema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Crear un modelo
const User = mongoose.model('User', userSchema);
```

### 📝 Estructura de un Proyecto con MongoDB

En lugar de tener tablas relacionadas, MongoDB usa **colecciones** y **documentos**. Los documentos pueden contener referencias a otros documentos o tener documentos embebidos.

**Ejemplo de estructura relacional (MySQL):**

```sql
-- Tabla users
users (id, username, email, password)

-- Tabla roles
roles (id, name)

-- Tabla user_roles (relación muchos a muchos)
user_roles (user_id, role_id)
```

**Ejemplo equivalente en MongoDB:**

```typescript
// Opción 1: Roles embebidos en el usuario
{
  _id: ObjectId("..."),
  username: "juan",
  email: "juan@example.com",
  password: "$2b$10$...",
  roles: ["user", "admin"]  // Array de roles
}

// Opción 2: Referencias a colección de roles
{
  _id: ObjectId("..."),
  username: "juan",
  email: "juan@example.com",
  password: "$2b$10$...",
  roleIds: [ObjectId("..."), ObjectId("...")]
}
```

---

## 🏗️ Configuración del Proyecto

### 📦 Instalación de Dependencias

Primero, creamos un nuevo proyecto llamado `backend-stock-mongo`:

```bash
# Crear directorio del proyecto
mkdir backend-stock-mongo
cd backend-stock-mongo

# Inicializar proyecto Node.js
npm init -y

# Instalar dependencias principales
npm install express mongoose bcrypt jsonwebtoken express-validator dotenv

# Instalar dependencias de desarrollo
npm install -D typescript ts-node-dev @types/express @types/node @types/bcrypt @types/jsonwebtoken
```

### 📄 Configuración de TypeScript

Crea el archivo `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "typeRoots": ["./src/types", "./node_modules/@types"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 📄 Variables de Entorno

Crea el archivo `.env`:

```env
# Puerto del servidor
PORT=3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/stock_db

# JWT
JWT_SECRET=mi-secreto-super-seguro-para-jwt
JWT_EXPIRES_IN=1d
```

---

## 🗃️ Configuración de MongoDB

### 📝 Conexión a MongoDB con Mongoose

Crea el archivo `src/config/database.ts`:

```typescript
import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/stock_db';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB conectado exitosamente');
  } catch (error) {
    console.error('❌ Error al conectar MongoDB:', error);
    process.exit(1);
  }
};

// Manejar eventos de conexión
mongoose.connection.on('error', (err) => {
  console.error('❌ Error de MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB desconectado');
});
```

### 📝 Modelo de Usuario con Mongoose

Crea el archivo `src/models/user.model.ts`:

```typescript
import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '../types/auth';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true, // Crea automáticamente createdAt y updatedAt
  }
);

// Índices para mejorar búsquedas
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

export const User = mongoose.model<IUser>('User', userSchema);
```

### 📝 Funciones del Modelo (equivalente a users.model.ts de MySQL)

Actualiza `src/models/user.model.ts` para incluir las funciones de búsqueda:

```typescript
import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '../types/auth';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: 'user',
    } as any,
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

export const User = mongoose.model<IUser>('User', userSchema);

// Funciones del modelo (equivalente a MySQL)
export interface UserData {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export const findUser = async (
  email: string = '',
  username: string = ''
): Promise<UserData | null> => {
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) return null;

  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    password: user.password,
    role: user.role as UserRole,
  };
};

export const createUser = async (
  user: Omit<UserData, 'id' | 'role'>
): Promise<string> => {
  const newUser = new User({
    username: user.username,
    email: user.email,
    password: user.password,
    role: 'user', // Rol por defecto
  });

  const savedUser = await newUser.save();
  return savedUser._id.toString();
};
```

---

## 🔧 Servicios de Autenticación

### 📄 `src/services/auth.service.ts`

El servicio de autenticación se mantiene prácticamente igual, solo cambia el import del modelo:

```typescript
import bcrypt from 'bcrypt';
import * as userModel from '../models/user.model';
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
): Promise<string> => {
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

  const payload: JwtPayload = {
    id: user.id,
    username: user.username,
    role: user.role as UserRole,
  };

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || '1h',
    issuer: 'curso-utn-backend',
  };

  return jwt.sign(payload, secretKey, options);
};
```

### 📄 `src/types/auth.ts`

```typescript
export interface JwtPayload {
  id: string; // Cambia de number a string (ObjectId de MongoDB)
  username: string;
  role: UserRole;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
```

### 📄 `src/types/express.d.ts`

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

---

## 🛡️ Middlewares de Autenticación

### 📄 `src/middlewares/auth.middleware.ts`

Los middlewares se mantienen exactamente igual:

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

---

## 🎮 Controladores y Rutas

### 📄 `src/controllers/auth.controller.ts`

Los controladores también se mantienen igual, solo cambia el manejo de errores:

```typescript
import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { validationResult } from 'express-validator';

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    await authService.register(username, email, password);

    return res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error: any) {
    // MongoDB devuelve error code 11000 para duplicados
    if (error.code === 11000) {
      return res.status(409).json({ error: 'El usuario o email ya existe' });
    }
    return res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const token = await authService.login(email, password);

    return res.json({ token });
  } catch (error: any) {
    if (error.message === 'Credenciales inválidas') {
      return res.status(401).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
```

### 📄 `src/validators/auth.validator.ts`

Los validadores se mantienen igual:

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

### 📄 `src/routes/auth.routes.ts`

```typescript
import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import {
  registerValidator,
  loginValidator,
} from '../validators/auth.validator';

const router = Router();

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);

export default router;
```

---

## 🚀 Archivo Principal (index.ts)

### 📄 `src/index.ts`

```typescript
import express, { Request, Response } from 'express';
import path from 'path';
import 'dotenv/config';

import { connectDB } from './config/database';
import authRoutes from './routes/auth.routes';
import { authenticate, authorize } from './middlewares/auth.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '..', 'public')));

// Rutas de autenticación
app.use('/auth', authRoutes);

// Ruta pública
app.get('/public', (req: Request, res: Response) => {
  res.json({
    message: 'Cualquiera puede entrar!',
  });
});

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

app.get('/api/saludo', (req: Request, res: Response) => {
  res.json({ mensaje: 'Hola desde la API 🚀' });
});

// Iniciar el servidor HTTP
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
});
```

---

## 🚀 Ejercicio Práctico

### 📝 Crear el Proyecto backend-stock-mongo Paso a Paso

Vamos a crear el proyecto completo desde cero:

**Paso 1: Crear la estructura del proyecto**

```bash
mkdir backend-stock-mongo
cd backend-stock-mongo
npm init -y
```

**Paso 2: Instalar dependencias**

```bash
npm install express mongoose bcrypt jsonwebtoken express-validator dotenv
npm install -D typescript ts-node-dev @types/express @types/node @types/bcrypt @types/jsonwebtoken
```

**Paso 3: Crear estructura de carpetas**

```bash
mkdir -p src/{config,models,services,controllers,routes,middlewares,validators,types}
mkdir public
```

**Paso 4: Configurar TypeScript**

Crea `tsconfig.json` con la configuración mostrada anteriormente.

**Paso 5: Crear archivo .env**

Crea `.env` con las variables de entorno necesarias.

**Paso 6: Crear archivos en orden**

1. `src/types/auth.ts` - Tipos de autenticación
2. `src/types/express.d.ts` - Extensión de tipos de Express
3. `src/config/database.ts` - Conexión a MongoDB
4. `src/models/user.model.ts` - Modelo de usuario
5. `src/services/auth.service.ts` - Servicio de autenticación
6. `src/validators/auth.validator.ts` - Validadores
7. `src/middlewares/auth.middleware.ts` - Middlewares
8. `src/controllers/auth.controller.ts` - Controladores
9. `src/routes/auth.routes.ts` - Rutas
10. `src/index.ts` - Archivo principal

**Paso 7: Iniciar MongoDB**

Asegúrate de tener MongoDB corriendo (local o con Docker):

```bash
# Con Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# O si tienes MongoDB instalado localmente
mongod
```

**Paso 8: Ejecutar el proyecto**

```bash
npm run dev
```

**Paso 9: Probar los endpoints**

```bash
# Registrar un usuario
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Password123!"
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

---

## 🔄 Comparación: MySQL vs MongoDB

### 📊 Tabla Comparativa de Operaciones

| Operación          | MySQL (backend-stock)                 | MongoDB (backend-stock-mongo)      |
| ------------------ | ------------------------------------- | ---------------------------------- |
| **Conexión**       | `mysql.createPool()`                  | `mongoose.connect()`               |
| **Crear usuario**  | `INSERT INTO users`                   | `new User().save()`                |
| **Buscar usuario** | `SELECT * FROM users WHERE email = ?` | `User.findOne({ email })`          |
| **ID**             | `AUTO_INCREMENT` (número)             | `ObjectId` (string)                |
| **Relaciones**     | JOINs con tablas                      | Referencias o documentos embebidos |
| **Validación**     | Constraints SQL                       | Esquemas Mongoose                  |

### 📝 Diferencias Clave en el Código

**MySQL:**

```typescript
const [rows] = await pool.query(
  'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
  [username, email, password]
);
const userId = (rows as any).insertId;
```

**MongoDB:**

```typescript
const newUser = new User({ username, email, password });
const savedUser = await newUser.save();
const userId = savedUser._id.toString();
```

---

## 🏠 Tarea para la Próxima Clase

### ✅ Ejercicio: Migración Completa a MongoDB

Crea un proyecto nuevo llamado `backend-stock-mongo` que replique todas las funcionalidades del proyecto `backend-stock` pero usando MongoDB en lugar de MySQL. El proyecto debe incluir:

1. **Configuración de MongoDB** - Configurar la conexión a MongoDB usando Mongoose con manejo de errores
2. **Modelo de Usuario** - Crear el modelo de usuario con Mongoose que incluya validaciones y esquema completo
3. **Sistema de Autenticación** - Implementar registro y login de usuarios con JWT
4. **Sistema de Autorización** - Implementar middlewares de autenticación y autorización por roles
5. **Validación de Datos** - Implementar validaciones usando express-validator para email, contraseña y username
6. **Manejo de Errores** - Manejar errores específicos de MongoDB (duplicados, validación, etc.)
7. **Rutas Protegidas** - Crear al menos 3 rutas protegidas que demuestren el uso de los middlewares

**Requisitos técnicos:**

- Usar TypeScript con tipado estricto
- Usar Mongoose para todas las operaciones de base de datos
- Mantener la misma estructura de carpetas (MVC)
- Encriptar contraseñas con bcrypt (salt rounds: 10)
- Generar JWT con expiración de 1 día
- Validar que las contraseñas tengan al menos 8 caracteres, una mayúscula, un número y un carácter especial
- Usar variables de entorno para `MONGODB_URI`, `JWT_SECRET` y `JWT_EXPIRES_IN`
- Documentar los endpoints con ejemplos de uso (CURL o Postman)
- Incluir un archivo README.md con instrucciones de instalación y uso

**Entregables:**

- Código completo del proyecto en un repositorio
- README.md con instrucciones
- Ejemplos de uso de los endpoints
- Comparación breve entre la implementación MySQL y MongoDB

---

## 📚 Recursos Adicionales

### 🔗 Enlaces Útiles

- [Mongoose Documentation](https://mongoosejs.com/docs/) - Documentación oficial de Mongoose
- [MongoDB University](https://university.mongodb.com/) - Cursos gratuitos de MongoDB
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - MongoDB en la nube (gratis)
- [Mongoose TypeScript Guide](https://mongoosejs.com/docs/typescript.html) - Guía para usar Mongoose con TypeScript

### 📖 Conceptos para Investigar

- **MongoDB Aggregation Pipeline** - Consultas complejas y transformaciones de datos en MongoDB
- **MongoDB Indexes** - Optimización de consultas mediante índices
- **Mongoose Virtuals** - Campos calculados que no se almacenan en la base de datos
- **Mongoose Middleware** - Hooks (pre/post) para ejecutar lógica antes o después de operaciones

---

## ❓ Preguntas Frecuentes

### ¿Por qué migrar de MySQL a MongoDB?

- **Flexibilidad de esquema:** MongoDB permite estructuras de datos más flexibles que se adaptan mejor a ciertos casos de uso
- **Escalabilidad horizontal:** MongoDB está diseñado para escalar horizontalmente de manera más sencilla
- **Desarrollo rápido:** Los esquemas flexibles permiten iterar más rápido durante el desarrollo
- **Documentos JSON nativos:** Los documentos se almacenan en formato BSON (similar a JSON), lo que facilita el trabajo con JavaScript/TypeScript

### ¿Cómo se manejan las relaciones en MongoDB?

MongoDB ofrece dos enfoques principales:

- **Referencias:** Similar a claves foráneas, almacenando ObjectIds que referencian otros documentos
- **Documentos embebidos:** Almacenar documentos completos dentro de otros documentos

Para nuestro caso (usuarios y roles), usamos un array de roles embebido en el documento de usuario, que es más simple y eficiente para este caso de uso.

### ¿Qué pasa con las transacciones en MongoDB?

MongoDB soporta transacciones desde la versión 4.0, permitiendo operaciones ACID en múltiples documentos. Sin embargo, para la mayoría de casos de uso simples (como nuestro sistema de autenticación), no son necesarias.

### ¿Cómo se migran los datos existentes de MySQL a MongoDB?

Existen varias herramientas y estrategias:

- **Scripts de migración:** Crear scripts Node.js que lean de MySQL y escriban en MongoDB
- **Herramientas ETL:** Usar herramientas como Talend, Pentaho, o scripts personalizados
- **Export/Import:** Exportar datos de MySQL a JSON/CSV e importarlos a MongoDB

Para proyectos pequeños, un script Node.js personalizado suele ser la mejor opción.

### ¿Cuándo usar MySQL vs MongoDB?

**Usa MySQL cuando:**

- Necesitas transacciones complejas y ACID estricto
- Tienes datos altamente estructurados y relaciones complejas
- Tu equipo tiene más experiencia con SQL
- Necesitas consultas complejas con múltiples JOINs

**Usa MongoDB cuando:**

- Necesitas flexibilidad en el esquema
- Trabajas principalmente con documentos JSON
- Necesitas escalar horizontalmente
- Tu aplicación es principalmente en JavaScript/TypeScript

---

## 🎉 ¡Integración JS + MongoDB Dominado!

¡Excelente trabajo! Ya conoces cómo migrar un proyecto backend de MySQL a MongoDB, cómo configurar Mongoose, crear modelos de datos, y mantener la misma funcionalidad de autenticación y autorización con JWT. En la próxima clase veremos cómo desplegar aplicaciones y trabajar con dominios y hosting.

**Recuerda:** La migración entre bases de datos requiere entender bien las diferencias y similitudes entre ambos sistemas. MongoDB ofrece flexibilidad, pero MySQL ofrece estructura. Elige la herramienta adecuada según las necesidades de tu proyecto. ¡Sigue practicando y construyendo aplicaciones robustas! 🚀

---

_📧 **Contacto:** Si tienes dudas sobre la integración de JavaScript con MongoDB, no dudes en consultar durante la clase o por los canales de comunicación establecidos._
