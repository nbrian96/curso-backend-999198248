# 🧪 Lección 1 — Entorno y primeras operaciones

## 🎯 Objetivos de la lección

- Instalar y preparar el entorno de MongoDB.
- Conectarse desde MongoDB Compass o un servidor remoto (Atlas).
- Ejecutar operaciones CRUD básicas (insertar, buscar, actualizar, eliminar).
- Usar Compass y mongosh para interactuar con la base de datos.

---

## 🟩 Opción A — Instalar MongoDB localmente

Puedes instalar MongoDB Community Server en Linux, Windows o macOS.  
Incluye:

- mongod
- mongosh
- Servicios auxiliares

Pasos generales:

1. Descargar desde la web oficial.
2. Instalar según sistema operativo.
3. Verificar con:
   - mongod --version
   - mongosh --version

---

## 🟦 Opción B — Usar MongoDB Atlas (gratuito)

Pasos:

1. Crear cuenta en MongoDB Atlas.
2. Crear un Cluster Free Tier (M0).
3. Configurar usuario y contraseña.
4. Permitir acceso desde tu IP.
5. Obtener la cadena de conexión:

```
mongodb+srv://usuario:password@cluster.mongodb.net/
```

---

## 🔍 Instalar y usar MongoDB Compass

Pasos:

1. Descargar Compass.
2. Abrir la aplicación.
3. Conectar a:
   - Local: mongodb://localhost:27017
   - Atlas: cadena SRV
4. Click en Connect.

Compass permite:

- Crear bases de datos
- Crear colecciones
- Insertar documentos
- Ejecutar filtros
- Ver índices

---

## 📂 Crear base de datos y colección en Compass

1. Create Database
2. Nombre: testdb
3. Colección: users

---

## 🧱 Primeras operaciones en Compass

### ➕ Insertar documento

```
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "year": 1937
}
```

### 🔍 Buscar documentos

```
{ "author": "J.R.R. Tolkien" }
```

### 🔄 Actualizar documento

```
{ "$set": { "year": 1938 } }
```

### ❌ Eliminar documento

Acción Delete.

---

## 💻 Primeras operaciones en mongosh

Abrir terminal:

```
mongosh
```

Operaciones básicas:

```
use testdb;

db.books.insertOne({ title: "Dune", author: "Frank Herbert", year: 1965 });

db.books.find();

db.books.updateOne(
  { title: "Dune" },
  { $set: { year: 1966 } }
);

db.books.deleteOne({ title: "Dune" });
```

---

## 📝 Ejercicio corto

Crear colección "books" y añadir 3 documentos.

Ejemplo:

```
{
  "title": "Neuromancer",
  "author": "William Gibson",
  "year": 1984,
  "genre": "Cyberpunk"
}
```
