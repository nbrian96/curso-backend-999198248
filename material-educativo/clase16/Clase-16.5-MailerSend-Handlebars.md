# 📖 Clase 16.5: MailerSend + Handlebars

## 🎯 Objetivos de la Clase

- Comprender por qué **Ethereal** ya no es una opción confiable.
- Introducir **MailerSend** como proveedor real de envío de emails.
- Configurar MailerSend en un proyecto Node.js.
- Integrar **Handlebars** para generar emails dinámicos.
- Mantener la arquitectura **MVC + Services** existente.

---

## 📚 Contexto: ¿Por qué cambiar Ethereal?

### 🔍 Situación actual

**ethereal.email** es un servicio de testing que:

- No envía correos reales
- Puede presentar caídas o limitaciones
- No es apto para producción

En clases anteriores se utilizó junto con **Nodemailer**, ya que Ethereal funciona únicamente vía **SMTP**.

---

## 🔄 ¿Sigue siendo necesario Nodemailer?

### ❓ Respuesta corta

👉 **No. En este escenario Nodemailer ya no es necesario.**

### 🧠 Explicación clara

Existen dos formas comunes de enviar emails desde Node.js:

| Forma de envío | Herramienta       | Cuándo se usa                                |
| -------------- | ----------------- | -------------------------------------------- |
| **SMTP**       | Nodemailer        | Gmail, Outlook, Ethereal, servidores propios |
| **API HTTP**   | SDK del proveedor | MailerSend, SendGrid, Resend                 |

En esta clase:

- ❌ **No usamos SMTP**
- ❌ **No usamos Ethereal**
- ✅ Usamos la **API de MailerSend** mediante su SDK oficial

Por lo tanto:

> **Nodemailer no cumple ningún rol y puede eliminarse del proyecto.**

### 🧹 Limpieza recomendada

Si el proyecto ya fue migrado completamente a MailerSend:

```bash
npm uninstall nodemailer
```

### 🧩 Regla mental importante

> 🔹 Si usás **SMTP** → Nodemailer

> 🔹 Si usás **API del proveedor** → SDK del proveedor

Esta regla ayuda a evitar confusión y dependencias innecesarias.

---

## ✉️ ¿Qué es MailerSend?

https://app.mailersend.com/dashboard

https://github.com/mailersend/mailersend-nodejs

### 📝 Definición

**MailerSend** es un servicio de envío de emails transaccionales que ofrece:

- SMTP y API
- Dashboard para seguimiento
- Envío de emails reales
- Plan gratuito para testing

---

## 📦 Instalación de dependencias

```bash
npm install mailersend dotenv
```

En el archivo `src/index.ts` agregar

```ts
import 'dotenv/config';
```

---

## 🔐 Configuración de Variables de Entorno

Crear archivo `.env`:

```bash
touch .env
```

```env
MAILERSEND_API_KEY=tu_api_key_aqui
MAIL_FROM=no-reply@tudominio.com
```

La **api key** la podemos obtener desde https://app.mailersend.com/api-tokens

No olvidar el **dominio**!!

> ⚠️ Recordar agregar `.env` al `.gitignore`

---

## 📂 Templates de Email

### 📁 Crear estructura

```bash
mkdir src/templates
mkdir src/templates/emails

touch src/templates/emails/welcome.hbs
# o
touch src/templates/emails/welcome.handlebars

```

> ⚠️ Depende de como configuramos previamente el `view engine`

### 🗂️ Esquema

```text
src/
└── templates/
    └── emails/
        └── welcome.handlebars
```

---

## 🎨 Template Handlebars

### 📄 `welcome.handlebars`

```handlebars
<h1>Hola {{name}}</h1>
<p>Bienvenido a nuestra aplicación 🚀</p>
<p>Tu email registrado es: {{email}}</p>
```

---

## 🧠 Service de Email con MailerSend

### 📄 `src/services/mail.service.ts`

```ts
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || '',
});

// Compila un template Handlebars
const compileTemplate = (templateName: string, data: any): string => {
  const filePath = path.join(
    __dirname,
    '..',
    'templates',
    'emails',
    `${templateName}.handlebars`
  );
  const source = fs.readFileSync(filePath, 'utf-8');
  const template = handlebars.compile(source);
  return template(data);
};

export const sendWelcomeEmail = async (to: string, name: string) => {
  const html = compileTemplate('welcome', { name, email: to });

  const sentFrom = new Sender(process.env.MAIL_FROM || '', 'Backend Demo');
  const recipients = [new Recipient(to, name)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject('Bienvenido 🚀')
    .setHtml(html);

  await mailerSend.email.send(emailParams);
};
```

---

## 🔗 Uso desde el Controller

No cambia respecto a la clase anterior.

```ts
await sendWelcomeEmail(user.email, user.name);
```

El controller **no sabe** si el mail se envía por Ethereal, MailerSend u otro proveedor.

---

## 🧠 Buenas Prácticas

- El proveedor de email vive en un **service**
- Handlebars permite reutilizar y mantener templates
- Las variables sensibles van en `.env`
- El controller solo coordina acciones

---

## 🏠 Tarea para la Próxima Clase

### ✅ Ejercicio

1. Crear un nuevo template de email `reset-password.handlebars`
2. Enviar el email desde un nuevo endpoint
3. Reutilizar la función `compileTemplate`
4. No duplicar lógica en controllers

---

## 📚 Recursos Adicionales

- [https://www.mailersend.com](https://www.mailersend.com)
- [https://handlebarsjs.com](https://handlebarsjs.com)
- [https://www.npmjs.com/package/mailersend](https://www.npmjs.com/package/mailersend)

---

## 🎉 ¡Emails Reales!

Excelente trabajo. Ahora tu backend puede enviar **emails reales** usando MailerSend y templates Handlebars, manteniendo una arquitectura limpia y profesional.

---

_📧 **Contacto:** Ante dudas sobre MailerSend o templates de email, consultá durante la clase o por los canales habituales._
