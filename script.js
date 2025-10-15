const MAX_INTENTOS = 10;
const MAX_COMBI_COLORES = 4;
const COLORS = ['white', 'blue', 'green', 'violet', 'yellow', 'red', 'orange', 'cyan'];
const GREY = "grey";
const WHITE = "white";
const BLACK = "black";

const master = [];
const userCombi = [];
const finalResult = [];
var intento = 0;
var aciertos = 0;

function init() {
    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        master[i] = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    for (let i = 0; i < MAX_INTENTOS; i++) {
        let nuevoDiv = document.createElement("div");
        nuevoDiv.className = "UserInputColor";
        nuevoDiv.innerHTML = ROW_RESULT;
        document.getElementById("Result").appendChild(nuevoDiv);
        let elementos = document.getElementsByClassName("UserInputColor");
        for (let j = 0; j < elementos.length; j++) {
            elementos[j].style.width = "80%";
        }
    }
}

function Comprobar() {
    if (userCombi.length !== MAX_COMBI_COLORES) {
        alert("Debes colocar 4 colores para comprobar tu respuesta");
        return;
    }
    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        if (userCombi[i] === master[i]) {
            finalResult.push(BLACK);
        } else if (master.includes(userCombi[i])) {
            finalResult.push(WHITE);
        } else {
            finalResult.push(GREY);
        }
    }
    pintarResultados(finalResult);
    confirmarVictoria(finalResult);
    limpiarUserImput(userCombi);
    confirmarIntentos(intento);
    limpiarFinalResult(finalResult);
}

function añadeColor(color) {
    if (userCombi.length < MAX_COMBI_COLORES) {
        userCombi.push(color);
        document.getElementById("combiText").value = userCombi.join("-");
        document.getElementById("combiText").style.textAlign = "center";
    }
}

function pintarResultados(finalResult) {
    let bolas = document.getElementsByClassName("cercleResult flex");
    let cuadradosFinales = document.getElementById("master").getElementsByClassName("cel");
    let cuadradosInput = document.getElementsByClassName("celUserCombi flex");

    for (let i = 0; i < MAX_COMBI_COLORES; i++) {
        bolas[i + (4 * intento)].style.backgroundColor = finalResult[i];
        cuadradosInput[i + (4 * intento)].style.backgroundColor = userCombi[i];
        if (finalResult[i] === BLACK) {
            cuadradosFinales[i].style.backgroundColor = master[i];
        }
    }
    intento++;
}

function limpiarUserImput(userCombi) {
    while (userCombi.length > 0) {
        userCombi.pop();
    }
    document.getElementById("combiText").value = "";
}

function limpiarFinalResult(finalResult) {
    while (finalResult.length > 0) {
        finalResult.pop();
    }
}

function confirmarIntentos(intento) {
    let textInfo = document.getElementById("info");
    if (intento === MAX_INTENTOS) {
        alert("Has perdido");
        textInfo.innerText = "Te quedaste sin intentos";
    }
}

function confirmarVictoria(finalResult) {
    aciertos = 0;
    let textInfo = document.getElementById("info");
    for (const elementos of finalResult) {
        if (elementos === BLACK) {
            aciertos++;
        }
    }
    if (aciertos === MAX_COMBI_COLORES) {
        textInfo.innerText = "¡¡¡VICTORIAAA!!!";
        textInfo.style.textAlign = "center";
        textInfo.classList.add("victory");
        document.getElementById("check").onclick = null;
    } else {
        textInfo.innerText = `Casi, vuelve a intentarlo, te quedan ${MAX_INTENTOS - intento}`;
        textInfo.style.textAlign = "center";
        textInfo.classList.remove("victory");
    }
}

const ROW_RESULT = `<div class="rowResult w100 flex wrap">
    <div class="rowUserCombi w75 flex wrap">
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
    </div>
    <div class="rowCercleResult w25 flex wrap center">
       <div class="w40 h40">
            <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
    <div>
</div>`;
