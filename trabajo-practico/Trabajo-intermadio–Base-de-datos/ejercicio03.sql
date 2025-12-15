-- Crear la tabla mascotas
CREATE TABLE mascotas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    especie VARCHAR(30) NOT NULL,
    fecha_nacimiento DATE,
    id_dueno INT(11) NOT NULL,
    CONSTRAINT fk_mascotas_duenos
        FOREIGN KEY (id_dueno) REFERENCES duenos(id)
        ON DELETE CASCADE
);