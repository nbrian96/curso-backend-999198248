# 📖 Clase 17: Conexión y Consultas a Base de Datos (MySQL)

## 🎯 Objetivos de la Clase

- Comprender qué es una base de datos relacional.
- Configurar una conexión a **MySQL** usando **pool de conexiones**.
- Realizar operaciones **CRUD** desde Node.js.
- Integrar la base de datos con la arquitectura MVC existente.
- Crear un **dashboard simple** usando Handlebars y Bootstrap para gestionar datos.

---

## 📚 ¿Qué es una Base de Datos Relacional?

### 🔍 Definición

Una **base de datos relacional** organiza la información en **tablas** relacionadas entre sí mediante claves primarias y foráneas.

Características principales:

- Datos estructurados en filas y columnas
- Relaciones entre tablas
- Uso de SQL para consultas
- Integridad referencial

---

## 🏗️ Estructura de la Base de Datos

Utilizaremos la siguiente estructura SQL:

```sql
-- Create database if not exists
CREATE DATABASE IF NOT EXISTS stock_db;
USE stock_db;

-- Create categories table
CREATE TABLE categories (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);

-- Create products table with foreign key to categories
CREATE TABLE products (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	quantity INT NOT NULL,
	category_id INT,
	CONSTRAINT fk_category
		FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insert default categories
INSERT INTO categories (name) VALUES
('Clothing'),
('Footwear'),
('Accessories');

-- Insert default products with category references
INSERT INTO products (name, price, quantity, category_id) VALUES
('Basic White T-Shirt', 2500.00, 100, 1),
('Blue Jeans', 7800.50, 50, 1),
('Running Sneakers', 14500.99, 30, 2),
('Adjustable Black Cap', 1800.75, 80, 3),
('Waterproof Jacket', 21500.00, 20, 1);
```

---

## 📦 Instalación de Dependencias

```bash
npm install mysql2
```

---

## 📂 Creación de archivos del módulo MySQL

Además de las carpetas ya existentes, agregamos los archivos específicos para base de datos y productos:

```bash
# Base de datos
mkdir src/database
touch src/database/mysql.ts

# Módulo products (MVC)
touch src/models/products.model.ts
touch src/services/products.service.ts
touch src/controllers/products.controller.ts
touch src/routes/products.routes.ts

# Vista del dashboard
touch src/views/products.handlebars
```

Este comando asegura que **cada archivo utilizado en la clase existe explícitamente**.

---

## 🔌 Conexión a MySQL usando Pool

### 🔐 Variables de entorno

La configuración de la base de datos se define en el archivo `.env` (creado en clases anteriores):

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=stock_db
DB_CONNECTION_LIMIT=10
```

### 📄 `src/database/mysql.ts`

```ts
import mysql from 'mysql2/promise';

// Pool de conexiones usando variables de entorno
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: 0,
});

export default pool;
```

### 📝 ¿Por qué usar pool?

- Reutiliza conexiones
- Mejora rendimiento
- Evita saturar MySQL al abrir/cerrar conexiones constantemente

---

## 🧩 Model (consultas SQL)

Definimos **interfaces claras** que representan las tablas de la base de datos.

### 📄 `src/models/products.model.ts`

```ts
import pool from '../database/mysql';

// Representa un producto tal como vive en la base de datos
export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

// Datos necesarios para crear un producto
export interface CreateProductDTO {
  name: string;
  price: number;
  quantity: number;
  category_id: number;
}

export const getAllProducts = async (): Promise<Product[]> => {
  const [rows] = await pool.query<Product[]>(`
    SELECT p.id, p.name, p.price, p.quantity, c.name AS category
    FROM products p
    JOIN categories c ON p.category_id = c.id
  `);

  return rows;
};

export const createProduct = async (data: CreateProductDTO): Promise<void> => {
  const { name, price, quantity, category_id } = data;

  await pool.query(
    'INSERT INTO products (name, price, quantity, category_id) VALUES (?, ?, ?, ?)',
    [name, price, quantity, category_id]
  );
};
```

⚠️ **Nota importante sobre MySQL y TypeScript**

Cuando usamos `mysql2/promise`, los resultados de una consulta **no son objetos TypeScript puros**, sino filas que extienden internamente de `RowDataPacket`. Por este motivo **no podemos tipar directamente** `pool.query<Product[]>`.

La forma correcta y segura es **combinar nuestro modelo de dominio con `RowDataPacket`**.

Esto evita el uso de `any` y mantiene el tipado estricto.

Para ello, debemos crear una **interface** que **extienda** `RowDataPacket`.

```ts
import { RowDataPacket } from 'mysql2';

// Tipo específico para MySQL
export type ProductRow = Product & RowDataPacket;
```

📌 Esto le dice a TypeScript:

> “Es un Product, pero viene de MySQL”

luego ya podemos tipar correctamente `pool.query<ProductRow[]>`.

---

## 🧠 Service

El service trabaja con **interfaces**, no con objetos genéricos.

### 📄 `src/services/products.service.ts`

```ts
import * as productModel from '../models/products.model';
import { CreateProductDTO, Product } from '../models/products.model';

export const listProducts = async (): Promise<Product[]> => {
  return productModel.getAllProducts();
};

export const addProduct = async (data: CreateProductDTO): Promise<void> => {
  await productModel.createProduct(data);
};
```

---

## 🎮 Controller

El controller valida y **tipa explícitamente** los datos que recibe.

### 📄 `src/controllers/products.controller.ts`

```ts
import { Request, Response } from 'express';
import * as productService from '../services/products.service';
import { CreateProductDTO } from '../models/products.model';

export const showDashboard = async (req: Request, res: Response) => {
  const products = await productService.listProducts();
  res.render('products', { products });
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, quantity, category_id } = req.body;

  const newProduct: CreateProductDTO = {
    name,
    price: Number(price),
    quantity: Number(quantity),
    category_id: Number(category_id),
  };

  await productService.addProduct(newProduct);
  res
    .status(201)
    .json({ success: true, message: 'Producto creado correctamente' });
};
```

---

## 🧭 Routing

### 📄 `src/routes/products.routes.ts`

```ts
import { Router } from 'express';
import {
  showDashboard,
  createProduct,
} from '../controllers/products.controller';

const router = Router();

router.get('/', showDashboard);
router.post('/create', createProduct);

export default router;
```

---

## 🔗 Integración en `index.ts`

```ts
import productsRouter from './routes/products.routes';

app.use('/products', productsRouter);
```

---

## 🎨 Dashboard con Handlebars + Bootstrap

### 📄 `src/views/products.handlebars`

```handlebars
<link
  href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
  rel='stylesheet'
/>

<div class='container mt-4'>
  <h1>Stock de Productos</h1>

  <form id='product-form' class='row g-3 mb-4'>
    <input name='name' class='form-control' placeholder='Nombre' />
    <input
      name='price'
      type='number'
      step='0.01'
      class='form-control'
      placeholder='Precio'
    />
    <input
      name='quantity'
      type='number'
      class='form-control'
      placeholder='Cantidad'
    />
    <input
      name='category_id'
      type='number'
      class='form-control'
      placeholder='Categoría'
    />
    <button class='btn btn-primary'>Agregar</button>
  </form>

  <table class='table table-bordered'>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th>Categoría</th>
      </tr>
    </thead>
    <tbody>
      {{#each products}}
        <tr>
          <td>{{name}}</td>
          <td>{{price}}</td>
          <td>{{quantity}}</td>
          <td>{{category}}</td>
        </tr>
      {{/each}}
    </tbody>
  </table>
</div>

<script>
  const form = document.getElementById('product-form');
  form.addEventListener('submit', async (event) => { event.preventDefault(); //
  ⛔ evita el redirect const formData = new FormData(form); const data =
  Object.fromEntries(formData.entries()); const response = await
  fetch('/products/create', { method: 'POST', headers: { 'Content-Type':
  'application/json' }, body: JSON.stringify(data) }); if (response.ok) {
  alert('Producto agregado correctamente'); window.location.reload(); // simple,
  luego se puede mejorar } else { alert('Error al agregar producto'); } });
</script>
```

---

## 🛡️ Seguridad: Prevención de SQL Injection

### ❓ ¿Qué es SQL Injection?

Es una técnica de ataque donde un usuario malicioso intenta modificar una consulta SQL enviando código inesperado desde un formulario o request.

Ejemplo peligroso:

```sql
SELECT * FROM products WHERE name = '" + userInput + "';
```

---

### ✅ Cómo lo prevenimos

En este proyecto usamos **consultas parametrizadas**:

```ts
await pool.query(
  'INSERT INTO products (name, price, quantity, category_id) VALUES (?, ?, ?, ?)',
  [name, price, quantity, category_id]
);
```

Esto garantiza que:

- Los valores se tratan como datos
- No se ejecuta código SQL inyectado

---

## 🧰 Buenas prácticas de seguridad

- ✔️ Usar **interfaces y DTOs** para tipar datos
- ✔️ Evitar completamente `any`
- ✔️ Convertir tipos explícitamente (`Number()`)
- ✔️ Validar datos antes de persistir
- ✔️ Usar siempre **queries parametrizadas**
- ✔️ Nunca concatenar strings SQL
- ✔️ Usar usuarios MySQL con permisos limitados
- ✔️ Guardar credenciales en `.env`
- ✔️ Manejar errores sin exponer detalles internos

---

## 🏠 Tarea para la Próxima Clase

### ✅ Ejercicio

1. Agregar editar y eliminar productos
2. Reemplazar input de categoría por un select dinámico
3. Validar datos antes de insertar
4. Manejar errores de base de datos

---

## 🎉 ¡Persistencia Real!

Excelente trabajo. Ahora tu backend utiliza una base de datos relacional real, aplica MVC completo y expone un dashboard funcional. En la próxima clase avanzaremos con **Autenticacion, validaciones y seguridad**.

---

_📧 **Contacto:** Ante dudas sobre MySQL o consultas SQL, consultá durante la clase o por los canales habituales._
