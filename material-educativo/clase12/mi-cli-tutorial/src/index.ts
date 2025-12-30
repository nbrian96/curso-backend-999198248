import { ejecutarSaludar } from './commands/saludar';
import { ejecutarSumar } from './commands/sumar';
import { ejecutarListar } from './commands/listar';
import { ejecutarInfo } from './commands/info';
import { ejecutarAyuda } from './commands/ayuda';

const args = process.argv.slice(2);
const comando = args[0];

function main() {
  if (!comando) {
    ejecutarAyuda();
    return;
  }

  switch (comando) {
    case 'saludar':
      ejecutarSaludar(args);
      break;

    case 'sumar':
      ejecutarSumar(args);
      break;

    case 'listar':
      ejecutarListar(args);
      break;

    case 'info':
      ejecutarInfo();
      break;

    case 'ayuda':
    case 'help':
      ejecutarAyuda();
      break;

    default:
      console.log(`❌ Comando "${comando}" no reconocido`);
      console.log('Usa: npm start ayuda para ver los comandos disponibles');
      process.exit(1);
  }
}

main();
