# Lección 0 — Introducción a MongoDB

## 🎯 Objetivos del curso

- Comprender qué es una base de datos NoSQL.
- Introducir la arquitectura y conceptos fundamentales de MongoDB.
- Aprender a crear bases de datos y colecciones.
- Realizar operaciones básicas (CRUD) en Compass y mongosh.
- Desarrollar consultas simples y pipelines de agregación.
- Dominar índices, rendimiento y buenas prácticas.
- Integrar MongoDB con Node.js + TypeScript usando Mongoose.
- Construir una API final como trabajo práctico.

---

## 🟢 ¿Qué es MongoDB?

MongoDB es una base de datos **NoSQL orientada a documentos**, donde los datos se almacenan en formato **BSON** (una versión binaria de JSON).  
A diferencia de los sistemas relacionales, no requiere esquemas rígidos y su estructura es altamente flexible.

---

## ⭐ Ventajas frente a RDBMS

- Esquemas flexibles: no necesitas modificar estructuras para agregar campos.
- Escalabilidad horizontal mediante _sharding_.
- Alto rendimiento en lecturas/escrituras.
- Modelo natural para documentos JSON que usan la mayoría de APIs modernas.
- Curva de aprendizaje suave para desarrolladores web.

---

## 📌 Casos de uso comunes

- APIs REST y aplicaciones web modernas.
- Microservicios y arquitecturas distribuidas.
- Almacenamiento de logs y eventos.
- Sistemas que manejan datos semiestructurados o cambiantes.
- Apps con grandes volúmenes de escritura.

---

## 🧩 Arquitectura básica (alto nivel)

- **Documento**: unidad mínima de datos (JSON/BSON).
- **Colección**: agrupación de documentos (equivalente a una tabla, pero sin esquema fijo).
- **Base de datos**: conjunto de colecciones.
- **Replica set**: grupo de servidores que proveen alta disponibilidad.
- **Shards**: particiones distribuidas para manejar grandes volúmenes de datos.
