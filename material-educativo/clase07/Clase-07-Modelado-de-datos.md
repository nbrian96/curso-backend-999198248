# 📖 Clase 7: Modelado de Datos

## 🎯 Objetivos de la Clase

- Comprender los conceptos fundamentales del modelado de datos y su importancia en el diseño de bases de datos
- Aprender a identificar y representar entidades, atributos y relaciones en un diagrama entidad-relación (ER)
- Dominar los diferentes tipos de entidades (regulares y débiles) y sus características distintivas
- Entender los tipos de relaciones y la cardinalidad entre entidades
- Aplicar los conocimientos adquiridos creando un diagrama ER completo para un proyecto personal

---

## 📚 ¿Qué es el Modelado de Datos?

### 🔍 Definición

**El modelado de datos** es un proceso sistemático que consiste en diseñar la estructura de una base de datos de manera que represente de forma precisa y eficiente la información del mundo real. Este proceso utiliza herramientas gráficas y conceptuales para organizar los datos, definir las relaciones entre ellos y establecer las reglas que garantizan la integridad y consistencia de la información almacenada.

### 🏗️ Características Principales

- **Representación visual:** Utiliza diagramas (como el ER) para visualizar la estructura de datos de manera clara e intuitiva
- **Abstracción de la realidad:** Transforma conceptos del mundo real en estructuras de datos manejables por sistemas informáticos
- **Organización estructurada:** Define entidades, atributos y relaciones de forma jerárquica y lógica
- **Base para implementación:** Sirve como guía para la creación física de tablas, columnas y relaciones en sistemas de gestión de bases de datos

### 📖 Historia Breve

- **1976:** Peter Chen introduce el modelo entidad-relación (ER) como herramienta de modelado conceptual
- **1980s:** Se estandarizan las notaciones para diagramas ER (Chen, Crow's Foot, UML)
- **1990s:** Surgen herramientas CASE (Computer-Aided Software Engineering) que automatizan el diseño de bases de datos
- **2000s:** Se integran los modelos ER con metodologías de desarrollo ágil y diseño orientado a objetos
- **Actualidad:** Los diagramas ER siguen siendo fundamentales en el diseño de bases de datos relacionales y no relacionales

---

## 🏛️ Conceptos Fundamentales del Modelado de Datos

### 📝 Entidades

Una **entidad** es un objeto o concepto del mundo real que puede ser identificado de manera única y que tiene existencia independiente. Las entidades se representan como rectángulos en los diagramas ER.

**Tipos de entidades:**

- **Entidades regulares (fuertes):** Tienen existencia independiente y pueden identificarse por sus propios atributos
- **Entidades débiles:** Dependen de otra entidad para existir y no pueden identificarse completamente sin la entidad padre

**Ejemplo de entidades:**

```
┌─────────────┐         ┌─────────────┐
│   Cliente   │         │   Pedido    │
└─────────────┘         └─────────────┘
```

### 📝 Atributos

Los **atributos** son las propiedades o características que describen una entidad. Cada atributo tiene un nombre y un tipo de dato asociado.

**Tipos de atributos:**

- **Atributos simples:** No pueden dividirse en partes más pequeñas (ej: nombre, edad)
- **Atributos compuestos:** Pueden dividirse en sub-atributos (ej: dirección → calle, ciudad, código postal)
- **Atributos multivaluados:** Pueden tener múltiples valores para una misma entidad (ej: teléfonos de contacto)
- **Atributos derivados:** Se calculan a partir de otros atributos (ej: edad calculada desde fecha de nacimiento)
- **Atributos clave:** Identifican de manera única una instancia de la entidad (clave primaria)

**Ejemplo de atributos:**

```
┌─────────────┐
│   Cliente   │
├─────────────┤
│ id_cliente  │ (PK) - Clave primaria
│ nombre      │
│ apellido    │
│ email       │
│ telefono    │
└─────────────┘
```

### 📝 Relaciones

Una **relación** es una asociación entre dos o más entidades que representa una interacción o vínculo del mundo real. Se representan como rombos en los diagramas ER.

**Ejemplo de relación:**

```
┌─────────────┐         ┌─────────────┐
│   Cliente   │         │   Pedido    │
└──────┬──────┘         └──────┬──────┘
       │                       │
       │    ┌──────────┐       │
       └───▶│  realiza │◀──────┘
            └──────────┘
```

### 📝 Cardinalidad

La **cardinalidad** define cuántas instancias de una entidad pueden estar relacionadas con instancias de otra entidad. Es fundamental para entender la naturaleza de las relaciones.

**Tipos de cardinalidad:**

- **Uno a Uno (1:1):** Cada instancia de A se relaciona con una sola instancia de B
- **Uno a Muchos (1:N):** Una instancia de A se relaciona con múltiples instancias de B
- **Muchos a Muchos (N:M):** Múltiples instancias de A se relacionan con múltiples instancias de B

---

## 🏗️ Conceptos Avanzados

### 📄 Entidades Regulares vs Entidades Débiles

#### Entidades Regulares (Fuertes)

Las entidades regulares tienen una clave primaria propia y pueden existir independientemente.

**Características:**
- Tienen atributos que forman una clave primaria única
- No dependen de otras entidades para su identificación
- Se representan con un rectángulo simple

**Ejemplo:**

```
┌─────────────┐
│   Cliente   │
├─────────────┤
│ id_cliente  │ (PK)
│ nombre      │
│ email       │
└─────────────┘
```

#### Entidades Débiles

Las entidades débiles dependen de otra entidad (entidad fuerte) para existir y no pueden identificarse completamente sin ella.

**Características:**
- No tienen una clave primaria propia completa
- Dependen de la clave primaria de la entidad padre
- Se representan con un rectángulo de doble línea
- La relación con la entidad padre se llama "relación de identificación"

**Ejemplo:**

```
┌─────────────┐         ┌─────────────┐
│   Pedido    │         │  Detalle    │
│  (Fuerte)   │         │  (Débil)    │
├─────────────┤         ├─────────────┤
│ id_pedido   │(PK)     │ id_pedido   │(PK, FK)
│ fecha       │         │ num_linea   │(PK)
│ total       │         │ cantidad    │
└──────┬──────┘         │ precio      │
       │                └──────┬──────┘
       │    ┌──────────┐       │
       └───▶│ contiene │◀──────┘
            └──────────┘
```

### 📄 Tipos de Relaciones

#### Relación Uno a Uno (1:1)

Cada instancia de una entidad se relaciona con exactamente una instancia de la otra entidad.

**Ejemplo:** Una persona tiene un pasaporte, y un pasaporte pertenece a una persona.

```
┌─────────────┐         ┌─────────────┐
│   Persona   │   1     │  Pasaporte  │
│             │◀───────▶│             │
└─────────────┘         └─────────────┘
```

#### Relación Uno a Muchos (1:N)

Una instancia de una entidad se relaciona con múltiples instancias de la otra entidad.

**Ejemplo:** Un cliente realiza muchos pedidos, pero cada pedido pertenece a un solo cliente.

```
┌─────────────┐         ┌─────────────┐
│   Cliente   │   1     │   Pedido    │
│             │◀───────▶│             │
└─────────────┘    N    └─────────────┘
```

#### Relación Muchos a Muchos (N:M)

Múltiples instancias de una entidad se relacionan con múltiples instancias de la otra entidad.

**Ejemplo:** Un estudiante puede inscribirse en muchos cursos, y un curso puede tener muchos estudiantes.

```
┌─────────────┐         ┌─────────────┐
│  Estudiante │    N    │    Curso    │
│             │◀───────▶│             │
└─────────────┘    M    └─────────────┘
```

**Nota:** Las relaciones N:M generalmente requieren una entidad intermedia (tabla de unión) en la implementación física.

### 📄 Notaciones de Diagramas ER

Existen varias notaciones para representar diagramas ER. Las más comunes son:

#### Notación de Chen (Original)

- Entidades: Rectángulos
- Relaciones: Rombos
- Atributos: Óvalos
- Líneas conectan entidades con relaciones y atributos con entidades

#### Notación Crow's Foot (Pie de Cuervo)

- Entidades: Rectángulos con atributos dentro
- Relaciones: Líneas con símbolos en los extremos que indican cardinalidad
- Más compacta y común en herramientas modernas

**Símbolos de cardinalidad en Crow's Foot:**

```
│    = Uno (1)
│◄─── = Muchos (N)
○    = Cero (opcional)
```

---

## 🚀 Ejercicio Práctico

### 📝 Ejercicio 1: Modelado de Sistema de Biblioteca

**Enunciado:**

Diseña un diagrama ER para un sistema de biblioteca que debe gestionar:

- **Libros:** Cada libro tiene un ISBN único, título, autor, año de publicación y categoría
- **Usuarios:** Cada usuario tiene un ID único, nombre, apellido, email y teléfono
- **Préstamos:** Un usuario puede tomar prestados múltiples libros, y cada préstamo tiene una fecha de préstamo y fecha de devolución
- **Autores:** Un libro puede tener múltiples autores, y un autor puede escribir múltiples libros

**Solución:**

```
┌─────────────┐         ┌─────────────┐
│   Usuario   │         │   Libro     │
├─────────────┤         ├─────────────┤
│ id_usuario  │(PK)     │ isbn        │(PK)
│ nombre      │         │ titulo      │
│ apellido    │         │ año_pub     │
│ email       │         │ categoria   │
│ telefono    │         └──────┬──────┘
└──────┬──────┘                │
       │                       │
       │    ┌──────────┐       │
       │    │ Prestamo │       │
       └───▶│          │◀──────┘
            ├──────────┤
            │ id_prest │(PK)
            │ fecha_pre│
            │ fecha_dev│
            └──────┬───┘
                   │
                   │
┌─────────────┐    │    ┌─────────────┐
│   Autor     │    │    │  Escribe    │
├─────────────┤    │    └─────────────┘
│ id_autor    │(PK)│
│ nombre      │    │
│ apellido    │    │
│ nacionalidad│    │
└─────────────┘    │
                   │
                   │
            ┌──────┴───┐
            │  Escribe │
            └──────────┘
```

**Relaciones identificadas:**

1. **Usuario - Préstamo:** 1:N (Un usuario puede tener muchos préstamos)
2. **Libro - Préstamo:** 1:N (Un libro puede estar en muchos préstamos, pero un préstamo es de un libro)
3. **Autor - Libro:** N:M (Un autor escribe muchos libros, un libro puede tener muchos autores)

### 📝 Ejercicio 2: Modelado de Sistema de E-commerce

**Enunciado:**

Crea un diagrama ER para un sistema de comercio electrónico con las siguientes características:

- **Clientes:** ID, nombre, email, dirección, teléfono
- **Productos:** ID, nombre, descripción, precio, stock
- **Pedidos:** ID, fecha, total, estado
- **Detalles de Pedido:** cantidad, precio_unitario, subtotal
- **Categorías:** ID, nombre, descripción
- Un cliente puede hacer muchos pedidos
- Un pedido contiene muchos productos (a través de detalles de pedido)
- Un producto pertenece a una categoría
- Un producto puede estar en muchos pedidos

**Solución:**

```
┌─────────────┐         ┌─────────────┐
│   Cliente   │         │   Pedido    │
├─────────────┤         ├─────────────┤
│ id_cliente  │(PK)     │ id_pedido   │(PK)
│ nombre      │         │ fecha       │
│ email       │         │ total       │
│ direccion   │         │ estado       │
│ telefono    │         └──────┬──────┘
└──────┬──────┘                │
       │   1                   │ 1
       │◄──────────────────────┘
       │                       │
       │                ┌──────▼──────┐
       │                │   Detalle   │
       │                │   Pedido    │
       │                ├─────────────┤
       │                │ id_pedido   │(PK, FK)
       │                │ id_producto │(PK, FK)
       │                │ cantidad    │
       │                │ precio_unit │
       │                │ subtotal    │
       │                └──────┬──────┘
       │                       │ N
       │                       │
┌──────▼──────┐                │
│  Categoria  │         ┌──────┴──────┐
├─────────────┤         │  Producto   │
│ id_categoria│(PK)     ├─────────────┤
│ nombre      │         │ id_producto │(PK)
│ descripcion │         │ nombre      │
└──────┬──────┘         │ descripcion │
       │ 1              │ precio      │
       │                │ stock       │
       │                │ id_categoria│(FK)
       │                └─────────────┘
       │                        │
       └────────────────────────┘
```

---

## 🏠 Tarea para la Próxima Clase

### ✅ Ejercicio: Diseño de Diagrama ER para Tu Proyecto

Crea un diagrama entidad-relación completo para tu proyecto personal, aplicando todos los conceptos aprendidos en esta clase.

**Descripción detallada del ejercicio:**

1. **Identificación de entidades:** Identifica al menos 5 entidades principales de tu proyecto y determina cuáles son regulares y cuáles son débiles
2. **Definición de atributos:** Para cada entidad, define sus atributos, identificando cuáles son claves primarias, claves foráneas y atributos descriptivos
3. **Establecimiento de relaciones:** Identifica todas las relaciones entre entidades y determina el tipo de cardinalidad (1:1, 1:N, N:M) para cada una
4. **Representación gráfica:** Crea el diagrama ER usando la notación Crow's Foot, incluyendo todas las entidades, atributos y relaciones identificadas
5. **Documentación:** Documenta cada entidad explicando su propósito en el sistema y justifica cada relación establecida
6. **Validación:** Verifica que tu modelo no tenga redundancias innecesarias y que todas las relaciones sean lógicas y necesarias
7. **Preparación para implementación:** Anota qué tablas se crearán en la base de datos y cómo se implementarán las relaciones (especialmente las N:M)

**Requisitos técnicos:**

- Utilizar una herramienta de diagramación (draw.io, Lucidchart, o similar)
- El diagrama debe ser claro, legible y seguir una notación consistente
- Incluir al menos una relación de cada tipo (1:1, 1:N, N:M)
- Identificar al menos una entidad débil con su relación de identificación
- Exportar el diagrama en formato PNG o PDF para compartir
- Incluir un documento de texto explicando las decisiones de diseño

---

## 📚 Recursos Adicionales

### 🔗 Enlaces Útiles

- [dbdiagram.io](https://dbdiagram.io/) - Herramienta online gratuita para crear diagramas ER
- [Lucidchart - Guía de Diagramas ER](https://www.lucidchart.com/pages/es/tutorial-diagrama-entidad-relacion) - Tutorial completo sobre diagramas entidad-relación
- [draw.io](https://app.diagrams.net/) - Herramienta de diagramación gratuita y potente
- [Modelado de Datos - Wikipedia](https://es.wikipedia.org/wiki/Modelado_de_datos) - Información general sobre modelado de datos

### 📖 Conceptos para Investigar

- **Normalización de bases de datos:** Proceso de organizar los datos para reducir la redundancia y mejorar la integridad
- **Claves primarias compuestas:** Claves formadas por múltiples atributos que juntos identifican de manera única una entidad
- **Atributos derivados:** Atributos que se calculan a partir de otros atributos y no se almacenan directamente
- **Relaciones reflexivas:** Relaciones donde una entidad se relaciona consigo misma (ej: empleado supervisa empleado)

---

## ❓ Preguntas Frecuentes

### ¿Cuál es la diferencia entre una entidad regular y una entidad débil?

- **Entidad regular (fuerte):** Tiene una clave primaria propia que la identifica de manera única. Puede existir independientemente de otras entidades. Ejemplo: Cliente, Producto, Empleado
- **Entidad débil:** No tiene una clave primaria completa propia. Depende de otra entidad (entidad fuerte) para existir y ser identificada. Su clave primaria incluye la clave de la entidad padre. Ejemplo: Detalle de Pedido (depende de Pedido), Dirección de Cliente (depende de Cliente)
- **Relación de identificación:** La relación entre una entidad fuerte y una débil se llama "relación de identificación" y se representa con una línea doble en algunos diagramas

### ¿Cómo se implementa una relación muchos a muchos (N:M) en una base de datos física?

- **Tabla intermedia (de unión):** Se crea una tercera tabla que contiene las claves foráneas de ambas entidades relacionadas
- **Clave primaria compuesta:** La clave primaria de la tabla intermedia está formada por ambas claves foráneas
- **Atributos adicionales:** La tabla intermedia puede contener atributos propios de la relación (ej: fecha de inscripción en la relación Estudiante-Curso)
- **Ejemplo:** Para la relación Estudiante-Curso, se crea la tabla "Inscripciones" con id_estudiante (FK), id_curso (FK) y fecha_inscripcion

### ¿Qué es la cardinalidad y por qué es importante?

- **Definición:** La cardinalidad especifica cuántas instancias de una entidad pueden estar relacionadas con instancias de otra entidad
- **Tipos principales:** Uno a Uno (1:1), Uno a Muchos (1:N), Muchos a Muchos (N:M)
- **Importancia:** Define las reglas de negocio y restricciones de integridad. Ayuda a entender cómo se comportarán los datos en el sistema
- **Implementación:** La cardinalidad determina cómo se crearán las claves foráneas y las restricciones en la base de datos física
- **Ejemplo práctico:** Si un Cliente puede tener muchos Pedidos (1:N), la tabla Pedidos tendrá una columna id_cliente como clave foránea

---

## 🎉 ¡Modelado de Datos Dominado!

¡Excelente trabajo! Ya conoces los conceptos fundamentales del modelado de datos, incluyendo entidades, atributos, relaciones y cardinalidad. Has aprendido a identificar entidades regulares y débiles, y a representar gráficamente la estructura de una base de datos mediante diagramas entidad-relación. En la próxima clase exploraremos el uso de llaves foráneas y consultas avanzadas en MySQL, aplicando estos conceptos de modelado en la práctica.

**Recuerda:** Un buen modelo de datos es la base de un sistema de información eficiente. Tómate el tiempo necesario para pensar bien las relaciones y la cardinalidad antes de implementar. ¡La práctica constante te ayudará a mejorar tus habilidades de modelado! 🚀

---

_📧 **Contacto:** Si tienes dudas sobre modelado de datos y diagramas entidad-relación, no dudes en consultar durante la clase o por los canales de comunicación establecidos._

