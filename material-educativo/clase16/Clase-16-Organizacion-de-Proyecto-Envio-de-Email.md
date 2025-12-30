# 📖 Clase 16: Organización de Proyecto y Envío de Mail

## 🎯 Objetivos de la Clase

- Comprender el patrón **Model View Controller (MVC)**.
- Organizar el backend aplicando MVC de forma progresiva.
- Entender cómo se conectan **routing, controllers y services**.
- Implementar almacenamiento **en memoria** como primer paso.
- Incorporar **envío de emails** usando Nodemailer, Ethereal y Handlebars.

---

## 📚 ¿Qué es el patrón MVC?

### 🔍 Definición

**MVC (Model View Controller)** es un patrón de arquitectura que separa responsabilidades dentro de una aplicación.

- **Model:** manejo de datos y lógica de negocio
- **View:** representación visual (HTML)
- **Controller:** intermediario entre rutas, datos y vistas

---

### 🏗️ Componentes de MVC

| Componente | Responsabilidad       | Ejemplo en Express   |
| ---------- | --------------------- | -------------------- |
| Model      | Datos y reglas        | array en memoria, DB |
| View       | HTML renderizado      | Handlebars           |
| Controller | Lógica y orquestación | controllers/\*.ts    |

---

## 🧭 Flujo de una request en MVC

1. El cliente hace una request HTTP
2. **Router** recibe la URL
3. El router delega en un **Controller**
4. El controller usa un **Service**
5. El service accede al **Model**
6. El controller responde (JSON o vista)

Este flujo mantiene el código ordenado y escalable.

---

## 📂 Nueva Organización del Proyecto

### 📁 Creación de carpetas y archivos

```bash
mkdir src/controllers
mkdir src/services
mkdir src/models
mkdir src/routes

touch src/controllers/users.controller.ts
touch src/services/users.service.ts
touch src/models/users.model.ts
touch src/routes/users.routes.ts
```

### 🗂️ Esquema de carpetas

```text
src/
├── index.ts
├── routes/
│   └── users.routes.ts
├── controllers/
│   └── users.controller.ts
├── services/
│   └── users.service.ts
├── models/
│   └── users.model.ts
└── views/
    └── (vistas handlebars)
```

---

## 🧩 Model (almacenamiento en memoria)

### 📄 `src/models/users.model.ts`

```ts
// Modelo simple en memoria
export interface User {
  id: number;
  name: string;
  email: string;
}

// Simula una base de datos
export const users: User[] = [];
```

---

## 🧠 Service (lógica de negocio)

### 📄 `src/services/users.service.ts`

```ts
import { users, User } from '../models/users.model';

// Devuelve todos los usuarios
export const getUsers = (): User[] => {
  return users;
};

// Crea un nuevo usuario
export const createUser = (user: User): User => {
  users.push(user);
  return user;
};
```

---

## 🎮 Controller (orquestador)

### 📄 `src/controllers/users.controller.ts`

```ts
import { Request, Response } from 'express';
import * as userService from '../services/users.service';

export const getAllUsers = (req: Request, res: Response) => {
  const data = userService.getUsers();
  res.json(data);
};

export const addUser = (req: Request, res: Response) => {
  const user = userService.createUser(req.body);
  res.status(201).json(user);
};
```

---

## 🧭 Routing

### 📄 `src/routes/users.routes.ts`

```ts
import { Router } from 'express';
import { getAllUsers, addUser } from '../controllers/users.controller';

const router = Router();

router.get('/', getAllUsers);
router.post('/', addUser);

export default router;
```

---

## 🔗 Conexión en `index.ts`

```ts
import usersRouter from './routes/users.routes';

app.use('/api/users', usersRouter);
```

---

## CURL

# Listar todos los users

```bash
curl -X GET "http://localhost:3000/api/users"
```

# Crear un user

```bash
curl -X POST "http://localhost:3000/api/users" \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Perez","email":"juan@example.com"}'
```

> seguro nos va a dar error, ya que no contamos con un `id` y ademas tampoco con el Middleware

```bash
// index.ts
// Middleware para interpretar JSON
app.use(express.json());
```

---

## ✉️ Envío de Emails

### 📝 ¿Qué es Nodemailer?

**[Nodemailer](https://nodemailer.com/)** es un módulo de Node.js que permite enviar correos electrónicos fácilmente.  
**[Ethereal](https://ethereal.email)** es un servicio gratuito que genera cuentas SMTP falsas para pruebas, sin enviar correos reales. Ideal para desarrollo.

---

## 📦 Instalación de dependencias

```bash
npm install nodemailer
```

---

## 📄 Configuración de Email

### 📄 `src/services/mail.service.ts`

```bash
touch src/services/mail.service.ts
```

```ts
import nodemailer from 'nodemailer';
import { engine } from 'express-handlebars';

export const sendWelcomeEmail = async (to: string, name: string) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: 'Backend Demo <no-reply@test.com>',
    to,
    subject: 'Bienvenido',
    html: `<h1>Hola ${name}</h1><p>Bienvenido a la app 🚀</p>`,
  });

  console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
};
```

---

## 🧩 Uso del servicio de mail

El envío de emails se integra **desde el controller**, ya que es quien coordina las acciones luego de una request.

En este caso, cuando se crea un usuario:

1. Se guarda en memoria
2. Se responde al cliente
3. Se envía un email de bienvenida

### 📄 Modificación de `src/controllers/users.controller.ts`

```ts
import { Request, Response } from 'express';
import * as userService from '../services/users.service';
import { sendWelcomeEmail } from '../services/mail.service';

export const getAllUsers = (req: Request, res: Response) => {
  const data = userService.getUsers();
  res.json(data);
};

export const addUser = async (req: Request, res: Response) => {
  const user = userService.createUser(req.body);

  // Enviamos el email de bienvenida
  await sendWelcomeEmail(user.email, user.name);

  res.status(201).json(user);
};
```

### 📝 Explicación

- El controller **no envía mails directamente**, delega en un service
- `sendWelcomeEmail` encapsula toda la lógica de Nodemailer
- El controller solo decide **cuándo** enviar el email

Este enfoque mantiene el código:

- Limpio
- Reutilizable
- Fácil de testear

---

## 🏠 Tarea para la Próxima Clase

### ✅ Ejercicio

1. Crear un nuevo módulo MVC para productos
2. Reutilizar el service de mail
3. Enviar un email al crear un recurso
4. Mantener almacenamiento en memoria

---

## 📚 Recursos Adicionales

- [https://expressjs.com](https://expressjs.com)
- [https://nodemailer.com](https://nodemailer.com)
- [https://ethereal.email](https://ethereal.email)

---

## 🎉 ¡Proyecto Organizado!

Excelente trabajo. Ahora tu backend tiene una arquitectura clara usando MVC y además puede enviar emails. En la próxima clase avanzaremos hacia **persistencia real y validaciones**.

---

_📧 **Contacto:** Ante dudas sobre MVC o envío de emails, consultá durante la clase o por los canales habituales._
