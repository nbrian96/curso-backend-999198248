-- Realizar las siguientes actualizaciones:
-- ​ Cambiar la dirección de un dueño (por ID o nombre).​
--  Actualizar la especialidad de un veterinario (por ID o matrícula).​
-- ​ Editar la descripción de un historial clínico (por ID).​

UPDATE duenos SET direccion = 'Av SiempreViva 456' WHERE id = 1;
UPDATE veterinarios SET especialidad = 'Neurología' WHERE matricula = 'CTR-1234567890';
UPDATE historial_clinico SET descripcion = 'Firulais tiene una catarata' WHERE id = 1;
