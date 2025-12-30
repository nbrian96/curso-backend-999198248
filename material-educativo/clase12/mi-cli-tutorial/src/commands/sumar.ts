import { validarArgumentos, esNumero, mostrarError } from '../utils/helpers';

/**
 * Comando: sumar
 * Suma dos números
 */
export function ejecutarSumar(args: string[]): void {
  validarArgumentos(
    args,
    3,
    'Faltan argumentos. Uso: npm start sumar <numero1> <numero2>'
  );

  const numero1Str = args[1];
  const numero2Str = args[2];

  if (!esNumero(numero1Str) || !esNumero(numero2Str)) {
    mostrarError('Los argumentos deben ser números');
  }

  const numero1 = parseFloat(numero1Str);
  const numero2 = parseFloat(numero2Str);
  const resultado = numero1 + numero2;

  console.log(`➕ ${numero1} + ${numero2} = ${resultado}`);
}
