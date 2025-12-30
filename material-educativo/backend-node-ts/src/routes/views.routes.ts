import { Router } from 'express';

const router = Router();

// Ruta principal que renderiza una vista
// /handlebars/
router.get('/', (req, res) => {
  res.render('home', {
    titulo: 'Home',
    mensaje: 'Renderizando vistas con Handlebars 🚀',
  });
});

// /handlebars/about
router.get('/about', (req, res) => {
  // Tarea
});

export default router;
