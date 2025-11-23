// **Problema:** Crea un enum `DiaSemana` con los días de la semana. Luego:
// - Crea una función que reciba un `DiaSemana` y retorne si es día laboral o fin de semana
// - Prueba la función con diferentes días
// - Muestra los resultados en consola
// Para ejecutar:
// tsc ejercicio06.ts
// node ejercicio06.js
var DiaSemana;
(function (DiaSemana) {
    DiaSemana["Lunes"] = "Lunes";
    DiaSemana["Martes"] = "Martes";
    DiaSemana["Miercoles"] = "Miercoles";
    DiaSemana["Jueves"] = "Jueves";
    DiaSemana["Viernes"] = "Viernes";
    DiaSemana["Sabado"] = "Sabado";
    DiaSemana["Domingo"] = "Domingo";
})(DiaSemana || (DiaSemana = {}));
function esDiaLaboral(dia) {
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
