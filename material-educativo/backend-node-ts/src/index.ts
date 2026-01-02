import express, { Request, Response } from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import 'dotenv/config';

// Importar las rutas
import productsRouter from './routes/products.routes';
import usersRouter from './routes/users.routes';
import viewsRouter from './routes/views.routes';

const app = express();
const PORT = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Configuración del motor de plantillas Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '..', 'public')));

// Todos los endpoints van a ir desde /api/

/**
 * Endpoint raíz que responde con un mensaje JSON
 *
 * GET /api
 *
 * req: Request - Objeto de solicitud de Express
 * res: Response - Objeto de respuesta de Express
 *
 * Respuesta:
 * {
 *   "message": "¡Hola, mundo! Este es un servidor Express con TypeScript. 🚀"
 * }
 */
app.get('/api', (req: Request, res: Response) => {
  console.log('¡Alguien accedió al endpoint raíz! 🌐');
  res.json({
    message: '¡Hola, mundo! Este es un servidor Express con TypeScript. 🚀',
  });
});

app.get('/api/saludo', (req: Request, res: Response) => {
  res.json({ mensaje: 'Hola desde la API 🚀' });
});

app.use('/api/users', usersRouter);

app.use('/products', productsRouter);

// Rutas de vistas
app.use('/handlebars', viewsRouter);

// Iniciar el servidor HTTP
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
});

// https://localhost:3000/   >> ¡Hola, mundo! Este es un servidor Express con TypeScript. 🚀
