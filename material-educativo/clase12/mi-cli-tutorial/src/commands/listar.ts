import { obtenerArgumento, mostrarError } from '../utils/helpers';

/**
 * Comando: listar
 * Lista una cantidad de elementos
 */
export function ejecutarListar(args: string[]): void {
  const cantidadStr = obtenerArgumento(args, 1, '5');
  const cantidad = parseInt(cantidadStr);

  if (isNaN(cantidad) || cantidad < 1 || cantidad > 20) {
    mostrarError('La cantidad debe ser un número entre 1 y 20');
  }

  console.log(`📋 Listando ${cantidad} elementos:`);
  for (let i = 1; i <= cantidad; i++) {
    console.log(`  ${i}. Elemento número ${i}`);
  }
}
