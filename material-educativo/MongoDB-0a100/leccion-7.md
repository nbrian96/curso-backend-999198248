# 🏁 Lección 7 — Tareas Finales y Examen Práctico

## 🎯 Objetivos de la lección

- Completar el aprendizaje integrando todo lo visto.
- Extender el modelo y la API con características avanzadas.
- Realizar un **examen práctico final** para validar conocimientos.
- Construir un pequeño proyecto funcional usando MongoDB, Node.js, TypeScript y Mongoose.

---

## 🔧 1. Extensiones recomendadas (nivel profesional)

### ✔️ Validación de esquemas con Mongoose

Agregar reglas adicionales, como:

- Valores mínimos y máximos
- Validaciones personalizadas
- Regex
- Campos únicos

Ejemplo:

```
const BookSchema = new Schema({
  title: { type: String, required: true, minlength: 2 },
  author: { type: String, required: true },
  year: { type: Number, min: 1900, max: 2100 },
  genres: { type: [String], default: [] },
  isbn: { type: String, unique: true }
});
```

---

### ✔️ Paginación

Implementación clásica con `limit` y `skip`:

```
router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;

  const books = await Book.find().skip(skip).limit(limit);
  res.json(books);
});
```

---

### ✔️ Endpoints de búsqueda avanzada

Filtrar por:

- Título parcial (regex)
- Autor
- Año mayor/menor
- Géneros

Ejemplo:

```
router.get("/search", async (req, res) => {
  const filters = {};

  if (req.query.title) {
    filters.title = { $regex: req.query.title, $options: "i" };
  }

  if (req.query.author) {
    filters.author = req.query.author;
  }

  if (req.query.year_gt) {
    filters.year = { $gt: parseInt(req.query.year_gt) };
  }

  const books = await Book.find(filters);
  res.json(books);
});
```

---

## 🧪 2. Ejercicio Final — API Completa + Front o Script

Tu tarea final consiste en construir un proyecto completo:

---

### 📌 Parte 1 — Backend (obligatorio)

1. Crear un proyecto Node.js + TypeScript + Express.
2. Conectar a MongoDB con **Mongoose**.
3. Crear un modelo `Book` con validaciones profesionales.
4. Implementar:

   - ➕ POST /books
   - 📄 GET /books
   - 🔍 GET /books/search
   - 📘 GET /books/:id
   - ✏️ PUT /books/:id
   - 🗑️ DELETE /books/:id
   - 📄 Paginación
   - 🧩 Filtros avanzados

5. Probar toda la API con Postman / Thunder Client / curl.

---

### 📌 Parte 2 — Frontend o Script (elegir uno)

#### Opción A: Mini Frontend (HTML + JS)

- Formulario para crear libros.
- Tabla para listar.
- Campo de búsqueda.

#### Opción B: Script de Pruebas (Node.js)

- Archivo JS o TS que haga peticiones a la API.

Ejemplo:

```
import axios from "axios";

const run = async () => {
  const res = await axios.get("http://localhost:3000/books");
  console.log(res.data);
};

run();
```

---

## 🎓 3. Examen Final

### Deberás entregar:

1. **Código fuente** del backend.
2. Validaciones implementadas.
3. Ejemplos de consultas avanzadas:
   - Búsquedas parciales
   - Búsquedas por año
   - Paginación
4. Logs o capturas de pruebas (incluyendo errores controlados).
5. (Opcional) Mini Front o script de pruebas.

### Serás evaluado en:

- Correcto uso de **Mongoose**
- Limpieza del código
- Manejo de errores
- Buenas prácticas (rutas, controladores, estructura)
- Capacidad de implementar features avanzadas

---

## 🏆 4. Cierre del curso

Si llegaste hasta acá:

✨ Ya sabés modelar datos  
✨ Crear consultas y agregaciones  
✨ Construir APIs reales con Node + TypeScript  
✨ Trabajar de forma profesional con MongoDB

Estás listo para usar MongoDB en proyectos reales.

¡Felicitaciones!
