// **Problema:** Crea un enum `DiaSemana` con los días de la semana. Luego:

// - Crea una función que reciba un `DiaSemana` y retorne si es día laboral o fin de semana
// - Prueba la función con diferentes días
// - Muestra los resultados en consola

// Para ejecutar:
// tsc ejercicio06.ts
// node ejercicio06.js

enum DiaSemana {
    Lunes = 'Lunes',
    Martes = 'Martes',
    Miercoles = 'Miercoles',
    Jueves = 'Jueves',
    Viernes = 'Viernes',
    Sabado = 'Sabado',
    Domingo = 'Domingo'
}

function esDiaLaboral(dia: DiaSemana): string {
    switch (dia) {
        case DiaSemana.Sabado:
        case DiaSemana.Domingo:
            return "Es fin de semana";
        default:
            return "Es día laboral";
    }
}


console.log(esDiaLaboral(DiaSemana.Lunes));
console.log(esDiaLaboral(DiaSemana.Jueves));
console.log(esDiaLaboral(DiaSemana.Sabado));
console.log(esDiaLaboral(DiaSemana.Domingo));