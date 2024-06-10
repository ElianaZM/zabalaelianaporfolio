var cartas = [
    {nombre: "1", src: "images/arenita.jpeg", seleccion: false}, {nombre: "1", src: "images/arenita.jpeg", seleccion: false},
    {nombre: "2", src: "images/Bob_esponja.png", seleccion: false}, {nombre: "2", src: "images/Bob_esponja.png", seleccion: false},
    {nombre: "3", src: "images/calamardo.jpeg", seleccion: false}, {nombre: "3", src: "images/calamardo.jpeg", seleccion: false},
    {nombre: "4", src: "images/don_cangrejo.jpeg", seleccion: false}, {nombre: "4", src: "images/don_cangrejo.jpeg", seleccion: false},
    {nombre: "5", src: "images/gary.jpeg", seleccion: false}, {nombre: "5", src: "images/gary.jpeg", seleccion: false},
    {nombre: "6", src: "images/medusa.jpeg", seleccion: false}, {nombre: "6", src: "images/medusa.jpeg", seleccion: false},
    {nombre: "7", src: "images/patricio.jpeg", seleccion: false}, {nombre: "7", src: "images/patricio.jpeg", seleccion: false},
    {nombre: "8", src: "images/plankton.jpeg", seleccion: false}, {nombre: "8", src: "images/plankton.jpeg", seleccion: false}
];

var intentos = 0;
var jugada1 = "";
var jugada2 = "";
var identificadorJ1 = "";
var identificadorJ2 = "";

function iniciarJuego() {
    var juego = document.getElementById("juego");
    juego.style.opacity = 1;

    cartas.sort(function() { return Math.random() - 0.5 });
    for (var i = 0; i < 16; i++) {
        var carta = cartas[i].nombre;
        var dato = document.getElementById("img" + i.toString());
        dato.dataset.valor = carta;
        dato.src = "images/fondo.jpeg";
    }
}

function resetearJuego() {
    var juego = document.getElementById("juego");
    juego.style.opacity = 1;
    cartas.sort(function() { return Math.random() - 0.5 });
    for (var i = 0; i < 16; i++) {
        var carta = cartas[i].nombre;
        var dato = document.getElementById("img" + i.toString());
        dato.dataset.valor = carta;
        dato.src = "images/fondo.jpeg";
    }
    borrarVariables();
}

function voltearCarta(evento) {
    var elemento = evento.target;
    jugada2 = elemento.dataset.valor;
    identificadorJ2 = elemento.id.substring(3);

    var dato = document.getElementById("img" + identificadorJ2);

    if (jugada1 !== "") {
        if (jugada1 === jugada2 && identificadorJ1 !== identificadorJ2 && 
            !cartas[parseInt(identificadorJ2)].seleccion && 
            !cartas[parseInt(identificadorJ1)].seleccion) {

            cartas[parseInt(identificadorJ2)].seleccion = true;
            cartas[parseInt(identificadorJ1)].seleccion = true;
            dato.src = cartas[parseInt(identificadorJ2)].src;
            document.getElementById("img" + identificadorJ1).src = cartas[parseInt(identificadorJ1)].src;
            borrarVariables();
            comprobarJuego();
        } else if (identificadorJ1 !== identificadorJ2) {
            dato.src = cartas[parseInt(identificadorJ2)].src;
            setTimeout(function() {
                dato.src = "images/fondo.jpeg";
                var dato2 = document.getElementById("img" + identificadorJ1);
                dato2.src = "images/fondo.jpeg";
                borrarVariables();
            }, 1000);
        }
    } else if (jugada2 !== "valor") {
        dato.src = cartas[parseInt(identificadorJ2)].src;
        jugada1 = jugada2;
        identificadorJ1 = identificadorJ2;
    }
}

function borrarVariables() {
    jugada1 = "";
    jugada2 = "";
    identificadorJ1 = "";
    identificadorJ2 = "";
}

function comprobarJuego() {
    var aciertos = 0;
    for (var i = 0; i < 16; i++) {
        if (cartas[i].seleccion) {
            aciertos++;
        }
    }
    if (aciertos === 16) {
        window.alert("¡Ganaste el Juego!");
    }
}
