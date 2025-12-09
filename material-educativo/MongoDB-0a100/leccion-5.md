# 🔐 Lección 5 — Seguridad, Backups y Despliegue en MongoDB

## 🎯 Objetivos de la lección

- Aprender los conceptos básicos de **seguridad** en MongoDB.
- Conocer cómo funciona la **autenticación y roles**.
- Comprender el uso de **TLS/SSL** para conexiones seguras.
- Aprender a realizar **backups y restauraciones** con `mongodump` y `mongorestore`.
- Introducir el uso de **MongoDB Atlas** para entornos productivos y de testing.

---

## 🔑 1. Seguridad en MongoDB (visión general)

MongoDB puede operar en modo sin autenticación (inseguro) o con **auth habilitado**, donde cada usuario tiene sus roles y permisos.

### Conceptos clave:

- **Usuarios** → autenticación
- **Roles** → permisos
- **Autorización** → control de acceso
- **TLS/SSL** → cifrado de comunicaciones
- **Network Access** → listas de IP permitidas

---

## 🧩 2. Autenticación y roles

MongoDB usa un sistema basado en roles. Algunos roles frecuentes:

- `read` → lectura
- `readWrite` → lectura + escritura en una DB
- `dbAdmin` → administración de una DB
- `clusterAdmin` → administración completa del clúster
- `root` → acceso total

### Crear un usuario (ejemplo):

```
use admin
db.createUser({
  user: "adminUser",
  pwd: "StrongPassword123",
  roles: [{ role: "root", db: "admin" }]
})
```

Iniciar MongoDB con autenticación:

```
mongod --auth
```

Conexión autenticada:

```
mongosh -u adminUser -p StrongPassword123 --authenticationDatabase admin
```

---

## 🔒 3. Conexiones seguras (TLS/SSL)

MongoDB permite cifrar las comunicaciones usando certificados TLS.

Ejemplo de inicio:

```
mongod --tlsMode requireTLS --tlsCertificateKeyFile /ruta/cert.pem
```

Conexión del cliente:

```
mongosh --tls --tlsCAFile /ruta/ca.pem
```

_Nota:_ La configuración exacta depende del entorno.

---

## 🗄️ 4. Backups con `mongodump` y restauración con `mongorestore`

### 📦 Backup (exportar la base)

Backup de una base completa:

```
mongodump --db=miBase --out=/backups/miBase-backup
```

Backup de toda la instancia:

```
mongodump --out=/backups/full
```

### 🔄 Restauración

Restaurar una base:

```
mongorestore --db=miBase --drop /backups/miBase-backup/miBase
```

Restauración completa:

```
mongorestore /backups/full
```

---

## ☁️ 5. Despliegue rápido con MongoDB Atlas

MongoDB Atlas es una plataforma en la nube con:

- Clústeres gratuitos
- Seguridad integrada
- Backups automáticos
- Fácil acceso desde aplicaciones Node.js, Python, etc.

### Pasos básicos:

1. Crear cuenta en Atlas.
2. Crear un clúster **free tier**.
3. Configurar acceso por IP (`0.0.0.0/0` para desarrollo).
4. Crear un usuario con `readWriteAnyDatabase`.
5. Conectar usando la cadena proporcionada:

Ejemplo:

```
mongodb+srv://user:password@cluster0.mongodb.net/myDatabase
```

---

## 🧪 6. Ejercicio práctico

1. Crear un usuario local con rol `readWrite` en una base llamada `securedb`.
2. Realizar un `mongodump` de `securedb`.
3. Eliminar la DB.
4. Restaurarla usando `mongorestore`.
5. (Opcional) Crear un clúster gratuito en Atlas y conectarte desde Compass.

---

## 🔚 Conclusión

En esta lección aprendiste cómo proteger tu base de datos, cómo hacer respaldos y cómo restaurarlos. También conociste cómo usar Atlas para entornos reales.
Con estas herramientas tenés la base para trabajar de forma segura y confiable en producción.
