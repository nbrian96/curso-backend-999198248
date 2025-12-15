-- 1.​ Eliminar una mascota (por ID o nombre).​
-- 2.​ Verificar que se eliminen automáticamente los registros del historial clínico asociados
-- (ON DELETE CASCADE).​

DELETE FROM mascotas
	WHERE nombre='Max';