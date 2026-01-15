# 📖 Clase 18.2: Autorización Avanzada - Roles y Permisos Dinámicos

## 🎯 Objetivos de la Clase

- Comprender las limitaciones de la autorización por roles rígidos implementada en la clase anterior
- Implementar un sistema de múltiples roles con accesos compartidos y permisos granulares
- Diseñar un sistema de permisos escalable basado en base de datos
- Autorizar acciones por permisos específicos en lugar de roles hardcodeados
- Preparar el backend para crecer sin necesidad de reescrituras cuando aparezcan nuevos roles o funcionalidades

---

## 📚 ¿Qué es un Sistema de Permisos Dinámicos?

### 🔍 Definición

Un **Sistema de Permisos Dinámicos** es una arquitectura de autorización que separa los roles de los permisos, permitiendo asignar permisos específicos a roles de forma flexible y configurable desde la base de datos, sin necesidad de modificar el código.

A diferencia de la autorización por roles rígidos (como `authorize(['admin'])`), este sistema permite:

- **Permisos granulares:** Cada acción del sistema tiene su propio permiso (ej: `product:edit`, `metrics:view`)
- **Flexibilidad:** Los permisos se pueden asignar o quitar a roles sin cambiar código
- **Escalabilidad:** Agregar nuevos roles o permisos no requiere recompilar la aplicación
- **Mantenibilidad:** Los cambios de permisos se realizan en la base de datos, no en el código

### 🏗️ Características Principales

- **Separación de responsabilidades:** Los roles agrupan usuarios, los permisos definen acciones específicas
- **Relaciones many-to-many:** Un rol puede tener múltiples permisos, y un permiso puede estar en múltiples roles
- **Configuración dinámica:** Los permisos se gestionan desde la base de datos, no desde el código
- **Auditoría:** Facilita el seguimiento de qué permisos tiene cada rol y usuario
- **Escalabilidad:** Permite agregar nuevos roles y permisos sin modificar el código fuente

### 📖 Historia Breve

- **1970s:** Se desarrollan los primeros sistemas de control de acceso basados en roles (RBAC)
- **1990s:** RBAC se estandariza como modelo de seguridad empresarial
- **2000s:** Surgen sistemas de permisos granulares para aplicaciones web complejas
- **2010s:** Se popularizan sistemas híbridos que combinan roles y permisos dinámicos
- **2020s:** Los sistemas de permisos dinámicos se convierten en estándar para aplicaciones empresariales modernas

---

## 🏛️ Evolución desde la Clase 18.1

### 📝 Limitaciones del Sistema Anterior

En la Clase 18.1 implementamos autorización basada en roles rígidos:

```typescript
// ❌ Sistema rígido de la clase anterior
app.get('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Acceso de administrador permitido' });
});
```

**Problemas de este enfoque:**

- No escala cuando aparecen nuevos roles
- No permite permisos compartidos entre roles
- Requiere modificar código para agregar nuevos roles
- No permite permisos granulares (solo todo o nada por rol)

### 📝 ¿Por qué necesitamos permisos dinámicos?

**Caso hipotético:** Necesitamos que:

- 👤 **user** → pueda ver productos (GET)
- 👑 **admin** → pueda hacer todo
- 📊 **analyst** → pueda acceder a métricas y ver productos

Con el sistema anterior, tendríamos que:

1. Modificar el código para agregar el rol `analyst`
2. Crear nuevas rutas específicas para cada combinación
3. Duplicar lógica de autorización

Con permisos dinámicos:

1. Agregamos el rol y permisos en la base de datos
2. Asignamos permisos al rol
3. El middleware verifica automáticamente

---

## 🏗️ Sistema de Permisos Dinámicos

### 💡 Solución Profesional: Permisos Dinámicos en Base de Datos

En lugar de preguntar:

> ¿Qué rol tiene este usuario?

Preguntamos:

> ¿Este usuario tiene permiso para realizar esta acción?

Esto nos da:

- ✅ **Flexibilidad:** Permisos configurables sin código
- ✅ **Escalabilidad:** Fácil agregar nuevos roles y permisos
- ✅ **Mantenibilidad:** Cambios en base de datos, no en código

### 📝 Estructura del Modelo de Datos

El sistema utiliza tres tablas principales:

1. **`roles`** - Define los roles del sistema (admin, user, analyst, etc.)
2. **`permissions`** - Define las acciones permitidas (product:edit, metrics:view, etc.)
3. **`role_permissions`** - Tabla intermedia que relaciona roles con permisos

**Relación entre tablas:**

```text
users ─┬─ user_roles ─┬─ roles ─┬─ role_permissions ─┬─ permissions
       │              │         │                    │
       ▼              ▼         ▼                    ▼
     user_id       role_id   role_id            permission_id
```

---

## 🗃️ Estructura SQL para Permisos Dinámicos

### 📄 Crear Tabla de Permisos

```sql
-- Crear tabla de permisos
CREATE TABLE IF NOT EXISTS permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);
```

**Explicación:**

- `action`: Identificador único del permiso (ej: `product:edit`, `metrics:view`)
- `description`: Descripción opcional del permiso para documentación

### 📄 Crear Tabla de Relación Role-Permissions

```sql
-- Crear tabla de relación entre roles y permisos
CREATE TABLE IF NOT EXISTS role_permissions (
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

**Explicación:**

- Relación many-to-many entre roles y permisos
- Un rol puede tener múltiples permisos
- Un permiso puede estar en múltiples roles

### 📄 Trigger para Asignar Permisos a Admin Automáticamente

```sql
-- Trigger para asignar automáticamente todos los permisos al rol admin
DELIMITER $$

CREATE TRIGGER assign_permission_to_admin
AFTER INSERT ON permissions
FOR EACH ROW
BEGIN
  DECLARE adminRoleId INT;

  -- Buscar ID del rol 'admin'
  SELECT id INTO adminRoleId
  FROM roles
  WHERE name = 'admin'
  LIMIT 1;

  -- Si lo encontró, asignamos el permiso automáticamente
  IF adminRoleId IS NOT NULL THEN
    INSERT IGNORE INTO role_permissions (role_id, permission_id)
    VALUES (adminRoleId, NEW.id);
  END IF;
END$$

DELIMITER ;
```

**Ventaja:** Cada vez que se crea un nuevo permiso, el rol `admin` lo recibe automáticamente.

---

## 🔧 Configuración Inicial del Sistema

### 📄 Insertar Permisos Base

```sql
-- Insertar permisos básicos del sistema
INSERT IGNORE INTO permissions (action, description) VALUES
('product:view', 'Ver productos'),
('product:edit', 'Crear, actualizar o eliminar productos'),
('product:delete', 'Eliminar productos permanentemente'),
('metrics:view', 'Ver métricas del sistema'),
('user:view', 'Ver información de usuarios'),
('user:edit', 'Editar información de usuarios'),
('user:delete', 'Eliminar usuarios');
```

### 📄 Crear Nuevo Rol: Analyst

```sql
-- Crear rol analyst
INSERT IGNORE INTO roles (name) VALUES ('analyst');

-- Asignar permisos al rol analyst
INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'analyst'
  AND p.action IN ('product:view', 'metrics:view');
```

**Resultado:** El rol `analyst` puede ver productos y métricas, pero no puede editarlos.

### 📄 Asignar Permisos a Roles Existentes

```sql
-- Asignar todos los permisos al rol admin (ya se hace automáticamente con el trigger)
-- Pero podemos hacerlo manualmente si es necesario:

INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'admin';

-- Asignar permisos básicos al rol user
INSERT IGNORE INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'user'
  AND p.action IN ('product:view');
```

---

## 🛡️ Middleware de Permisos Dinámicos

### 📄 `src/middlewares/permission.middleware.ts`

```typescript
import { Request, Response, NextFunction } from 'express';
import pool from '../database/mysql';
import { RowDataPacket } from 'mysql2';

/**
 * Middleware de autorización por permisos
 *
 * Verifica que el usuario autenticado tenga el permiso específico
 * para acceder a la ruta protegida
 *
 * @param permission - El permiso requerido (ej: 'product:edit', 'metrics:view')
 * @returns Middleware function
 */
export const authorizePermission = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Verificar que el usuario esté autenticado
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    try {
      // Consultar si el usuario tiene el permiso requerido
      const [rows] = await pool.query<RowDataPacket[]>(
        `
        SELECT p.action
        FROM permissions p
        JOIN role_permissions rp ON rp.permission_id = p.id
        JOIN user_roles ur ON ur.role_id = rp.role_id
        WHERE ur.user_id = ? AND p.action = ?
        LIMIT 1
        `,
        [req.user.id, permission]
      );

      // Si no tiene el permiso, denegar acceso
      if (rows.length === 0) {
        return res.status(403).json({
          error: 'Permiso denegado',
          message: `Se requiere el permiso: ${permission}`,
        });
      }

      // Si tiene el permiso, continuar
      next();
    } catch (error) {
      console.error('Error verificando permisos:', error);
      return res.status(500).json({
        error: 'Error verificando permisos',
        message: 'Error interno del servidor',
      });
    }
  };
};
```

**Explicación del código:**

1. Verifica que el usuario esté autenticado (`req.user` existe)
2. Consulta la base de datos para verificar si el usuario tiene el permiso requerido
3. La consulta une las tablas: `permissions` → `role_permissions` → `user_roles` → `users`
4. Si encuentra el permiso, permite el acceso (`next()`)
5. Si no lo encuentra, devuelve error 403 (Forbidden)

---

## 🧩 Modelo de Permisos (Opcional)

### 📄 `src/models/permissions.model.ts`

```typescript
import pool from '../database/mysql';
import { RowDataPacket } from 'mysql2';

export interface Permission {
  id: number;
  action: string;
  description: string | null;
}

export type PermissionRow = Permission & RowDataPacket;

/**
 * Verificar si un usuario tiene un permiso específico
 */
export const userHasPermission = async (
  userId: number,
  permission: string
): Promise<boolean> => {
  const [rows] = await pool.query<PermissionRow[]>(
    `
    SELECT p.action
    FROM permissions p
    JOIN role_permissions rp ON rp.permission_id = p.id
    JOIN user_roles ur ON ur.role_id = rp.role_id
    WHERE ur.user_id = ? AND p.action = ?
    LIMIT 1
    `,
    [userId, permission]
  );

  return rows.length > 0;
};

/**
 * Obtener todos los permisos de un usuario
 */
export const getUserPermissions = async (
  userId: number
): Promise<Permission[]> => {
  const [rows] = await pool.query<PermissionRow[]>(
    `
    SELECT DISTINCT p.id, p.action, p.description
    FROM permissions p
    JOIN role_permissions rp ON rp.permission_id = p.id
    JOIN user_roles ur ON ur.role_id = rp.role_id
    WHERE ur.user_id = ?
    `,
    [userId]
  );

  return rows;
};
```

**Ventaja:** Centraliza la lógica de verificación de permisos en un modelo reutilizable.

---

## 🧭 Uso del Middleware en Rutas

### 📄 Ejemplo de Uso en `src/routes/products.routes.ts`

```typescript
import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizePermission } from '../middlewares/permission.middleware';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.controller';

const router = Router();

// Ver productos - requiere permiso product:view
router.get(
  '/',
  authenticate,
  authorizePermission('product:view'),
  getProducts
);

// Crear producto - requiere permiso product:edit
router.post(
  '/',
  authenticate,
  authorizePermission('product:edit'),
  createProduct
);

// Actualizar producto - requiere permiso product:edit
router.put(
  '/:id',
  authenticate,
  authorizePermission('product:edit'),
  updateProduct
);

// Eliminar producto - requiere permiso product:delete
router.delete(
  '/:id',
  authenticate,
  authorizePermission('product:delete'),
  deleteProduct
);

export default router;
```

### 📄 Ejemplo de Uso en `src/routes/metrics.routes.ts`

```typescript
import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizePermission } from '../middlewares/permission.middleware';
import { getMetrics } from '../controllers/metrics.controller';

const router = Router();

// Ver métricas - requiere permiso metrics:view
router.get(
  '/',
  authenticate,
  authorizePermission('metrics:view'),
  getMetrics
);

export default router;
```

### 📄 Ejemplo de Uso en `src/routes/users.routes.ts`

```typescript
import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizePermission } from '../middlewares/permission.middleware';
import {
  getUsers,
  updateUser,
  deleteUser,
} from '../controllers/users.controller';

const router = Router();

// Ver usuarios - requiere permiso user:view
router.get(
  '/',
  authenticate,
  authorizePermission('user:view'),
  getUsers
);

// Actualizar usuario - requiere permiso user:edit
router.put(
  '/:id',
  authenticate,
  authorizePermission('user:edit'),
  updateUser
);

// Eliminar usuario - requiere permiso user:delete
router.delete(
  '/:id',
  authenticate,
  authorizePermission('user:delete'),
  deleteUser
);

export default router;
```

---

## 🚀 Ejercicio Práctico

### 📝 Implementar Sistema de Permisos Dinámicos Completo

Vamos a implementar un sistema de permisos dinámicos paso a paso:

**Paso 1: Configurar la base de datos**

Ejecuta los scripts SQL proporcionados anteriormente para crear las tablas de permisos y relaciones.

**Paso 2: Crear el middleware de permisos**

Crea `src/middlewares/permission.middleware.ts` con el código mostrado anteriormente.

**Paso 3: Crear el modelo de permisos (opcional pero recomendado)**

Crea `src/models/permissions.model.ts` para centralizar la lógica de verificación de permisos.

**Paso 4: Actualizar las rutas existentes**

Modifica tus rutas para usar `authorizePermission` en lugar de `authorize(['admin'])`.

**Paso 5: Probar el sistema**

Usa los siguientes comandos CURL para probar el sistema:

```bash
# 1. Registrar un usuario con rol 'user'
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123!",
    "username": "testuser"
  }'

# 2. Registrar un usuario con rol 'analyst' (necesitarás asignarlo manualmente en la DB)
# O crear un endpoint para asignar roles (solo para admin)

# 3. Login como user
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123!"
  }'
# Guarda el token recibido

# 4. Intentar ver productos (debería funcionar si user tiene permiso product:view)
curl -X GET http://localhost:3000/products \
  -H "Authorization: Bearer <token-user>"

# 5. Intentar crear producto (debería fallar si user NO tiene permiso product:edit)
curl -X POST http://localhost:3000/products \
  -H "Authorization: Bearer <token-user>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Producto Test",
    "price": 100
  }'

# 6. Ver métricas (debería fallar si user NO tiene permiso metrics:view)
curl -X GET http://localhost:3000/metrics \
  -H "Authorization: Bearer <token-user>"
```

**Paso 6: Verificar permisos en la base de datos**

```sql
-- Ver todos los permisos de un usuario específico
SELECT u.username, r.name as role, p.action as permission, p.description
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
JOIN role_permissions rp ON r.id = rp.role_id
JOIN permissions p ON rp.permission_id = p.id
WHERE u.id = 1; -- Reemplaza con el ID del usuario
```

---

## 🏠 Tarea para la Próxima Clase

### ✅ Ejercicio: Sistema de Permisos Dinámicos

Implementa un sistema completo de permisos dinámicos en tu proyecto backend con los siguientes requisitos:

1. **Estructura de base de datos** - Crea las tablas `permissions` y `role_permissions` con las relaciones adecuadas
2. **Middleware de permisos** - Implementa el middleware `authorizePermission` que verifique permisos desde la base de datos
3. **Permisos iniciales** - Crea al menos 5 permisos diferentes para tu aplicación (ej: `product:view`, `product:edit`, `user:delete`, etc.)
4. **Roles adicionales** - Crea al menos 2 roles nuevos además de `admin` y `user` (ej: `analyst`, `moderator`, `editor`)
5. **Asignación de permisos** - Asigna permisos específicos a cada rol según su función
6. **Actualización de rutas** - Actualiza al menos 5 rutas existentes para usar `authorizePermission` en lugar de `authorize`
7. **Endpoint de permisos** - Crea un endpoint GET `/auth/permissions` que devuelva los permisos del usuario autenticado

**Requisitos técnicos:**

- Usar TypeScript con tipado estricto
- Implementar el trigger para asignar automáticamente permisos a `admin`
- Documentar cada permiso con su descripción
- Probar el sistema con diferentes usuarios y roles
- Manejar errores adecuadamente cuando falten permisos
- Crear un script SQL de inicialización con permisos y roles base

**Bonus:**

- Crear un endpoint para que los administradores gestionen permisos (asignar/quitar permisos a roles)
- Implementar caché de permisos para mejorar el rendimiento
- Crear un sistema de auditoría que registre qué permisos se usaron y cuándo

---

## 📚 Recursos Adicionales

### 🔗 Enlaces Útiles

- [RBAC (Role-Based Access Control)](https://en.wikipedia.org/wiki/Role-based_access_control) - Artículo sobre control de acceso basado en roles
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) - Mejores prácticas de autorización
- [Database Design for Permissions](https://www.databasejournal.com/features/mysql/article.php/3911756/Database-Design-for-Permissions.htm) - Diseño de base de datos para permisos
- [Express Middleware Guide](https://expressjs.com/en/guide/using-middleware.html) - Guía oficial de middlewares en Express

### 📖 Conceptos para Investigar

- **RBAC (Role-Based Access Control)** - Control de acceso basado en roles, el modelo que estamos implementando
- **ABAC (Attribute-Based Access Control)** - Control de acceso basado en atributos, más granular que RBAC
- **Permission Caching** - Técnicas para cachear permisos y mejorar el rendimiento
- **Permission Inheritance** - Sistemas donde los permisos se heredan entre roles

---

## ❓ Preguntas Frecuentes

### ¿Cuál es la diferencia entre roles rígidos y permisos dinámicos?

- **Roles rígidos:** Los permisos están hardcodeados en el código. Para cambiar permisos, necesitas modificar y recompilar el código.

- **Permisos dinámicos:** Los permisos se almacenan en la base de datos. Puedes agregar, quitar o modificar permisos sin tocar el código, solo actualizando la base de datos.

- **Ventaja de permisos dinámicos:** Escalabilidad, flexibilidad y mantenibilidad. Ideal para aplicaciones que crecen y necesitan adaptarse a nuevos requisitos.

### ¿Por qué usar permisos en lugar de solo roles?

- **Granularidad:** Los permisos permiten control fino sobre cada acción (ver, editar, eliminar) en lugar de todo o nada por rol.

- **Flexibilidad:** Puedes crear roles personalizados combinando permisos específicos sin necesidad de crear nuevos roles para cada combinación.

- **Mantenibilidad:** Los cambios se realizan en la base de datos, no en el código, lo que facilita la gestión y reduce errores.

- **Escalabilidad:** Agregar nuevos permisos o roles no requiere cambios en el código fuente.

### ¿Cómo funciona la consulta de permisos en el middleware?

La consulta SQL une cuatro tablas:

1. **`users`** - El usuario autenticado
2. **`user_roles`** - Los roles del usuario
3. **`role_permissions`** - Los permisos de cada rol
4. **`permissions`** - La información del permiso

Si la consulta encuentra una coincidencia, el usuario tiene el permiso. Si no encuentra nada, se deniega el acceso.

### ¿Qué pasa si un usuario tiene múltiples roles?

Si un usuario tiene múltiples roles, el sistema verifica si **cualquiera** de sus roles tiene el permiso requerido. Si al menos uno de los roles tiene el permiso, el acceso se permite.

**Ejemplo:** Si un usuario tiene los roles `user` y `analyst`, y necesita el permiso `product:view`, el sistema verificará si `user` o `analyst` tienen ese permiso.

### ¿Cómo puedo optimizar el rendimiento del sistema de permisos?

- **Caché de permisos:** Almacenar los permisos del usuario en memoria o Redis después de la primera consulta
- **Índices en la base de datos:** Crear índices en las columnas de las tablas de relación
- **Consulta optimizada:** Usar JOINs eficientes y limitar los resultados
- **Validación en el token JWT:** Incluir los permisos en el payload del JWT (con precaución por tamaño)

---

## 🧰 Buenas Prácticas

- ✔️ Usar nombres descriptivos para permisos (ej: `product:edit` en lugar de `pe`)
- ✔️ Documentar cada permiso con una descripción clara
- ✔️ Agrupar permisos por recurso usando el formato `recurso:accion` (ej: `product:view`, `product:edit`)
- ✔️ Asignar automáticamente todos los permisos al rol `admin` mediante triggers
- ✔️ Validar permisos en cada ruta protegida, no confiar solo en el frontend
- ✔️ Registrar intentos de acceso denegados para auditoría
- ✔️ Usar transacciones al asignar/quitar permisos para mantener consistencia
- ✔️ Implementar caché de permisos para mejorar el rendimiento en sistemas grandes

---

## 🎉 ¡Permisos Dinámicos Dominado!

¡Excelente trabajo! Ya conoces cómo implementar un sistema de permisos dinámicos escalable, cómo separar roles de permisos, y cómo autorizar acciones específicas desde la base de datos. Este sistema te permitirá crecer sin necesidad de reescribir código cada vez que aparezcan nuevos roles o funcionalidades.

**Recuerda:** Un buen sistema de permisos es la base de una aplicación segura y escalable. Siempre piensa en el futuro y diseña para crecer. ¡Sigue practicando y construyendo sistemas robustos! 🚀

---

_📧 **Contacto:** Si tienes dudas sobre roles y permisos dinámicos, no dudes en consultar durante la clase o por los canales de comunicación establecidos._

