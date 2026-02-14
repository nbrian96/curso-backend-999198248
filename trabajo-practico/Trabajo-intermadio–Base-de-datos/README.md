# Trabajo Práctico - MySQL Veterinaria "Patitas Felices"

Este proyecto contiene un sistema de base de datos para la gestión de una veterinaria, incluyendo el manejo de dueños, mascotas, veterinarios e historial clínico.

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Orden de Ejecución](#orden-de-ejecución)
- [Descripción de Archivos](#descripción-de-archivos)
- [Características Implementadas](#características-implementadas)
- [Instrucciones de Ejecución](#instrucciones-de-ejecución)
- [Estructura de la Base de Datos](#estructura-de-la-base-de-datos)

## 🔧 Requisitos Previos

- MySQL 5.7 o superior (recomendado MySQL 8.0+)
- Cliente MySQL (mysql CLI, MySQL Workbench, phpMyAdmin, etc.)
- Permisos para crear bases de datos y tablas

## 📁 Estructura del Proyecto

```
tp-mysql-nelson-avila/
├── ejercicio01.sql  # Creación de la base de datos
├── ejercicio02.sql  # Tabla: duenos
├── ejercicio03.sql  # Tabla: mascotas
├── ejercicio04.sql  # Tabla: veterinarios
├── ejercicio05.sql  # Tabla: historial_clinico
├── ejercicio06.sql  # Inserción de datos de prueba
├── ejercicio07.sql  # Actualizaciones de registros
├── ejercicio08.sql  # Eliminación de registros
├── ejercicio09.sql  # Consulta: Mascotas con dueños
├── ejercicio10.sql  # Consulta: Historial clínico completo
└── README.md        # Este archivo
```

## ⚡ Orden de Ejecución

**IMPORTANTE:** Los archivos deben ejecutarse en el orden numérico indicado, ya que existen dependencias entre las tablas (claves foráneas).

1. **ejercicio01.sql** - Crear la base de datos
2. **ejercicio02.sql** - Crear tabla `duenos`
3. **ejercicio03.sql** - Crear tabla `mascotas` (depende de `duenos`)
4. **ejercicio04.sql** - Crear tabla `veterinarios`
5. **ejercicio05.sql** - Crear tabla `historial_clinico` (depende de `mascotas` y `veterinarios`)
6. **ejercicio06.sql** - Insertar datos de prueba
7. **ejercicio07.sql** - Realizar actualizaciones
8. **ejercicio08.sql** - Realizar eliminaciones
9. **ejercicio09.sql** - Consulta de mascotas con dueños
10. **ejercicio10.sql** - Consulta de historial clínico completo

## 📝 Descripción de Archivos

### ejercicio01.sql
**Objetivo:** Crear la base de datos del sistema.

- Crea la base de datos `veterinaria_patitas_felices` si no existe
- Configura el charset a `utf8mb4` y collation `utf8mb4_unicode_ci` para soporte completo de caracteres Unicode
- Selecciona la base de datos para uso posterior

### ejercicio02.sql
**Objetivo:** Crear la tabla de dueños de mascotas.

**Campos:**
- `id`: Identificador único autoincremental (clave primaria)
- `nombre`: Nombre del dueño (máximo 50 caracteres, obligatorio)
- `apellido`: Apellido del dueño (máximo 50 caracteres, obligatorio)
- `telefono`: Teléfono de contacto (máximo 20 caracteres, obligatorio)
- `direccion`: Dirección del dueño (máximo 100 caracteres, opcional)
- `activo`: Campo para borrado lógico (TINYINT, valor por defecto: 1)
- `created_at`: Timestamp de creación (se establece automáticamente)
- `updated_at`: Timestamp de última actualización (se actualiza automáticamente)

### ejercicio03.sql
**Objetivo:** Crear la tabla de mascotas.

**Campos:**
- `id`: Identificador único autoincremental (clave primaria)
- `nombre`: Nombre de la mascota (máximo 50 caracteres, obligatorio)
- `especie`: Especie de la mascota (máximo 30 caracteres, obligatorio)
- `fecha_nacimiento`: Fecha de nacimiento (tipo DATE, opcional)
- `id_dueno`: Referencia al dueño (clave foránea, obligatorio)
- `activo`: Campo para borrado lógico (TINYINT, valor por defecto: 1)
- `created_at`: Timestamp de creación
- `updated_at`: Timestamp de última actualización

**Relaciones:**
- Clave foránea hacia `duenos(id)` con `ON DELETE CASCADE` (si se elimina un dueño, se eliminan sus mascotas)

### ejercicio04.sql
**Objetivo:** Crear la tabla de veterinarios.

**Campos:**
- `id`: Identificador único autoincremental (clave primaria)
- `nombre`: Nombre del veterinario (máximo 50 caracteres, obligatorio)
- `apellido`: Apellido del veterinario (máximo 50 caracteres, obligatorio)
- `matricula`: Matrícula profesional (máximo 20 caracteres, único y obligatorio)
- `especialidad`: Especialidad del veterinario (máximo 50 caracteres, obligatorio)
- `activo`: Campo para borrado lógico (TINYINT, valor por defecto: 1)
- `created_at`: Timestamp de creación
- `updated_at`: Timestamp de última actualización

**Restricciones:**
- La matrícula debe ser única (constraint UNIQUE)

### ejercicio05.sql
**Objetivo:** Crear la tabla de historial clínico.

**Campos:**
- `id`: Identificador único autoincremental (clave primaria)
- `id_mascota`: Referencia a la mascota (clave foránea, obligatorio)
- `id_veterinario`: Referencia al veterinario (clave foránea, obligatorio)
- `fecha_registro`: Fecha y hora del registro (tipo DATETIME, valor por defecto: CURRENT_TIMESTAMP)
- `descripcion`: Descripción del registro clínico (tipo TEXT, obligatorio)
- `activo`: Campo para borrado lógico (TINYINT, valor por defecto: 1)
- `updated_at`: Timestamp de última actualización

**Relaciones:**
- Clave foránea hacia `mascotas(id)` con `ON DELETE CASCADE` (si se elimina una mascota, se eliminan sus registros clínicos)
- Clave foránea hacia `veterinarios(id)` con `ON DELETE RESTRICT` (no se puede eliminar un veterinario si tiene registros clínicos)

### ejercicio06.sql
**Objetivo:** Insertar datos de prueba en todas las tablas.

**Datos insertados:**
- **3 dueños:** Juan Perez, Naruto Uzumaki, Don Ramon
- **3 mascotas:** Firulais (Perro), Kurama (Zorro), Max (Gato)
- **2 veterinarios:** Ron Farland (Cardiología), Lucia Cannavacciuolo (Traumatología)
- **3 registros de historial clínico:** Uno para cada mascota

**Nota:** Este script debe ejecutarse después de crear todas las tablas, ya que inserta datos en todas ellas.

### ejercicio07.sql
**Objetivo:** Demostrar operaciones de actualización (UPDATE).

**Actualizaciones realizadas:**
1. Cambia la dirección del dueño con ID 1
2. Actualiza la especialidad del veterinario con matrícula 'CTR-1234567890' a 'Neurología'
3. Modifica la descripción del historial clínico con ID 1

### ejercicio08.sql
**Objetivo:** Demostrar eliminación de registros y el comportamiento de CASCADE.

**Operación:**
- Elimina la mascota llamada 'Max'

**Verificación:**
- Al eliminar la mascota, se eliminan automáticamente los registros del historial clínico asociados gracias a `ON DELETE CASCADE`

### ejercicio09.sql
**Objetivo:** Consulta que muestra información de mascotas con sus dueños.

**Resultado:**
- Nombre de la mascota
- Especie
- Nombre completo del dueño (formato: "nombre, apellido")

**Técnica:** Utiliza `INNER JOIN` para relacionar las tablas `mascotas` y `duenos`, y `CONCAT` para combinar nombre y apellido del dueño.

### ejercicio10.sql
**Objetivo:** Consulta completa del historial clínico con información relacionada.

**Resultado:**
- Mascota (nombre y especie combinados con formato "nombre | especie")
- Dueño (nombre completo)
- Veterinario (nombre completo)
- Fecha de registro
- Descripción del registro

**Técnica:** Utiliza múltiples `INNER JOIN` para relacionar `historial_clinico`, `mascotas`, `duenos` y `veterinarios`. Los resultados se ordenan por fecha de registro descendente (más recientes primero).

## ✨ Características Implementadas

### Borrado Lógico
Todas las tablas principales incluyen un campo `activo` de tipo `TINYINT(1)` con valor por defecto `1`:
- `1` = registro activo
- `0` = registro eliminado lógicamente

Esto permite "eliminar" registros sin borrarlos físicamente de la base de datos, manteniendo la integridad referencial y permitiendo auditorías.

**Ejemplo de uso:**
```sql
-- Marcar como inactivo (borrado lógico)
UPDATE duenos SET activo = 0 WHERE id = 1;

-- Consultar solo registros activos
SELECT * FROM duenos WHERE activo = 1;
```

### Timestamps Automáticos
Todas las tablas incluyen campos de auditoría:
- `created_at`: Se establece automáticamente al crear un registro
- `updated_at`: Se actualiza automáticamente cada vez que se modifica un registro

Esto permite rastrear cuándo se crearon y modificaron los registros sin intervención manual.

### Integridad Referencial
- **Claves foráneas:** Garantizan la consistencia de los datos
- **ON DELETE CASCADE:** En relaciones donde tiene sentido (mascotas-duenos, historial-mascotas)
- **ON DELETE RESTRICT:** En relaciones críticas (historial-veterinarios) para prevenir eliminaciones accidentales

## 🚀 Instrucciones de Ejecución

### Opción 1: Línea de comandos (MySQL CLI)

```bash
# Conectar a MySQL
mysql -u tu_usuario -p

# Ejecutar los scripts en orden
source /ruta/completa/ejercicio01.sql
source /ruta/completa/ejercicio02.sql
source /ruta/completa/ejercicio03.sql
source /ruta/completa/ejercicio04.sql
source /ruta/completa/ejercicio05.sql
source /ruta/completa/ejercicio06.sql
source /ruta/completa/ejercicio07.sql
source /ruta/completa/ejercicio08.sql
source /ruta/completa/ejercicio09.sql
source /ruta/completa/ejercicio10.sql
```

### Opción 2: Ejecutar desde archivo

```bash
mysql -u tu_usuario -p < ejercicio01.sql
mysql -u tu_usuario -p < ejercicio02.sql
# ... y así sucesivamente
```

### Opción 3: MySQL Workbench / phpMyAdmin

1. Abre cada archivo `.sql` en tu cliente MySQL
2. Ejecuta los scripts en orden numérico (ejercicio01.sql, ejercicio02.sql, etc.)
3. Verifica que cada script se ejecute correctamente antes de continuar

### Opción 4: Ejecutar todos los scripts de una vez

```bash
# Desde el directorio del proyecto
for file in ejercicio*.sql; do
    echo "Ejecutando $file..."
    mysql -u tu_usuario -p veterinaria_patitas_felices < "$file"
done
```

**Nota:** Reemplaza `tu_usuario` con tu usuario de MySQL. Se te pedirá la contraseña.

## 🗄️ Estructura de la Base de Datos

```
veterinaria_patitas_felices
│
├── duenos
│   ├── id (PK)
│   ├── nombre
│   ├── apellido
│   ├── telefono
│   ├── direccion
│   ├── activo
│   ├── created_at
│   └── updated_at
│
├── mascotas
│   ├── id (PK)
│   ├── nombre
│   ├── especie
│   ├── fecha_nacimiento
│   ├── id_dueno (FK → duenos.id)
│   ├── activo
│   ├── created_at
│   └── updated_at
│
├── veterinarios
│   ├── id (PK)
│   ├── nombre
│   ├── apellido
│   ├── matricula (UNIQUE)
│   ├── especialidad
│   ├── activo
│   ├── created_at
│   └── updated_at
│
└── historial_clinico
    ├── id (PK)
    ├── id_mascota (FK → mascotas.id)
    ├── id_veterinario (FK → veterinarios.id)
    ├── fecha_registro
    ├── descripcion
    ├── activo
    └── updated_at
```

## ⚠️ Notas Importantes

1. **Orden de ejecución:** Es crítico ejecutar los scripts en orden numérico debido a las dependencias de claves foráneas.

2. **Re-ejecución:** Si necesitas re-ejecutar los scripts, primero elimina las tablas o la base de datos completa:
   ```sql
   DROP DATABASE IF EXISTS veterinaria_patitas_felices;
   ```

3. **Datos de prueba:** El script `ejercicio06.sql` inserta datos de ejemplo. Puedes modificarlos según tus necesidades.

4. **Borrado lógico:** Recuerda filtrar por `activo = 1` en tus consultas si solo quieres ver registros activos.

5. **Charset UTF-8:** La base de datos está configurada con `utf8mb4` para soportar caracteres especiales y emojis.

## 📚 Consultas Adicionales Recomendadas

### Consultar solo registros activos
```sql
SELECT * FROM duenos WHERE activo = 1;
SELECT * FROM mascotas WHERE activo = 1;
```

### Contar mascotas por dueño
```sql
SELECT d.nombre, d.apellido, COUNT(m.id) as total_mascotas
FROM duenos d
LEFT JOIN mascotas m ON d.id = m.id_dueno AND m.activo = 1
WHERE d.activo = 1
GROUP BY d.id, d.nombre, d.apellido;
```

### Historial clínico de una mascota específica
```sql
SELECT hc.fecha_registro, hc.descripcion, 
       CONCAT(v.nombre, ' ', v.apellido) as veterinario
FROM historial_clinico hc
JOIN veterinarios v ON hc.id_veterinario = v.id
WHERE hc.id_mascota = 1 AND hc.activo = 1
ORDER BY hc.fecha_registro DESC;
```

---

**Autor:** Nelson Avila  
**Proyecto:** Trabajo Práctico - MySQL Veterinaria "Patitas Felices"
