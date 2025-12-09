# 📖 Clase 7: Consultas SQL y Cardinalidad Relacional

## 🎯 Objetivos de la Clase

- Repasar las cláusulas principales de SQL para construir consultas legibles y mantenibles
- Aplicar operadores y condicionales para filtrar conjuntos de datos con precisión
- Utilizar funciones de agregación para obtener métricas relevantes del negocio
- Seleccionar el tipo de JOIN adecuado según la relación entre tablas
- Interpretar y modelar cardinalidades para garantizar integridad referencial

---

## 📚 ¿Qué es el Análisis de Consultas SQL?

### 🔍 Definición

**El análisis de consultas SQL** es el proceso de componer, optimizar y validar sentencias SQL que combinan múltiples cláusulas, operadores y funciones con el objetivo de extraer información consistente de bases de datos relacionales respetando la cardinalidad definida entre tablas.

### 🏗️ Características Principales

- **Lenguaje declarativo:** describe qué datos se necesitan sin detallar cómo obtenerlos
- **Composición modular:** cada cláusula (SELECT, FROM, WHERE, GROUP BY, etc.) aporta responsabilidades claras
- **Tipado relacional:** depende de la estructura de tablas, llaves y cardinalidades
- **Portabilidad:** la sintaxis base se mantiene entre motores como MySQL, PostgreSQL o SQL Server

### 📖 Historia Breve

- **1970:** Edgar F. Codd publica el modelo relacional que inspira el lenguaje de consultas
- **1974:** IBM desarrolla SEQUEL, precursor directo de SQL
- **1986:** ANSI estandariza SQL como lenguaje oficial para bases de datos relacionales
- **1992:** Surge SQL-92, incorporando JOIN explícitos y subconsultas avanzadas
- **Actualidad:** SQL continúa como estándar y convive con extensiones para analítica, JSON y funciones ventana

---

## 🏛️ Fundamentos de Consultas SQL

### 📝 Cláusulas Principales

Las cláusulas definen etapas de la consulta. El orden lógico de evaluación difiere del orden de escritura, lo cual es clave para depurar.

```sql
SELECT u.nombre, COUNT(p.id) AS pedidos
FROM usuarios AS u
LEFT JOIN pedidos AS p ON p.usuario_id = u.id
WHERE u.activo = TRUE
GROUP BY u.nombre
HAVING COUNT(p.id) >= 3
ORDER BY pedidos DESC
LIMIT 5 OFFSET 0;
```

> Orden de ejecución lógico: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.

### 📝 Operadores y Condicionales

Permiten construir filtros complejos combinando comparaciones (`=`, `<`, `>`, `BETWEEN`, `LIKE`) y operadores lógicos (`AND`, `OR`, `NOT`).

```sql
SELECT producto, precio, stock
FROM inventario
WHERE stock > 0
  AND precio BETWEEN 10 AND 100
  AND (categoria = 'Hardware' OR proveedor LIKE 'Tech%')
  AND fecha_ingreso >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);
```

### 📝 Funciones de Agregación

`COUNT`, `SUM`, `AVG`, `MIN`, `MAX` y funciones ventana permiten resumir datos.

```sql
SELECT
  categoria,
  COUNT(*) AS total_items,
  SUM(stock) AS unidades_disponibles,
  ROUND(AVG(precio), 2) AS precio_promedio,
  MAX(precio) AS precio_maximo
FROM inventario
GROUP BY categoria;
```

Para comparaciones intra-grupo:

```sql
SELECT
  categoria,
  producto,
  stock,
  SUM(stock) OVER (PARTITION BY categoria) AS stock_total_categoria
FROM inventario;
```

### 📝 Tipos de JOIN

Joins combinan tablas según columnas relacionadas.

```sql
-- INNER JOIN: solo coincidencias
SELECT c.nombre, p.total
FROM clientes c
INNER JOIN pedidos p ON p.cliente_id = c.id;

-- LEFT JOIN: todos los clientes, pedidos opcionales
SELECT c.nombre, p.total
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.id;

-- RIGHT JOIN: todos los pedidos aunque no tengan cliente (poco común)
SELECT c.nombre, p.total
FROM clientes c
RIGHT JOIN pedidos p ON p.cliente_id = c.id;

-- FULL OUTER JOIN: requiere motores como PostgreSQL
SELECT c.nombre, p.total
FROM clientes c
FULL OUTER JOIN pedidos p ON p.cliente_id = c.id;
```

---

## 🏗️ Cardinalidad y Diseño Relacional

### 📄 Cardinalidad y Diagramas

La cardinalidad describe cuántas veces una entidad puede relacionarse con otra. Comprenderla evita duplicidades o pérdidas de información.

| Relación | Notación             | Uso típico                     | Implementación                            |
| -------- | -------------------- | ------------------------------ | ----------------------------------------- |
| 1:1      | `Cliente ⇄ Perfil`   | Datos sensibles separados      | Clave única compartida o tabla secundaria |
| 1:N      | `Cliente ⇨ Pedido`   | Registro maestro-detalle       | Clave foránea en tabla hija               |
| N:M      | `Estudiante ⇄ Curso` | Modelar asociaciones flexibles | Tabla intermedia con dos FK               |

```sql
-- Ejemplo N:M con tabla puente
CREATE TABLE cursos (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(120) NOT NULL
);

CREATE TABLE estudiantes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL
);

CREATE TABLE inscripciones (
  estudiante_id INT REFERENCES estudiantes(id),
  curso_id INT REFERENCES cursos(id),
  fecha DATE DEFAULT CURRENT_DATE,
  PRIMARY KEY (estudiante_id, curso_id)
);
```

### 📄 Diagnóstico de Cardinalidad en Consultas

```sql
SELECT c.id, c.nombre, COUNT(p.id) AS pedidos
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.id
GROUP BY c.id, c.nombre
HAVING COUNT(p.id) = 0;
```

Esta consulta detecta clientes sin pedidos para validar que la cardinalidad 1:N se respeta (clientes sin hijos son válidos, pero deben analizarse). Si esperas relación obligatoria, la condición `HAVING COUNT(p.id) = 0` debería arrojar cero filas.

---

## 🚀 Ejercicio Práctico

### 📝 Dashboard de Ventas Mensuales

Construye una consulta que entregue métricas clave por mes.

```sql
WITH ventas_mensuales AS (
  SELECT
    DATE_FORMAT(fecha, '%Y-%m') AS periodo,
    categoria,
    SUM(total) AS monto,
    COUNT(*) AS pedidos,
    COUNT(DISTINCT cliente_id) AS clientes_activos
  FROM pedidos
  GROUP BY periodo, categoria
)
SELECT
  periodo,
  categoria,
  monto,
  pedidos,
  clientes_activos,
  ROUND(monto / NULLIF(pedidos, 0), 2) AS ticket_promedio,
  SUM(monto) OVER (PARTITION BY periodo) AS ingreso_total_periodo
FROM ventas_mensuales
ORDER BY periodo DESC, categoria;
```

---

## 🏠 Tarea para la Próxima Clase

### ✅ Ejercicio:

Diseña una mini base de datos para un servicio de suscripciones digitales y entrega:

1. **Modelo conceptual:** entidades, atributos y cardinalidades (diagrama ER)
2. **Diccionario de datos:** tipos y restricciones por columna
3. **Script DDL:** creación de tablas con claves primarias y foráneas
4. **Dataset inicial:** al menos 10 inserciones por tabla
5. **Consultas clave:** SELECT con cláusulas principales y filtros complejos
6. **Reporte agregado:** uso de funciones de agregación y `HAVING`
7. **Validación de cardinalidad:** consulta que detecte registros huérfanos

**Requisitos técnicos:**

- Entregar archivos `.sql` separados (DDL, inserts, consultas)
- Uso consistente de `snake_case` en nombres de columnas y tablas
- Incluir comentarios `--` explicativos en los scripts
- Compatible con MySQL 8+ o PostgreSQL 14+

---

## 📚 Recursos Adicionales

### 🔗 Enlaces Útiles

- [SQL Style Guide](https://www.sqlstyle.guide) - Mejores prácticas de formateo y nomenclatura
- [Mode SQL Tutorial](https://mode.com/sql-tutorial/) - Guía interactiva con ejercicios
- [Use The Index, Luke](https://use-the-index-luke.com/) - Optimización basada en cardinalidad
- [PostgreSQL Docs - JOIN](https://www.postgresql.org/docs/current/queries-table-expressions.html) - Referencia oficial sobre combinaciones de tablas

### 📖 Conceptos para Investigar

- **Funciones ventana** cómo `ROW_NUMBER` o `RANK` para analítica avanzada
- **Subconsultas correlacionadas** cuando el filtro depende de la fila actual
- **Plan de ejecución** para verificar costo estimado y cardinalidad esperada
- **Normalización** (1FN, 2FN, 3FN) como base del diseño relacional

---

## ❓ Preguntas Frecuentes

### ¿Qué cláusula debo optimizar primero?

- **FROM/JOIN:** garantizan la cardinalidad correcta antes de filtrar
- **WHERE:** reduce filas cuanto antes para bajar costos
- **SELECT:** evita traer columnas innecesarias
- **ORDER BY/LIMIT:** se optimizan con índices que respeten el mismo orden

### ¿Cómo decido entre INNER y LEFT JOIN?

- **INNER JOIN:** cuando solo importan registros con coincidencia en ambas tablas
- **LEFT JOIN:** cuando la tabla principal debe conservar todas sus filas
- **Verifica cardinalidad:** si el lado opcional no es obligatorio, usa LEFT
- **Monitorea nulos:** un LEFT JOIN puede generar columnas nulas que debes manejar

### ¿Qué hacer si una función de agregación devuelve NULL?

- **COALESCE:** reemplaza valores nulos (`COALESCE(SUM(monto), 0)`)
- **Filtros previos:** asegúrate de que `WHERE` no elimine todas las filas del grupo
- **HAVING vs WHERE:** `HAVING` opera después de agregar; úsalo para reglas sobre los totales
- **Valores por defecto:** define defaults en tablas para evitar datos faltantes

---

## 🎉 ¡SQL Intermedio Dominado!

Ya conoces las cláusulas principales, operadores, funciones de agregación, tipos de JOIN y cómo la cardinalidad guía el diseño relacional. En la próxima clase profundizaremos en la práctica intensiva de MySQL con índices, subconsultas y optimización de desempeño.

**Recuerda:** documenta tus consultas, crea vistas reutilizables y valida siempre la cardinalidad esperada en tus resultados. ¡A practicar en tu motor favorito! 🚀

---

_📧 **Contacto:** Si tienes dudas sobre consultas SQL y cardinalidad, no dudes en consultar durante la clase o por los canales de comunicación establecidos._
