# 📚 Lección 2 — Modelo de datos y consultas básicas

## 🎯 Objetivos de esta lección

- Comprender cómo se modelan los datos en MongoDB.
- Conocer esquemas flexibles, normalización y desnormalización.
- Revisar los tipos de datos más usados.
- Ejecutar consultas find() con filtros, proyecciones y operadores.
- Practicar consultas básicas sobre la colección books.

---

## 🧩 1. Modelo de datos en MongoDB

MongoDB utiliza un modelo orientado a documentos, lo que significa que los datos se guardan como objetos JSON (BSON internamente).

Esto permite:

- Esquemas dinámicos
- Estructuras anidadas
- Facilidad para representar objetos reales

### ✔️ Ventajas del modelo flexible

- No requiere migraciones estructurales
- Es fácil extender entidades
- Ideal para APIs modernas

### ⚠️ Consideraciones

- Puede volverse caótico sin buenas prácticas

---

## 🏗️ 2. Normalización vs desnormalización

### 🟦 Normalización

Separar datos en colecciones relacionadas.

Ventajas:

- Evita duplicados
- Actualizaciones más simples

Desventajas:

- Requiere múltiples consultas o $lookup

### 🟩 Desnormalización

Incluir datos relacionados dentro del documento.

Ejemplo:

```
{
  "title": "Dune",
  "author": { "name": "Frank Herbert" },
  "genres": ["Sci-Fi", "Adventure"]
}
```

Ventajas:

- Consultas rápidas
- Documento autocontenido

Desventajas:

- Duplicación

---

## 🔢 3. Tipos de datos más comunes

- String
- Number
- Boolean
- Array
- Object
- Date
- ObjectId
- Null
- Embedded documents

---

## 🔍 4. Consultas básicas con find()

### 🎯 Filtros simples

```
{ "author": "Frank Herbert" }
```

### 📌 Operadores comunes

- $gt, $gte, $lt, $lte
- $ne
- $in, $nin
- $regex
- $exists

Ejemplos:

**Libros posteriores a 2000:**

```
{ "year": { "$gt": 2000 } }
```

**Autores específicos:**

```
{ "author": { "$in": ["Tolkien", "Asimov"] } }
```

**Búsqueda parcial:**

```
{ "title": { "$regex": "dune", "$options": "i" } }
```

---

## 🪄 5. Proyecciones

```
{ "title": 1, "author": 1, "_id": 0 }
```

---

## 📑 6. Ordenar resultados

```
{ "year": -1 }
```

---

## 📝 Ejercicio

Realizar consultas sobre la colección books:

1. Libros desde 2020.
2. Títulos que incluyan “star”.
3. Mostrar solo title y author.
4. Autores: Asimov, Gibson, Tolkien.
5. Libros cuyo genre incluya Sci-Fi.
