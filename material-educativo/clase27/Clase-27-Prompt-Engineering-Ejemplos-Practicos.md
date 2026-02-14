# 📖 Clase 27: Prompt Engineering - Ejemplos prácticos para la optimización y automatización de proyectos

## 🎯 Objetivos de la Clase

- Aplicar técnicas avanzadas de prompting (Chain of Thought y Few-shot) para resolver problemas complejos.
- Utilizar la IA para identificar cuellos de botella y optimizar el rendimiento del código backend.
- Automatizar tareas repetitivas de desarrollo como la creación de módulos, scripts de migración y documentación.
- Aprender a generar suites de pruebas completas (Unitarias e Integración) de forma automatizada.
- Desarrollar una mentalidad de "AI-First" para acelerar el ciclo de vida del desarrollo de software.

---

## 📚 ¿Qué es la Automatización con IA?

### 🔍 Definición

**La Automatización con IA** en el desarrollo de software consiste en delegar tareas mecánicas, repetitivas o de análisis intensivo a modelos de lenguaje pre-entrenados para que el desarrollador pueda enfocarse en la arquitectura y la lógica de negocio única.

### 🏗️ Características Principales

- **Velocidad de ejecución:** Generación de archivos base (boilerplate) en milisegundos.
- **Análisis estático inteligente:** Detección de patrones de código ineficientes.
- **Interoperabilidad:** Capacidad de traducir lógica entre diferentes lenguajes o frameworks.
- **Consistencia:** Mantenimiento de un estilo de código uniforme a través de prompts de sistema.

### 📖 Historia Breve

- **2021:** Lanzamiento de GitHub Copilot (Beta), el primer gran "autocompletado" de código.
- **2023:** Auge de los "AI Agents" capaces de ejecutar comandos en la terminal y leer carpetas enteras.
- **2024:** Integración de herramientas como Cursor y Devin, que automatizan flujos completos de trabajo.
- **2025:** Adopción masiva de pipelines de CI/CD que incluyen validación de código por IA.
- **Actualidad:** El Prompt Engineering se consolida como una habilidad técnica fundamental para el Seniority.

---

## 🏛️ Técnicas Avanzadas de Prompting

### 📝 Chain of Thought (Cadena de Pensamiento)

Consiste en pedirle a la IA que explique su proceso de razonamiento paso a paso antes de dar la solución final. Esto reduce drásticamente las alucinaciones en lógica compleja.

```text
Prompt: "Analiza paso a paso cómo optimizarías esta consulta de MongoDB que tarda 5 segundos. 
Luego, propón los índices necesarios y el código del agregador optimizado."
```

### 📝 Few-shot Prompting

Proporcionar ejemplos específicos de "Entrada -> Salida" para que la IA aprenda un formato o estilo particular que no es estándar.

```text
Prompt: 
"Entrada: Controller 'Auth', Método 'Login' -> Salida: 'POST /auth/login'
Entrada: Controller 'User', Método 'Delete' -> Salida: 'DELETE /user/:id'
Entrada: Controller 'Product', Método 'Update' -> Salida: "
```

---

## 🏗️ Optimización y Automatización Real

### 📄 Optimización de Algoritmos y Consultas

La IA puede ayudarnos a pasar de una complejidad $O(n^2)$ a $O(n)$ simplemente analizando el código.

```typescript
// Ejemplo de prompt para optimización:
// "Este bucle anidado está causando lentitud. Redúcelo usando un Map para mejorar la performance."
const matchProducts = (orders: any[], inventory: any[]) => {
    return orders.map(order => {
        const item = inventory.find(i => i.id === order.productId); // O(n) dentro de O(n)
        return { ...order, stock: item.stock };
    });
}
```

### 📄 Automatización de Boilerplate (Módulos MVC)

Podemos crear un prompt que genere toda la estructura de una carpeta para una nueva entidad.

```text
Prompt: "Genera el código para un módulo de 'Categorías' en Node.js siguiendo el patrón MVC:
1. Modelo de Mongoose (name, description).
2. Controlador con CRUD básico.
3. Rutas de Express.
4. Servicio para la lógica de negocio.
Todo en TypeScript."
```

---

## 🚀 Ejercicio Práctico

### 📝 Automatización de un Script de Mantenimiento

Vamos a generar un script que escanee nuestra base de datos, busque usuarios sin actividad en 6 meses y genere un reporte en CSV.

**Archivo `prompt-automation.md`:**

```markdown
Actúa como un DevOps Engineer. Necesito un script de Node.js (TypeScript) que:
1. Se conecte a MongoDB usando Mongoose.
2. Busque en la colección 'Users' aquellos cuyo 'lastLogin' sea anterior a 180 días.
3. Use la librería 'json2csv' para exportar nombre y email a un archivo llamado 'inactive_users.csv'.
4. El script debe cerrarse automáticamente al terminar y manejar errores de conexión.
```

---

## 🏠 Tarea para la Próxima Clase

### ✅ Ejercicio: El "Agente de Optimización"

Deberás seleccionar una sección de tu Trabajo Práctico Final y realizar lo siguiente:

1. **Optimización de Consulta:** Encuentra la consulta a la base de datos más compleja que tengas y pide a la IA que la optimice usando `.aggregate()` o índices.
2. **Generador de Semillas (Seeders):** Crea un prompt para generar un script que cargue 50 registros de prueba coherentes (no solo texto aleatorio) en tu base de datos.
3. **Pipeline de Calidad:** Pide a la IA que genere un archivo `github-action.yml` que corra tus tests y verifique que el linter no tenga errores cada vez que hagas un push.

**Requisitos técnicos:**
- Presentar el código optimizado vs el original.
- Mostrar una captura o el contenido del archivo CSV/JSON de prueba generado.
- Explicar qué técnica de prompting (CoT, Few-shot, etc.) usaste para cada tarea.

---

## 📚 Recursos Adicionales

### 🔗 Enlaces Útiles
- [Vercel AI SDK](https://sdk.vercel.ai/docs) - Librería para integrar IAs en tus apps.
- [Cursor.com](https://cursor.com) - El IDE de IA más avanzado actualmente.
- [AITools.dev](https://aitools.dev) - Directorio de herramientas de IA para devs.
- [MongoDB Atlas Search + AI](https://www.mongodb.com/products/platform/atlas-search) - Cómo MongoDB integra IA vectorial.

### 📖 Conceptos para Investigar
- **RAG (Retrieval-Augmented Generation):** Cómo alimentar a la IA con tus propios documentos/código.
- **IA Agents:** Programas que pueden navegar por tu sistema de archivos y corregir bugs solos.
- **Context Window:** Por qué no podemos pasarle todo el proyecto de una sola vez a la IA.
- **Vector Databases:** El futuro del almacenamiento para aplicaciones con IA.

---

## ❓ Preguntas Frecuentes

### ¿Puedo confiar ciegamente en las optimizaciones de la IA?
- **No.** La IA puede sugerir índices que penalicen las escrituras o sugerir librerías obsoletas. Siempre verifica con la documentación oficial.

### ¿Cómo evito que la IA alucine en scripts de automatización?
- **Pruebas por etapas:** No le pidas el script entero de una vez. Primero la conexión, luego la lógica de búsqueda, y finalmente la exportación.

### ¿Es mejor usar ChatGPT, Claude o Gemini para programar?
- **Depende:** Actualmente Claude 3.5 Sonnet y GPT-4o lideran en código, pero Gemini 1.5 Pro destaca por su enorme ventana de contexto (puede leer proyectos enteros).

---

## 🎉 ¡Automatización Dominada!

¡Increíble! Has pasado de usar la IA como un simple buscador a integrarla como un motor de productividad en tu flujo de trabajo. En las próximas tutorías aplicaremos todo esto directamente en tu **Proyecto Final**.

**Recuerda:** El mejor programador no es el que más líneas escribe, sino el que mejor sabe utilizar sus herramientas para resolver problemas complejos. ¡A automatizar! 🚀

---

_📧 **Contacto:** Si tienes problemas con los scripts generados o quieres profundizar en alguna técnica de optimización, consulta por el canal de Discord del curso._
