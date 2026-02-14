# 📖 Clase 26: Introducción al Prompt Engineering

## ❓ ¿Herramienta Espectacular o perdida de tiempo? Todo depende de cómo la uses.

## 🎯 Objetivos de la Clase

- Comprender qué es la IA generativa y su funcionamiento básico.
- Definir el concepto de Prompt Engineering y su importancia en el desarrollo de software.
- Aprender a estructurar prompts efectivos utilizando componentes clave (Contexto, Instrucción, Entrada, Salida).
- Aplicar técnicas de prompting para la generación, optimización y documentación de código.
- Explorar casos de uso específicos como la creación de pruebas unitarias, scripts y migraciones de bases de datos.

---

## 📚 ¿Qué es la IA Generativa?

### 🔍 Definición

**IA Generativa** es una rama de la inteligencia artificial que se enfoca en la creación de contenido nuevo y original (texto, imágenes, código, audio) a partir de patrones aprendidos de datos existentes. A diferencia de la IA tradicional que clasifica o predice, la generativa *construye*.

### 🏗️ Características Principales

- **Creatividad asistida:** Capacidad de generar borradores complejos en segundos.
- **Procesamiento de Lenguaje Natural (NLP):** Entiende y genera texto en lenguaje humano y de programación.
- **Adaptabilidad:** Puede realizar múltiples tareas (resumir, traducir, programar, explicar).
- **Probabilística:** Predice la siguiente "pieza" (token) de información más probable basándose en el contexto previo.

### 📖 Historia Breve

- **1966:** ELIZA, el primer chatbot que simulaba una conversación humana.
- **2017:** Google publica el paper "Attention Is All You Need", introduciendo la arquitectura Transformer.
- **2018:** OpenAI lanza GPT-1, demostrando el poder de los modelos de lenguaje a gran escala.
- **2022:** Lanzamiento de ChatGPT, masificando el uso de la IA generativa.
- **Actualidad:** Integración masiva de IA en IDEs (GitHub Copilot, Cursor) y flujos de trabajo de desarrollo.

---

## 🏛️ El Arte del Prompt Engineering

### 📝 ¿Qué es un Prompt?

Un prompt es la entrada de texto (instrucción o pregunta) que le proporcionamos a un modelo de IA para obtener una respuesta específica. El **Prompt Engineering** es la disciplina de refinar estas entradas para maximizar la calidad y precisión de la salida.

### 📝 Estructura de un Prompt Efectivo

Para obtener resultados profesionales, un prompt debe incluir:
1. **Rol:** Quién debe ser la IA (ej: "Actúa como un experto en Node.js").
2. **Contexto:** Información de fondo (ej: "Estamos migrando una API de Express a Fastify").
3. **Instrucción:** Qué debe hacer exactamente (ej: "Refactoriza este controlador").
4. **Restricciones:** Qué evitar o qué formato seguir (ej: "Usa TypeScript y no uses librerías externas").

```text
[Rol]: Actúa como un Arquitecto de Software Senior.
[Contexto]: Tengo un modelo de Mongoose para 'Usuario' con campos nombre, email y password.
[Instrucción]: Crea un script de validación usando la libería Joi para estos campos.
[Salida]: Devuelve solo el código en TypeScript.
```

### 📝 Técnicas: Zero-shot vs Few-shot

- **Zero-shot:** Pedir una tarea sin dar ejemplos. Útil para tareas comunes.
- **Few-shot:** Proporcionar uno o varios ejemplos del formato deseado para guiar a la IA.

---

## 🏗️ Casos de Uso en Desarrollo

### 📄 Generación de Código y Documentación

La IA puede ayudarnos a escribir funciones repetitivas o documentar código existente de forma instantánea.

```typescript
// Prompt: "Genera comentarios JSDoc para esta función y explica los parámetros"
function calculateDiscount(price: number, discountPercentage: number): number {
  return price - (price * (discountPercentage / 100));
}
```

### 📄 Migraciones y Scripts

Uno de los usos más potentes es transformar datos o estructuras, como pasar de un esquema Relacional a No-Relacional.

```text
Prompt: "Convierte este CREATE TABLE de MySQL a un esquema de Mongoose (TypeScript):
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2)
);"
```

---

## 🚀 Ejercicio Práctico

### 📝 De Código "Espagueti" a Clean Code con IA

Vamos a tomar una función desordenada y pedirle a la IA que la optimice siguiendo principios de Clean Code y agregue manejo de errores.

```typescript
// CÓDIGO INICIAL (A optimizar)
const save = (d: any) => {
    if(d.name != "" && d.email.includes("@")) {
        db.users.push(d);
        return true;
    }
    return false;
}
```

**Archivo `prompt-mejorado.md`:**

```markdown
Actúa como un desarrollador experto en TypeScript. 
Tengo la siguiente función de guardado de usuarios que es muy básica y carece de buenas prácticas.

Contexto:
- El proyecto usa TypeScript.
- Queremos usar una Interface para el usuario.
- Necesitamos lanzar errores específicos en lugar de devolver booleanos.
- Agrega validación básica de email.

Código:
[Insertar código arriba]

Por favor, refactoriza el código y explícame los cambios realizados.
```

---

## 🏠 Tarea para la Próxima Clase

### ✅ Ejercicio: Automatización de Pruebas y Documentación

Utilizando una herramienta de IA (ChatGPT, Claude, Gemini, etc.), deberás realizar lo siguiente sobre un controlador de tu proyecto actual:

1. **Generación de Tests:** Pide a la IA que genere 3 pruebas unitarias (casos de éxito y error) utilizando Jest para un endpoint de tu elección.
2. **Documentación:** Genera la documentación de ese mismo endpoint en formato Swagger/OpenAPI.
3. **Optimización:** Pide a la IA que identifique posibles vulnerabilidades de seguridad en el código del controlador.

**Requisitos técnicos:**
- El código resultante debe ser funcional.
- Debes adjuntar tanto el prompt utilizado como la respuesta obtenida.
- El controlador debe estar escrito en TypeScript.

---

## 📚 Recursos Adicionales

### 🔗 Enlaces Útiles
- [Learn Prompting](https://learnprompting.org/es/) - Guía gratuita y completa sobre prompt engineering.
- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering) - Documentación oficial de OpenAI.
- [Prompt Hero](https://prompthero.com/) - Buscador de prompts para diferentes modelos.
- [GitHub Copilot Documentation](https://docs.github.com/es/copilot) - Cómo mejorar las sugerencias de código.

### 📖 Conceptos para Investigar
- **Chain of Thought (Cadena de Pensamiento):** Pedirle a la IA que "piense paso a paso".
- **Tokens:** Cómo las IAs fragmentan y consumen el texto.
- **Hallucinations (Alucinaciones):** Por qué la IA a veces inventa información y cómo prevenirlo.
- **Temperature (Temperatura):** Parámetro que controla la aleatoriedad/creatividad de la respuesta.

---

## ❓ Preguntas Frecuentes

### ¿La IA va a reemplazar a los programadores?
- **Herramienta, no reemplazo:** La IA es un copiloto. El programador sigue siendo el responsable de la arquitectura, la lógica de negocio y la validación final del código. La IA nos hace más rápidos, no nos sustituye.

### ¿Qué hago si la IA me da código con errores?
- **Validación Humana:** Nunca copies y pegues sin entender. Debes revisar, testear e integrar el código generado como si lo hubiera escrito un compañero.
- **Iteración:** Si el código falla, copia el error de la terminal y dáselo a la IA para que lo corrija.

### ¿Es seguro poner código de mi empresa en una IA?
- **Privacidad:** Ten cuidado con datos sensibles (claves API, datos de clientes). Usa versiones empresariales de IA que garanticen que tus datos no se usarán para entrenamiento.

---

## 🎉 ¡Prompt Engineering Dominado!

¡Excelente trabajo! Ya conoces los fundamentos para hablar el lenguaje de las IAs y convertirlas en tus mejores aliadas. En la próxima clase veremos **ejemplos prácticos de optimización y automatización de proyectos** para llevar estas habilidades al siguiente nivel.

**Recuerda:** La calidad de lo que obtienes de una IA depende directamente de la calidad de lo que le pides. ¡Practica tus prompts! 🚀

---

_📧 **Contacto:** Si tienes dudas sobre cómo aplicar Prompt Engineering en tus tareas diarias, no dudes en consultar durante la clase o por los canales de comunicación establecidos._
