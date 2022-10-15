const argentina = '../data/argentina.json';
const chile = '../data/chile.json'; 
const espana = '../data/espana.json' 
const mexico = '../data/mexico.json'; 

var xmlhttp = new XMLHttpRequest();

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
        }
        document.getElementById(this.id_selector).onchange = listQ;
    }
}

var participantes1 = new PaisSelector("pais_mc1", "pais1")
var participantes2 = new PaisSelector("pais_mc2", "pais2")
participantes1.detectaCambios()
participantes2.detectaCambios()
//xmlhttp.open("GET", "datos.json", true);
//xmlhttp.send();