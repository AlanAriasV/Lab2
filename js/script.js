// const argentina = '../data/argentina.json';
// const chile = '../data/chile.json'; 
// const espana = '../data/espana.json' 
// const mexico = '../data/mexico.json'; 

class PaisSelector {
    constructor(id_selector, id_valor) {
        this.id_selector = id_selector;
        this.id_valor = id_valor
    }

    detectaCambios() {
        var changedText = document.getElementById(this.id_valor);
        function listQ() {
            changedText.textContent = this.value;
            data(this.id, this.value);
        }
        document.getElementById(this.id_selector).onchange = listQ;
    }
}

var participantes1 = new PaisSelector("pais_mc1", "pais1");
var participantes2 = new PaisSelector("pais_mc2", "pais2");
participantes1.detectaCambios();
participantes2.detectaCambios();
data("pais_mc1", "Argentina");
data("pais_mc2", "Argentina");

function data(id_selector, value) {
    var xmlhttp = new XMLHttpRequest();
    var url = "data/" + value.toLowerCase() + ".json";
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            updateButtons(id_selector, myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function updateButtons(id_selector, arr) {
        var out = "";
        var i;
        // var id = id_selector == "pais_mc1" ? "table1" : "table2"
        if (value.toLowerCase() == "argentina") {
            for (const part in arr) {
                nombre = arr[part].NOMBRE
                out += '<button class="btn-participante" id=' + nombre + ' onClick=addMC(\'' + id_selector + '\',\'' + encodeURIComponent(nombre) + '\')>' + nombre + '</button>';
            }
        } else if (value.toLowerCase() == "chile") {
            for (const part in arr) {
                nombre = arr[part];
                out += '<button class="btn-participante" id=' + nombre + ' onClick=addMC(\'' + id_selector + '\',\'' + encodeURIComponent(nombre) + '\')>' + nombre + '</button>';
            }
        } else if (value.toLowerCase() == "españa") {
            for (const part in arr) {
                for (let index = 0; index < arr[part].length; index++) {
                    nombre = arr[part][index];
                    out += '<button class="btn-participante" id=' + nombre + ' onClick=addMC(\'' + id_selector + '\',\'' + encodeURIComponent(nombre) + '\')>' + nombre + '</button>';
                }
            }
        } else {
            for (const part in arr) {
                for (let index = 0; index < arr[part].length; index++) {
                    nombre = arr[part][index].NOMBRE;
                    out += '<button class="btn-participante" id=' + nombre + ' onClick=addMC(\'' + id_selector + '\',\'' + encodeURIComponent(nombre) + '\')>' + nombre + '</button>';
                }
            }
        }
        document.getElementById(id_selector == "pais_mc1" ? "partipantes-pais1" : "partipantes-pais2").innerHTML = out;
    }
}

function addMC(id, name) {
    document.getElementById('table1').children[0].children[id == "pais_mc1" ? 1 : 2].children[0].innerHTML = decodeURIComponent(name);
    document.getElementById('table2').children[0].children[id == "pais_mc1" ? 1 : 2].children[0].innerHTML = decodeURIComponent(name);
    document.getElementsByClassName('tabla-container')[0].style.visibility = 'visible';
}

function total(i, id, input) {
    if (valida(input) == true) {
        table = document.getElementById(id).children[0].children[i];
        value = 0;
        for (let index = 1; index < table.childElementCount - 1; index++) {
            value += parseInt(table.children[index].children[0].value);
        }
        table.lastElementChild.innerHTML = value;
    }
    
}

function win(id) {
    total1 = parseInt(document.getElementById(id).children[0].children[1].lastElementChild.innerHTML);
    total2 = parseInt(document.getElementById(id).children[0].children[2].lastElementChild.innerHTML);
    if (total1 > total2) {
        ganador = document.getElementById(id).children[0].children[1].firstElementChild.innerHTML;
    } else if (total2 > total1){
        ganador = document.getElementById(id).children[0].children[2].firstElementChild.innerHTML;
    } else {
        ganador = "EMPATE"
    }

    results_doc = document.getElementById(id == 'table1' ? 'resultado1' : 'resultado2');
    results_doc.innerHTML = ganador;
    results_doc.parentNode.className = 'resultado-show';
}

function finalResults() {
    resultado1 = document.getElementById('resultado1').innerHTML
    resultado2 = document.getElementById('resultado2').innerHTML

    if (resultado1 == resultado2 && resultado1 != "EMPATE") {
        document.getElementById('resultadofinal').innerHTML = '¡ '+resultado1+" ES EL GANADOR!"
    } else {
        if (resultado1 == "EMPATE") {
            if (resultado2 != "EMPATE") {
                document.getElementById('resultadofinal').innerHTML = '¡ '+resultado2+" ES EL GANADOR!"
            } else {
                document.getElementById('resultadofinal').innerHTML = "¡ RÉPLICA !"
            }
        } else {
            if (resultado2 == "EMPATE") {
                document.getElementById('resultadofinal').innerHTML = '¡ '+resultado1+" ES EL GANADOR!"
            } else {
                document.getElementById('resultadofinal').innerHTML = "¡ RÉPLICA !"
            }
        }
    }
    document.getElementById('resultadofinal').className = ""
}

//Habilita el boton de resultado final solo si hay 2 resultados
resultados = [document.getElementById('resultado1'), document.getElementById('resultado2')]
function habilitaBoton() {
    if (resultados[0].innerHTML != "" && resultados[1].innerHTML != "" ) {
        document.getElementById('btn-calc-final').parentNode.className = 'calc-final-container';
    }
}

//Verifica que no salga de rango
function valida(input) {
    prev_state = parseInt(input.oldValue);
    value = parseInt(input.value);
    min = parseInt(input.min);
    max = parseInt(input.max);
    if (value < min) {
        alert("Solo se permite "+min+" como mínima puntuación")
        input.value = prev_state;
        return false
    } else if (value > max) {
        alert("Solo se permite "+max+" como máxima puntuación")
        input.value = prev_state;
        return false
    }
    return true
}
