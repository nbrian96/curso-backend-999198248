# 📖 Clase 9: Bases de Datos No Relacionales con MongoDB

## 🎯 Objetivos de la Clase

- Comprender el paradigma NoSQL y cuándo conviene usarlo 💡
- Instalar MongoDB localmente usando Docker y validar el entorno 🐳
- Crear bases de datos y colecciones desde MongoDB Compass 🧱
- Ejecutar consultas básicas (find, insertMany, updateOne, deleteOne) 🧮
- Diseñar un flujo de trabajo para un proyecto real integrando Compass y la CLI 🛠️

---

## 📚 ¿Qué es MongoDB?

### 🔍 Definición

**MongoDB** es una base de datos NoSQL orientada a documentos que almacena información en formato BSON, permitiendo esquemas flexibles y escalabilidad horizontal para aplicaciones modernas.

### 🏗️ Características Principales

- **Modelo basado en documentos:** Los datos viven en documentos JSON enriquecidos fáciles de anidar.
- **Esquema flexible:** Cada documento puede tener campos distintos, ideal para iteraciones rápidas.
- **Escalabilidad horizontal:** Replica sets y sharding nativos para soportar grandes volúmenes.
- **Consultas expresivas:** Filtros, agregaciones y pipelines para transformar datos sin salir de la base.

### 📖 Historia Breve

- **2007:** 10gen libera MongoDB como parte de una plataforma PaaS.
- **2009:** Proyecto open source; foco en documentos y escalabilidad web.
- **2013:** Incorporación oficial de agregaciones y text search.
- **2017:** Rebranding a MongoDB Inc. y salida a bolsa (NASDAQ: MDB).
- **2025:** MongoDB Atlas y herramientas como Compass facilitan despliegues híbridos y multi-cloud.

---

## 🏛️ Fundamentos de MongoDB

### 📝 Documentos BSON

Los documentos son pares clave-valor con soporte para tipos como fechas y objetos anidados.

```json
{
  "_id": ObjectId("6742c1f5e13b1a0021b849a7"),
  "nombre": "Transporte Andes",
  "rubro": "Logística",
  "sucursales": ["CABA", "Mendoza"],
  "activa": true
}
```

### 📝 Colecciones

Análogas a “tablas”, agrupan documentos sin requerir columnas fijas.

```javascript
db.createCollection('empresas', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['nombre', 'activa'],
      properties: {
        nombre: { bsonType: 'string' },
        activa: { bsonType: 'bool' },
      },
    },
  },
});
```

### 📝 Operaciones CRUD básicas

```javascript
// Create
db.empresas.insertMany([
  { nombre: 'AgroNorte', rubro: 'Agro', activa: true },
  { nombre: 'TecnoSur', rubro: 'IT', activa: false },
]);

// Read
db.empresas.find({ activa: true }, { nombre: 1, rubro: 1 });

// Update
db.empresas.updateOne(
  { nombre: 'TecnoSur' },
  { $set: { activa: true }, $currentDate: { actualizado: true } }
);

// Delete
db.empresas.deleteOne({ nombre: 'AgroNorte' });
```

### 📝 Filtros y proyecciones en Compass

Compass permite construir queries visuales con filtros y proyecciones.

```json
{
  "rubro": { "$in": ["Logística", "IT"] },
  "activa": true
}
```

---

## 🧭 Instalación de MongoDB Compass

### 🐧 Linux (Ubuntu/Debian)

```bash
wget https://downloads.mongodb.com/compass/mongodb-compass_1.42.3_amd64.deb -O compass.deb
sudo apt install ./compass.deb
mongodb-compass &
```

- Verifica que Docker esté corriendo y que `mongod` escuche en `mongodb://localhost:27017`.
- En Compass selecciona **New Connection → Fill in connection string → Connect**.

### 🪟 Windows

1. Descarga el `.exe` desde https://www.mongodb.com/try/download/compass.
2. Ejecuta el instalador y acepta el PATH sugerido.
3. Abre Compass desde el menú Inicio y conecta con `mongodb://localhost:27017`.

### 🍏 macOS

```bash
brew install --cask mongodb-compass
open -a "MongoDB Compass"
```

- Si usas Apple Silicon, confirma que instalas la versión arm64.
- Para conexiones remotas, habilita SSL en la pestaña **Advanced Connection Options**.

---

## 🏗️ MongoDB Avanzado

### 📄 Índices compuestos

```javascript
db.empresas.createIndex(
  { rubro: 1, sucursales: 1 },
  { name: 'idx_rubro_sucursales', background: true }
);
```

### 📄 Replica set local con Docker

```yaml
services:
  mongo:
    image: mongo:4.4
    container_name: mongodb
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: mongopassword
      MONGO_INITDB_DATABASE: admin
    volumes:
      - ./mongo_data:/data/db
    ports:
      - '27017:27017'

  mongo-express:
    image: mongo-express
    restart: unless-stopped
    container_name: mongo-express
    environment:
      ME_CONFIG_MONGODB_SERVER: mongo
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: mongopassword
      ME_CONFIG_MONGODB_PORT: '27017'
      ME_CONFIG_BASICAUTH_USERNAME: mongoexpress
      ME_CONFIG_BASICAUTH_PASSWORD: mepassword
    ports:
      - '8081:8081'
    links:
      - mongo
    depends_on:
      - mongo
```

Después de levantar el contenedor:

```shell
mongosh --host localhost --eval 'rs.initiate()'
```

---

## 🚀 Ejercicio Práctico

### 📝 Gestión de Flota Sustentable

Modela los vehículos eléctricos de una empresa de transporte, identifica su estado y obtiene métricas rápidas.

```javascript
use transporte_sustentable;

db.vehiculos.insertMany([
  {
    patente: "EV-501",
    tipo: "Van",
    bateria: 78,
    ultimaRevision: ISODate("2025-10-01"),
    sensores: { temperatura: 24, humedad: 65 }
  },
  {
    patente: "EV-742",
    tipo: "Auto",
    bateria: 55,
    ultimaRevision: ISODate("2025-11-12"),
    sensores: { temperatura: 29, humedad: 40 }
  }
]);

db.vehiculos.find(
  { bateria: { $lt: 60 } },
  { patente: 1, tipo: 1, bateria: 1, _id: 0 }
);
```

**Archivo `docker-compose.mongo.yml`:**

```yaml
services:
  mongo:
    image: mongo:7.0
    container_name: mongo-compass
    restart: always
    ports:
      - '27017:27017'
    volumes:
      - ./data/mongo:/data/db
```

---

## 🏠 Tarea para la Próxima Clase

### ✅ Ejercicio:

Crea una base `campus_green` con colecciones `estudiantes`, `cursos` y `inscripciones`. Debes:

1. **Modelar esquemas flexibles** con al menos 8 campos variados por colección.
2. **Insertar 15 documentos** usando scripts JSON o la CLI.
3. **Definir 3 índices** (texto, compuesto e índice parcial).
4. **Construir 5 consultas** con filtros y proyecciones diferentes.
5. **Crear un pipeline de agregación** que agrupe inscripciones por curso.
6. **Exportar un dataset** desde Compass y adjuntarlo en la entrega.
7. **Documentar pasos** (Docker, Compass, comandos utilizados) en un README.

**Requisitos técnicos:**

- Docker Desktop o Podman configurado.
- MongoDB Compass actualizado (>= 1.40).
- Archivo `.env` con credenciales (si usas usuarios).
- Scripts `.js` o `.sh` reproducibles.

---

## 📚 Recursos Adicionales

### 🔗 Enlaces Útiles

- [MongoDB Docs](https://www.mongodb.com/docs/) - Guía oficial con ejemplos actualizados.
- [Compass Manual](https://www.mongodb.com/docs/compass/current/) - Tutorial visual paso a paso.
- [Docker Hub Mongo](https://hub.docker.com/_/mongo) - Parámetros de la imagen oficial.
- [MongoDB University](https://learn.mongodb.com/) - Cursos gratuitos certificados.

### 📖 Conceptos para Investigar

- **Sharding** Estrategias para distribuir datos masivos.
- **Aggregations** Operadores `$group`, `$match`, `$project`.
- **Change Streams** Subscripción a eventos en tiempo real.
- **Atlas** Despliegue administrado multicloud.

---

## ❓ Preguntas Frecuentes

### ¿MongoDB reemplaza completamente a una base SQL?

- **Depende del caso de uso.** MongoDB brilla con datos flexibles.
- **Puedes combinarlas.** Arquitecturas poliglotas son comunes.
- **Evalúa transacciones.** Si necesitas ACID estricto, revisa MongoDB 4+ o un motor SQL.

### ¿Necesito esquemas si MongoDB es flexible?

- **No es obligatorio,** pero los validadores ayudan a evitar datos corruptos.
- **Compass** permite diseñar esquemas visuales rápidamente.
- **Mongoose u ODMs** agregan tipado y middlewares.

### ¿Compass y la CLI muestran la misma info?

- **Sí,** ambos usan el mismo servidor.
- **Compass** es ideal para validar visualmente.
- **mongosh** permite automatizar tareas y scripts CI/CD.

---

## 🎉 ¡MongoDB Dominado!

Ya puedes levantar MongoDB con Docker, crear tus primeras colecciones en Compass y ejecutar queries básicas que respalden un proyecto realista. En la próxima clase profundizaremos en operaciones CRUD avanzadas, CLI y optimización mediante índices.

**Recuerda:** practica importando datasets reales y versiona tus scripts. ¡Cada iteración te acerca a manejar volúmenes masivos con soltura! 🚀

---

_📧 **Contacto:** Si tienes dudas sobre MongoDB o NoSQL, no dudes en consultar durante la clase o por los canales de comunicación establecidos._
