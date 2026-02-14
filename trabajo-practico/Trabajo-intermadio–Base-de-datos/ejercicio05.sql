-- Crear la tabla historial_clinico
CREATE TABLE historial_clinico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_mascota INT NOT NULL,
    id_veterinario INT NOT NULL,
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    descripcion TEXT NOT NULL,
    activo TINYINT(1) DEFAULT 1,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_historial_mascota
        FOREIGN KEY (id_mascota) REFERENCES mascotas(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_historial_veterinario
        FOREIGN KEY (id_veterinario) REFERENCES veterinarios(id)
        ON DELETE RESTRICT
);
