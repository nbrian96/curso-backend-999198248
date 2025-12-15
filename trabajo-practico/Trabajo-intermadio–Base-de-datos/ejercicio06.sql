-- Insertar:
-- 3 dueños con información completa​
-- 3 mascotas, cada una asociada a un dueño​
-- 2 veterinarios con especialidades distintas​
-- 3 registros de historial clínico​

INSERT INTO duenos (nombre, apellido, telefono, direccion)
VALUES ('Juan', 'Perez', '1145789632', 'Av False 123'),
    ('Naruto', 'Uzumaki', '1199789632', 'Konohagakure'),
    ('Don', 'Ramon', '1158789632', 'Av Mayo 1810');

INSERT INTO mascotas (nombre, especie, fecha_nacimiento, id_dueno)
VALUES ('Firulais', 'Perro', '2020-01-01', 1),
    ('Kurama', 'Zorro', '2020-01-01', 2),
    ('Max', 'Gato', '2020-01-01', 3);

INSERT INTO veterinarios (nombre, apellido, matricula, especialidad)
VALUES ('Ron', 'Farland', 'CDR-1234567890', 'Cardiología'),
    ('Lucia', 'Cannavacciuolo', 'CTR-1234567890', 'Traumatología');

INSERT INTO historial_clinico (id_mascota, id_veterinario, fecha_registro, descripcion)
VALUES (1, 1, '2025-01-01', 'Firulais tiene una cardiopatía'),
    (2, 1, '2025-01-01', 'Kurama tiene una nefritis'),
    (3, 2, '2025-01-01', 'Max tiene una fractura');