-- Consulta que muestre:
-- Nombre de la mascota​
-- Especie
--​ Nombre completo del dueño (nombre + apellido)​

select m.nombre as 'nombre_mascota',
    m.especie,
    CONCAT(d.nombre, ', ', d.apellido) as 'nombre_dueno'
from duenos d
    join mascotas m on m.id_dueno = d.id;