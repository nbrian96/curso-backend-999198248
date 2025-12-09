/* ------------------------------------------------------------------
   Demo: Tipos de JOIN en SQL
   Compatible con MySQL 8+ y PostgreSQL 14+
------------------------------------------------------------------ */

DROP TABLE IF EXISTS envios;
DROP TABLE IF EXISTS pagos;
DROP TABLE IF EXISTS pedido_detalle;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS clientes;

CREATE TABLE clientes (
  id          INT PRIMARY KEY,
  nombre      VARCHAR(100) NOT NULL,
  ciudad      VARCHAR(80),
  activo      BOOLEAN DEFAULT TRUE
);

CREATE TABLE productos (
  id          INT PRIMARY KEY,
  nombre      VARCHAR(120) NOT NULL,
  categoria   VARCHAR(80)  NOT NULL,
  precio      DECIMAL(10,2) NOT NULL
);

CREATE TABLE pedidos (
  id            INT PRIMARY KEY,
  cliente_id    INT NOT NULL,
  fecha         DATE NOT NULL,
  total         DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE pedido_detalle (
  pedido_id   INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad    INT NOT NULL,
  precio_unit DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (pedido_id, producto_id),
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);

CREATE TABLE pagos (
  id          INT PRIMARY KEY,
  pedido_id   INT UNIQUE,
  metodo      VARCHAR(40),
  monto       DECIMAL(10,2),
  fecha       DATE,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

CREATE TABLE envios (
  id          INT PRIMARY KEY,
  pedido_id   INT UNIQUE,
  empresa     VARCHAR(80),
  estado      VARCHAR(40),
  fecha_envio DATE,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
);

/* ---------------------------
   Datos de ejemplo
---------------------------- */

INSERT INTO clientes (id, nombre, ciudad, activo) VALUES
  (1, 'Alicia Torres',   'Buenos Aires', TRUE),
  (2, 'Bruno Díaz',      'Córdoba',      TRUE),
  (3, 'Carla Vivas',     'Mendoza',      TRUE),
  (4, 'Diego Paredes',   'Rosario',      FALSE),
  (5, 'Esteban Rivero',  'La Plata',     TRUE);

INSERT INTO productos (id, nombre, categoria, precio) VALUES
  (101, 'Teclado Mecánico', 'Periféricos', 85.00),
  (102, 'Mouse Inalámbrico','Periféricos', 35.00),
  (103, 'Monitor 27"',       'Displays',   320.00);

INSERT INTO pedidos (id, cliente_id, fecha, total) VALUES
  (9001, 1, '2025-02-10', 405.00),
  (9002, 1, '2025-02-12', 120.00),
  (9003, 2, '2025-02-15', 320.00),
  (9004, 4, '2025-02-18', 85.00);

INSERT INTO pedido_detalle (pedido_id, producto_id, cantidad, precio_unit) VALUES
  (9001, 101, 3, 80.00),
  (9001, 102, 1, 25.00),
  (9002, 103, 1, 120.00),
  (9003, 103, 1, 320.00),
  (9004, 101, 1, 85.00);

INSERT INTO pagos (id, pedido_id, metodo, monto, fecha) VALUES
  (5001, 9001, 'Tarjeta', 405.00, '2025-02-10'),
  (5002, 9002, 'Transferencia', 120.00, '2025-02-12');
-- Nota: pedidos 9003 y 9004 aún no tienen pago registrado

INSERT INTO envios (id, pedido_id, empresa, estado, fecha_envio) VALUES
  (7001, 9001, 'ShipNow', 'Entregado', '2025-02-11'),
  (7002, 9003, 'ExpressAR', 'En tránsito', '2025-02-16');
-- Nota: pedidos 9002 y 9004 no tienen envío asociado

/* ---------------------------
   1. INNER JOIN
   Muestra solo coincidencias exactas
---------------------------- */
SELECT c.nombre, p.id AS pedido_id, p.total
FROM clientes c
INNER JOIN pedidos p ON p.cliente_id = c.id
ORDER BY c.nombre;

/* ---------------------------
   2. LEFT JOIN
   Clientes con o sin pedidos
---------------------------- */
SELECT c.nombre, p.id AS pedido_id, p.total
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.id
ORDER BY c.id, p.id;

/* ---------------------------
   3. RIGHT JOIN
   Todos los pedidos y sus clientes (algunos motores)
---------------------------- */
SELECT c.nombre, p.id AS pedido_id, p.total
FROM clientes c
RIGHT JOIN pedidos p ON p.cliente_id = c.id
ORDER BY p.id;

/* ---------------------------
   4. FULL OUTER JOIN
   PostgreSQL: palabra clave directa
   MySQL: se emula con UNION de LEFT y RIGHT
---------------------------- */
-- PostgreSQL:
-- SELECT c.nombre, p.id AS pedido_id, p.total
-- FROM clientes c
-- FULL OUTER JOIN pedidos p ON p.cliente_id = c.id;

-- MySQL equivalente:
SELECT c.nombre, p.id AS pedido_id, p.total
FROM clientes c
LEFT JOIN pedidos p ON p.cliente_id = c.id
UNION
SELECT c.nombre, p.id AS pedido_id, p.total
FROM clientes c
RIGHT JOIN pedidos p ON p.cliente_id = c.id;

/* ---------------------------
   5. JOIN con múltiples tablas
---------------------------- */
SELECT
  p.id           AS pedido_id,
  c.nombre       AS cliente,
  SUM(d.cantidad * d.precio_unit) AS subtotal,
  pg.metodo      AS metodo_pago,
  e.estado       AS estado_envio
FROM pedidos p
LEFT JOIN clientes c       ON c.id = p.cliente_id
LEFT JOIN pedido_detalle d ON d.pedido_id = p.id
LEFT JOIN pagos pg         ON pg.pedido_id = p.id
LEFT JOIN envios e         ON e.pedido_id = p.id
GROUP BY p.id, c.nombre, pg.metodo, e.estado
ORDER BY p.id;

/* ---------------------------
   6. CROSS JOIN / producto cartesiano
---------------------------- */
SELECT c.nombre AS cliente, prod.nombre AS producto
FROM clientes c
CROSS JOIN productos prod
WHERE c.id <= 2 AND prod.categoria = 'Periféricos';

/* ---------------------------
   7. LEFT JOIN + HAVING: identificar pedidos sin pago
---------------------------- */
SELECT p.id, c.nombre, COALESCE(pg.id, 'SIN PAGO') AS pago
FROM pedidos p
LEFT JOIN clientes c ON c.id = p.cliente_id
LEFT JOIN pagos pg ON pg.pedido_id = p.id
WHERE pg.id IS NULL;

