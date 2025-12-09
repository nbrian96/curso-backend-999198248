# 🟦 Lección 6 — Integración con Node.js + TypeScript + Mongoose (CRUD Completo)

## 🎯 Objetivos de la lección

- Crear un proyecto Node.js con **TypeScript**.
- Integrar MongoDB usando **Mongoose** (obligatorio).
- Definir un modelo `Book`.
- Implementar un CRUD completo:
  - Create
  - Read (list + by id + búsquedas)
  - Update
  - Delete
- Usar `mongosh` o Compass para verificar datos.
- (Opcional) Despliegue local con Docker.

---

## ⚙️ 1. Crear el proyecto con TypeScript

### Inicializar proyecto

```
mkdir api-books
cd api-books
npm init -y
```

### Instalar dependencias

Dependencias principales:

```
npm install express mongoose
```

Dependencias de desarrollo:

```
npm install -D typescript ts-node-dev @types/node @types/express
```

### Inicializar TypeScript

```
npx tsc --init
```

Modificar `"outDir"` a `"dist"`.

---

## 📁 2. Estructura recomendada del proyecto

```
api-books/
├─ src/
│ ├─ index.ts
│ ├─ config/
│ │ └─ db.ts
│ ├─ models/
│ │ └─ book.model.ts
│ ├─ routes/
│ │ └─ book.routes.ts
│ └─ controllers/
│ └─ book.controller.ts
└─ package.json
```

---

## 🔌 3. Conexión a MongoDB usando Mongoose

Archivo: `src/config/db.ts`

```
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/booksdb");
    console.log("MongoDB conectado 🚀");
  } catch (error) {
    console.error("Error al conectar MongoDB:", error);
    process.exit(1);
  }
};
```

---

## 📚 4. Crear el modelo Book con Mongoose

Archivo: `src/models/book.model.ts`

```
import { Schema, model } from "mongoose";

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    genres: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Book = model("Book", BookSchema);
```

---

## 🧭 5. Crear controladores (CRUD)

Archivo: `src/controllers/book.controller.ts`

### Create

```
export const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: "Error creando libro" });
  }
};
```

### Read (list)

```
export const getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};
```

### Read (by id)

```
export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ error: "No encontrado" });
  res.json(book);
};
```

### Update

```
export const updateBook = async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};
```

### Delete

```
export const deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Eliminado" });
};
```

---

## 🧵 6. Rutas

Archivo: `src/routes/book.routes.ts`

```
import { Router } from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/book.controller";

const router = Router();

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
```

---

## ▶️ 7. Servidor Express

Archivo: `src/index.ts`

```
import express from "express";
import { connectDB } from "./config/db";
import bookRoutes from "./routes/book.routes";

const app = express();
app.use(express.json());

app.use("/books", bookRoutes);

connectDB();

app.listen(3000, () => console.log("Servidor en puerto 3000"));
```

---

## 🧪 8. Probar con MongoDB Compass o mongosh

Insertar datos desde mongosh:

```
db.books.insertOne({ title: "Dune", author: "Frank Herbert", year: 1965 })
```

Listar:

```
db.books.find()
```

---

## 🐳 9. (Opcional) Docker para MongoDB local

Archivo `docker-compose.yml`:

```
version: "3"
services:
  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

---

## 🔚 Conclusión

Aprendiste a integrar MongoDB con un backend Node.js + TypeScript usando **Mongoose**, construir un CRUD completo y verificar datos desde Compass o mongosh.  
Este es el setup estándar profesional para APIs modernas basadas en MongoDB.
