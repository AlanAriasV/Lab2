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

var participantes1 = new PaisSelector("pais_mc1", "pais1")
var participantes2 = new PaisSelector("pais_mc2", "pais2")
participantes1.detectaCambios()
participantes2.detectaCambios()

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
                out += '<button class="btn-participante" id=' + nombre + ' onClick=addMC(\'' + id_selector + '\',\'' + nombre + '\')>' + nombre + '</button>';
            }
        } else if (value.toLowerCase() == "chile") {
            for (const part in arr) {
                nombre = arr[part];
                out += '<button class="btn-participante" id=' + nombre + ' onClick=addMC(\'' + id_selector + '\',\'' + nombre + '\')>' + nombre + '</button>';
            }
        } else if (value.toLowerCase() == "españa") {
            for (const part in arr) {
                for (let index = 0; index < arr[part].length; index++) {
                    nombre = arr[part][index];
                    out += '<button class="btn-participante" id=' + nombre + ' onClick=addMC(\'' + id_selector + '\',\'' + nombre + '\')>' + nombre + '</button>';
                }
            }
        } else {
            for (const part in arr) {
                for (let index = 0; index < arr[part].length; index++) {
                    nombre = arr[part][index].NOMBRE;
                    out += '<button class="btn-participante" id=' + nombre + ' onClick=addMC(\'' + id_selector + '\',\'' + nombre + '\')>' + nombre + '</button>';
                }
            }
        }
        document.getElementById(id_selector == "pais_mc1" ? "partipantes-pais1" : "partipantes-pais2").innerHTML = out;
    }
}

function addMC(id, name) {
    document.getElementById('table1').children[0].children[id == "pais_mc1" ? 1 : 2].children[0].innerHTML = name;
    document.getElementById('table2').children[0].children[id == "pais_mc1" ? 1 : 2].children[0].innerHTML = name;
}

function total(i, id) {
    table = document.getElementById(id).children[0].children[i];
    value = 0;
    for (let index = 1; index < table.childElementCount - 1; index++) {
        value += parseInt(table.children[index].children[0].value);
    }
    table.lastElementChild.innerHTML = value;
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
    document.getElementById(id == 'table1' ? 'resultado1' : 'resultado2').innerHTML = ganador;
}

function finalResults() {
    resultado1 = document.getElementById('resultado1').innerHTML
    resultado2 = document.getElementById('resultado2').innerHTML

    if (resultado1 == "EMPATE" ){
        if (resultado2 == "EMPATE"){
            document.getElementById('resultadofinal').innerHTML = "EMPATE"
        } else {
            document.getElementById('resultadofinal').innerHTML = resultado2
        }
    } else {
        if (resultado2 == "EMPATE") {
            document.getElementById('resultadofinal').innerHTML = resultado1
        } else if (resultado1 == resultado2) {
            document.getElementById('resultadofinal').innerHTML = resultado1
        } else {
            document.getElementById('resultadofinal').innerHTML = resultado2
        }
    }
}

