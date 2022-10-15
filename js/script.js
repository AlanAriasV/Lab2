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
<<<<<<< HEAD
            this.valor_actual = this.value;
            botones();
=======
            data(this.id, this.value);
>>>>>>> c6e23dc7ac37247abe7c485ce5033b73fb1622b1
        }
        document.getElementById(this.id_selector).onchange = listQ;
    }
}

var participantes1 = new PaisSelector("pais_mc1", "pais1")
var participantes2 = new PaisSelector("pais_mc2", "pais2")
participantes1.detectaCambios()
participantes2.detectaCambios()

<<<<<<< HEAD
function botones() {
    var xmlhttp = new XMLHttpRequest();
    var url = "data/argentina2.json";
    
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        myFunction(myArr);
        }
    };
    
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    function myFunction(arr) {
        var out = "";
        var i;
        for(i = 0; i < arr.length; i++) {
            nombre = arr[i].PARTICIPANTE.NOMBRE
            out += '<button class="btn-participante" id='+nombre+'>'+nombre+'</button>';
        }
        document.getElementById("partipantes-pais1").innerHTML = out;
    }
}
=======
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
        if (value.toLowerCase() == "argentina") {
            for (const part in arr) {
                nombre = arr[part].NOMBRE
                out += '<button class="btn-participante" id=' + nombre + '>' + nombre + '</button>';
            }
        } else if (value.toLowerCase() == "chile") {
            for (const part in arr) {
                nombre = arr[part];
                out += '<button class="btn-participante" id=' + nombre + '>' + nombre + '</button>';
            }
        } else if (value.toLowerCase() == "españa") {
            for (const part in arr) {
                for (let index = 0; index < arr[part].length; index++) {
                    nombre = arr[part][index];
                    out += '<button class="btn-participante" id=' + nombre + '>' + nombre + '</button>';
                }
            }
        } else {
            for (const part in arr) {
                // console.log(arr[part]);
                for (let index = 0; index < arr[part].length; index++) {
                    nombre = arr[part][index].NOMBRE;
                    out += '<button class="btn-participante" id=' + nombre + '>' + nombre + '</button>';
                }
            }
        }
        document.getElementById(id_selector == "pais_mc1" ? "partipantes-pais1" : "partipantes-pais2").innerHTML = out;
    }
}

// this.value.toLowerCase()


// function changeSelector(id, value) {
//     console.log(value)
// }
>>>>>>> c6e23dc7ac37247abe7c485ce5033b73fb1622b1
