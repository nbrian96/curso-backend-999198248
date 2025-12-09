# 🔧 Lección 3 — Agregaciones y Pipelines en MongoDB

## 🎯 Objetivos de la lección

- Comprender qué es el **Aggregation Framework**.
- Construir pipelines paso a paso.
- Usar operadores comunes: **$match, $group, $sort, $limit, $project, $lookup**.
- Realizar ejercicios para obtener estadísticas y combinaciones de datos.

---

## 📌 1. ¿Qué es una agregación?

La agregación en MongoDB permite procesar documentos mediante **pipelines** (tuberías), donde cada etapa transforma los datos.  
Es equivalente a pipelines de datos, queries avanzadas o funciones de agregación en SQL.

Un pipeline es una secuencia de etapas, por ejemplo:

```
db.books.aggregate([
  { $match: { year: { $gte: 2000 } } },
  { $group: { _id: "$author", total: { $sum: 1 } } }
])
```

---

## 🧱 2. Etapas principales

### 🟦 **$match**

Filtra documentos (equivalente a WHERE).

```
{ $match: { author: "Asimov" } }
```

### 🟨 **$group**

Agrupa documentos y permite acumuladores:

- `$sum`
- `$avg`
- `$max`
- `$min`
- `$push`
- `$addToSet`

Ejemplo:

```
{
  $group: {
    _id: "$author",
    total_books: { $sum: 1 }
  }
}
```

### 🟩 **$project**

Selecciona, renombra y construye campos.

```
{
  $project: {
    title: 1,
    author: 1,
    published: "$year"
  }
}
```

### 🟥 **$sort**

Ordena resultados.

```
{ $sort: { year: -1 } }
```

### 🟪 **$limit**

Limita la cantidad de documentos.

```
{ $limit: 5 }
```

### 🟫 **$lookup** (equivalente a JOIN)

Une datos entre colecciones.

Ejemplo: unir `books` con `authors`:

```
{
  $lookup: {
    from: "authors",
    localField: "author_id",
    foreignField: "_id",
    as: "author_info"
  }
}
```

---

## 📊 3. Pipeline completo de ejemplo

Agrupar libros por autor y ordenarlos por cantidad:

```
db.books.aggregate([
  { $group: { _id: "$author", total_books: { $sum: 1 } } },
  { $sort: { total_books: -1 } },
  { $limit: 10 }
])
```

---

## 📚 4. Ejercicio práctico

Usando la colección **books**, realizar:

### 📝 Ejercicio 1 — Agrupar libros por autor

Obtener un listado como:

- autor
- cantidad de libros

### 📝 Ejercicio 2 — Buscar libros por género

Filtrar por un género usando:

```
{ $match: { genres: "Fantasía" } }
```

### 📝 Ejercicio 3 — Mostrar título, autor y año

Utilizar `$project` para renombrar campos si es necesario.

---

## 🧩 Conclusión

El **aggregation pipeline** es una de las partes más poderosas de MongoDB. Permite transformar, agrupar, filtrar y unir datos de manera flexible y escalable.

¡Con estos fundamentos ya podés construir reportes y consultas avanzadas!
