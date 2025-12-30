import { obtenerArgumento } from '../utils/helpers';

/**
 * Comando: saludar
 * Saluda a una persona
 */
export function ejecutarSaludar(args: string[]): void {
  const nombre = obtenerArgumento(args, 1, 'Mundo');
  console.log(`👋 ¡Hola, ${nombre}!`);
  console.log(`📅 Fecha actual: ${new Date().toLocaleString()}`);
  console.log(`📅 Fecha actual: ${obternerDiasParaNavidad()}`);
}

function obternerDiasParaNavidad(): number {
  const hoy = new Date();
  const navidad = new Date(hoy.getFullYear(), 11, 25); // Mes 11 es diciembre
  if (hoy > navidad) {
    navidad.setFullYear(hoy.getFullYear() + 1);
  }
  const diffTime = Math.abs(navidad.getTime() - hoy.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
