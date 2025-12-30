// src/commands/info.ts

/**
 * Comando: info
 * Muestra información del sistema
 */
export function ejecutarInfo(): void {
  console.log('ℹ️  Información del Sistema:');
  console.log(`   Node.js versión: ${process.version}`);
  console.log(`   Plataforma: ${process.platform}`);
  console.log(`   Directorio actual: ${process.cwd()}`);
  console.log(
    `   Variables de entorno NODE_ENV: ${process.env.NODE_ENV || 'no definida'}`
  );
}
