// src/utils/helpers.ts

/**
 * Valida que un string sea un número válido
 */
export function esNumero(valor: string): boolean {
  return !isNaN(parseFloat(valor)) && isFinite(parseFloat(valor));
}

/**
 * Muestra un mensaje de error y sale del programa
 */
export function mostrarError(mensaje: string, codigo: number = 1): never {
  console.error(`❌ Error: ${mensaje}`);
  process.exit(codigo);
}

/**
 * Valida que se proporcionen los argumentos necesarios
 */
export function validarArgumentos(
  args: string[],
  cantidadMinima: number,
  mensajeError: string
): void {
  if (args.length < cantidadMinima) {
    mostrarError(mensajeError);
  }
}

/**
 * Obtiene un argumento o devuelve un valor por defecto
 */
export function obtenerArgumento(
  args: string[],
  indice: number,
  valorPorDefecto?: string
): string {
  return args[indice] || valorPorDefecto || '';
}
