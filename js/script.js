const argentina = '../data/argentina.json';
const chile = '../data/chile.json'; 
const espana = '../data/espana.json' 
const mexico = '../data/mexico.json'; 

class PaisSelector {
    constructor(id_selector, id_valor) {
        this.id_selector = id_selector;
        this.id_valor = id_valor
        this.valor_actual = ""
    }

    detectaCambios() {
        var changedText = document.getElementById(this.id_valor);
        function listQ(){
            changedText.textContent = this.value;
            this.valor_actual = this.value;
            botones();
        }
        document.getElementById(this.id_selector).onchange = listQ;
    }
}

var participantes1 = new PaisSelector("pais_mc1", "pais1")
var participantes2 = new PaisSelector("pais_mc2", "pais2")
participantes1.detectaCambios()
participantes2.detectaCambios()

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
