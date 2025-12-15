-- Consulta que muestre todas las entradas del historial clínico con:
-- Nombre y especie de la mascota​
-- Nombre completo del dueño​
-- Nombre completo del veterinario​
-- Fecha de registro​
-- Descripción​

select CONCAT(m.nombre, ' | ', m.especie) as 'mascota',
    CONCAT(d.nombre, ', ', d.apellido) as 'dueno',
    CONCAT(v.nombre, ', ', v.apellido) as 'veterinario',
    hc.fecha_registro,
    hc.descripcion
from historial_clinico hc
    join mascotas m on m.id = hc.id_mascota
    join duenos d on d.id = m.id_dueno
    join veterinarios v on v.id = hc.id_veterinario
order by hc.fecha_registro desc;