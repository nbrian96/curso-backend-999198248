# ⚡ Lección 4 — Índices y rendimiento

## 🎯 Objetivos de la lección

- Entender qué son los índices y por qué importan.
- Conocer los tipos de índices en MongoDB (simples, compuestos, de texto, multikey, TTL).
- Aprender buenas prácticas para diseñar índices.
- Usar explain() para analizar el rendimiento de consultas.
- Realizar ejercicios conceptuales para comparar tiempos.

---

## 🔎 1. ¿Qué es un índice?

Un índice es una estructura que mejora la velocidad de las operaciones de búsqueda en una colección a costa de espacio adicional y sobrecarga en escrituras. Funcionan de forma similar a los índices de un libro: permiten localizar documentos sin recorrer la colección completa.

---

## 🧾 2. Tipos de índices comunes

### ✅ Índice simple

Índice sobre un único campo.

```
db.books.createIndex({ title: 1 })
```

Donde `1` = ascendente, `-1` = descendente.

### ✅ Índice compuesto

Índice sobre varios campos (útil para consultas que filtran o ordenan por varias claves).

```
db.books.createIndex({ author: 1, year: -1 })
```

### ✅ Índice de texto

Permite búsquedas de texto en campos string. Requiere índice de texto y luego usar `$text`.

```
db.articles.createIndex({ title: "text", body: "text" })
```

Consulta de ejemplo:

```
db.articles.find({ $text: { $search: "mongodb indexing" } })
```

### ✅ Índice multikey

Automático cuando indicas un índice sobre un campo array; MongoDB indexa cada elemento del array.

Ejemplo (no se crea de forma especial):

```
db.books.createIndex({ genres: 1 })
```

Si `genres` es un array, el índice será multikey.

### ✅ Índice TTL (Time To Live)

Permite eliminar documentos automáticamente tras un periodo (útil para logs, cachés).

```
db.sessions.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 3600 })
```

---

## 🧭 3. Índice único y cobertura

- `unique: true` fuerza unicidad en el índice:

```
db.users.createIndex({ email: 1 }, { unique: true })
```

- Índices cubrientes (covered queries): si la consulta solo solicita campos incluidos en el índice, MongoDB puede responder sin acceder al documento completo.

Ejemplo de índice cubriente:

```
db.books.createIndex({ author: 1, title: 1 })
```

Consulta:

```
db.books.find({ author: "Asimov" }, { author: 1, title: 1, _id: 0 })
```

Si la consulta solicita solo `author` y `title`, el índice puede cubrirla.

---

## ⚙️ 4. Cómo medir rendimiento: explain()

`explain()` muestra el plan de ejecución y métricas. Usa `explain("executionStats")` para detalles.

Ejemplo:

```
db.books.find({ author: "Asimov" }).explain("executionStats")
```

Puntos clave a revisar en el resultado:

- `totalDocsExamined` (cuántos documentos inspeccionó)
- `totalKeysExamined` (cuántas entradas del índice)
- `executionTimeMillis`
- tipo de plan: COLLSCAN (escaneo completo) vs IXSCAN (uso de índice)

---

## 🧰 5. Buenas prácticas de índices

- Indexar los campos que usas frecuentemente en filtros y ordenamientos.
- Evitar sobre-indexar: cada índice agrega coste en escritura y almacenamiento.
- Usar índices compuestos para consultas que filtran por varias claves en conjunto.
- Priorizar selectividad: los índices son más efectivos cuando filtran muchos documentos.
- Considerar índices de texto solo cuando se requieran búsquedas de texto; no abusar.
- Revisar con `explain()` y métricas (profiler, mongostat, mongotop).

---

## 📈 6. Ejemplos comparativos (conceptual)

**Escenario:** colección `books` con 1 millón de documentos.

- Consulta sin índice (COLLSCAN):

```
db.books.find({ author: "Asimov" })
```

`explain()` mostrará muchos documentos examinados y mayor tiempo de ejecución.

- Misma consulta con índice en `author` (IXSCAN):

```
db.books.createIndex({ author: 1 })
db.books.find({ author: "Asimov" })
```

`explain()` mostrará `IXSCAN`, menos documentos examinados y menor tiempo.

> Nota: En entornos reales, medir tiempos exactos requiere ejecutar las consultas y comparar `executionStats.executionTimeMillis`. En esta lección incluimos un ejercicio conceptual y la forma de comparar con `explain()`.

---

## 🔧 7. Operaciones para mantenimiento de índices

- Listar índices:

```
db.books.getIndexes()
```

- Eliminar un índice por nombre:

```
db.books.dropIndex("author_1")
```

---

## 🧪 8. Ejercicio práctico (conceptual / guiado)

1. En una colección `books` con datos de ejemplo, crear un índice simple en `author`.
2. Ejecutar la consulta `db.books.find({ author: "Asimov" })` y revisar `explain("executionStats")`.
3. Crear un índice compuesto `{ author: 1, year: -1 }` y repetir la consulta ordenando por `year`.
4. Crear un índice de texto en `title` y `summary`; probar `db.books.find({ $text: { $search: "ciencia ficción" } })`.
5. Reflexionar: ¿qué consultas se benefician más de cada índice? ¿Qué coste observaste en las escrituras?

---

## 🔚 Conclusión

Los índices son la herramienta principal para optimizar lecturas en MongoDB. Diseñarlos bien implica equilibrar velocidad de lectura contra coste de escritura y almacenamiento. Usa `explain()` para validar y siempre prueba con datos representativos.
