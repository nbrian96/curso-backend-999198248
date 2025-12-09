-- ------------------------------------------------------------
-- Script SQL para los ejercicios de Clase 7: Modelado de Datos
-- Contiene dos esquemas:
--   1) Sistema de Biblioteca
--   2) Sistema de E-commerce
-- Ejecuta cada bloque de forma independiente según lo necesites.
-- ------------------------------------------------------------

/* =========================
   EJERCICIO 1: BIBLIOTECA
   ========================= */

DROP DATABASE IF EXISTS clase7_biblioteca;
CREATE DATABASE clase7_biblioteca;
USE clase7_biblioteca;

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    apellido VARCHAR(80) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    telefono VARCHAR(30)
);

CREATE TABLE libros (
    isbn CHAR(13) PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    autor_principal VARCHAR(120) NOT NULL,
    anio_publicacion YEAR NOT NULL,
    categoria VARCHAR(80) NOT NULL
);

CREATE TABLE prestamos (
    id_prestamo INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    isbn CHAR(13) NOT NULL,
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion DATE,
    CONSTRAINT fk_prestamo_usuario
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
    CONSTRAINT fk_prestamo_libro
        FOREIGN KEY (isbn) REFERENCES libros (isbn)
);

CREATE TABLE autores (
    id_autor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    apellido VARCHAR(80) NOT NULL,
    nacionalidad VARCHAR(60)
);

CREATE TABLE libro_autor (
    isbn CHAR(13) NOT NULL,
    id_autor INT NOT NULL,
    orden_autoria TINYINT UNSIGNED DEFAULT 1,
    PRIMARY KEY (isbn, id_autor),
    CONSTRAINT fk_libro_autor_libro
        FOREIGN KEY (isbn) REFERENCES libros (isbn),
    CONSTRAINT fk_libro_autor_autor
        FOREIGN KEY (id_autor) REFERENCES autores (id_autor)
);

-- Datos de ejemplo
INSERT INTO usuarios (nombre, apellido, email, telefono) VALUES
('Ana', 'Martínez', 'ana@example.com', '555-1111'),
('Luis', 'Pérez', 'luis@example.com', '555-2222');

INSERT INTO libros (isbn, titulo, autor_principal, anio_publicacion, categoria) VALUES
('9780307474278', 'El Nombre del Viento', 'Patrick Rothfuss', 2007, 'Fantasía'),
('9780143127741', 'El Marciano', 'Andy Weir', 2011, 'Ciencia Ficción');

INSERT INTO autores (nombre, apellido, nacionalidad) VALUES
('Patrick', 'Rothfuss', 'Estados Unidos'),
('Andy', 'Weir', 'Estados Unidos');

INSERT INTO libro_autor (isbn, id_autor, orden_autoria) VALUES
('9780307474278', 1, 1),
('9780143127741', 2, 1);

INSERT INTO prestamos (id_usuario, isbn, fecha_prestamo, fecha_devolucion) VALUES
(1, '9780307474278', '2025-11-10', '2025-11-20'),
(2, '9780143127741', '2025-11-15', NULL);


/* ===========================
   EJERCICIO 2: E-COMMERCE
   =========================== */

DROP DATABASE IF EXISTS clase7_ecommerce;
CREATE DATABASE clase7_ecommerce;
USE clase7_ecommerce;

CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    direccion VARCHAR(200),
    telefono VARCHAR(30)
);

CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    descripcion VARCHAR(200)
);

CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    id_categoria INT NOT NULL,
    CONSTRAINT fk_producto_categoria
        FOREIGN KEY (id_categoria) REFERENCES categorias (id_categoria)
);

CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    fecha DATE NOT NULL,
    total DECIMAL(12,2) NOT NULL CHECK (total >= 0),
    estado ENUM('pendiente','pagado','enviado','cancelado') NOT NULL DEFAULT 'pendiente',
    CONSTRAINT fk_pedido_cliente
        FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente)
);

CREATE TABLE detalles_pedido (
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL CHECK (precio_unitario >= 0),
    subtotal DECIMAL(12,2) AS (cantidad * precio_unitario) STORED,
    PRIMARY KEY (id_pedido, id_producto),
    CONSTRAINT fk_detalle_pedido
        FOREIGN KEY (id_pedido) REFERENCES pedidos (id_pedido)
        ON DELETE CASCADE,
    CONSTRAINT fk_detalle_producto
        FOREIGN KEY (id_producto) REFERENCES productos (id_producto)
);

-- Datos de ejemplo
INSERT INTO clientes (nombre, email, direccion, telefono) VALUES
('María López', 'maria@example.com', 'Calle 123', '555-3333'),
('Carlos Ruiz', 'carlos@example.com', 'Avenida 456', '555-4444');

INSERT INTO categorias (nombre, descripcion) VALUES
('Tecnología', 'Dispositivos electrónicos y accesorios'),
('Hogar', 'Productos para el hogar');

INSERT INTO productos (nombre, descripcion, precio, stock, id_categoria) VALUES
('Laptop Pro 14"', 'Equipo portátil para trabajo profesional', 1500.00, 10, 1),
('Aspiradora Eco', 'Aspiradora eficiente energéticamente', 200.00, 25, 2);

INSERT INTO pedidos (id_cliente, fecha, total, estado) VALUES
(1, '2025-11-18', 1700.00, 'pagado'),
(2, '2025-11-19', 400.00, 'pendiente');

INSERT INTO detalles_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES
(1, 1, 1, 1500.00),
(1, 2, 1, 200.00),
(2, 2, 2, 200.00);


