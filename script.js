let intentos = 6;
let palabras = ["LITIO", "REINA", "MICRO", "PARED", "AGUA", ];
let random = Math.floor(Math.random() * palabras.length);
let palabra;
const INPUT = document.getElementById("guess-input");
const BUTTON = document.getElementById("guess-button");
const GRID = document.getElementById("grid");

window.addEventListener('load', init);
function init(){
    console.log("esto se ejecuta cuando carga la pagina")
}
fetch('https://random-word-api.herokuapp.com/word?length=6&lang=es')
    .then( response => response.json())
    .then(response => {
        palabra = response[0].toUpperCase();
    })
    .catch(err => {
        console.log("ha ocurrido un error")
        palabra = palabras[random];
    })

BUTTON.addEventListener('click', intentar);

function intentar(){
    const INTENTO = leerIntento().trim();
    if(INTENTO.length != palabra.length){
        alert("Debe ingresar una palabra con " + palabra.length) + " letras";
    }else{
        realizarIntento(INTENTO)
    }
}

function realizarIntento(INTENTO){
    const ROW = document.createElement('div');
    const GRID = document.getElementById("grid");
    ROW.className = 'row';
    for (let i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        ROW.appendChild(SPAN)
        GRID.appendChild(ROW)
        SPAN.innerHTML = INTENTO[i];

        if(INTENTO[i] === palabra[i]){
            SPAN.style.backgroundColor = '#79b851';
        } else if( palabra.includes(INTENTO[i]) ) {
            SPAN.style.backgroundColor = '#f3c237';
        } else {
            SPAN.style.backgroundColor = '#a4aec4';
        }
        ROW.appendChild(SPAN)
    }
    if (INTENTO === palabra ) {
        terminar("<h1>GANASTE!😀</h1>");
        return;
    }
    GRID.appendChild(ROW)
    intentos--;
    if (intentos === 0){
        terminar("<h1>PERDISTE!😖</h1>");
        const FINAL = document.getElementById('palabra');
        FINAL.innerHTML = "La palabra era: " + palabra;
        FINAL.style.display = "block";
    }
}

function leerIntento(){
    let intento = document.getElementById('guess-input');
    intento = intento.value;
    intento = intento.toUpperCase(); 
    return intento;
}

function terminar(mensaje){
    INPUT.disabled = true;
    BUTTON.disabled = true;
    let result = document.getElementById('result');
    result.innerHTML = mensaje;
}