var data = null;
var data2 = null;
listeners();
//si se cumple entra a la raiz //
//mira el valor que hay dentro y mira con que caso encaja , es un if //
switch (window.location.pathname) {

	case "/senatesss.html":

		$.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/senate", function (json1) {
			data = json1.results[0].members;

			$.getJSON("java/apisenate.json", function (json2) {
				data2 = json2.results;
				crearTabla();

				//AQUI VAN LAS llamadas a las  FUNCIONES //


			});
		});
		//finaliza la funcion // 
		break;

	case "/house-starter-page.html":


		$.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/house", function (json3) {
			data = json3.results[0].members;
			$.getJSON("java/apicongress.json", function (json4) {
				data2 = json4.results;
				crearTabla();


			});


		});

};


function crearObj() {

	var arrayLimpia = []

	// suma de dos arrays//
	var arraySumada = data.concat(data2);

	for (var i = 0; i < arraySumada.length; i++) {

		var objeto = {};
		objeto.name = arraySumada[i].first_name;
		objeto.party = arraySumada[i].party;
		objeto.state = arraySumada[i].state;

		if (arraySumada[i].birthday == undefined) {
			objeto.seniority = arraySumada[i].seniority;
			objeto.porcent = arraySumada[i].votes_with_party_pct;
			objeto.birthday = "--"
			objeto.api = "NYT"
		} else {
			objeto.seniority = "--";
			objeto.porcent = "--";
			objeto.birthday = arraySumada[i].birthday;
			objeto.api = "SUN"
		}


		arrayLimpia.push(objeto);
	}
	return arrayLimpia;
}

function crearTabla() {

  // crea tabla //
	$("#tbody").empty();

	var array = crearObj();

	for (var i = 0; i < array.length; i++) {

		if (filtroSeCumple(array[i])) {

			var tr = document.createElement("tr");

			for (key in array[i]) {
				tr.insertCell().innerHTML = array[i][key];
			}

			$("#tbody").append(tr);
		}
	}
	// ocultar columna//
	$('td:nth-child(7),th:nth-child(7)').hide();

}


function filtroSeCumple(person) {
	var drop = document.getElementById("select");
	var filtro1 = checkboxArray().indexOf(person.party) != -1;
	var filtro2
	var filtro3 = apiArray().indexOf(person.api) != -1;

	return filtro1 && filtro3;

}
// para descartar R I D //
function checkboxArray() {
	//TODO: COMO VER CUAL SON LOS CHECKBOX CHECKED
	var filters = [];
	var rep = document.getElementById("REPUBLICAN").checked;
	var demo = document.getElementById("DEMOCRAT").checked;
	var ind = document.getElementById("INDEPENDENT").checked;
	var sun0 = document.getElementById("sun").checked;
	var nyt0 = document.getElementById("nyt").checked;

	if (rep) {
		filters.push("R")
	}

	if (demo) {
		filters.push("D")
	}

	if (ind) {
		filters.push("I")
	}
	if (!ind && !demo && !rep) {
		filters.push("R")
		filters.push("D")
		filters.push("I")

	}


	return filters;
}

function apiArray() {

	var array = [];
	var sun0 = document.getElementById("sun").checked;
	var nyt0 = document.getElementById("nyt").checked;

	if (sun0) {
		array.push("SUN");
	}

	if (nyt0) {
		array.push("NYT");
	}

	if (!nyt0 && !sun0) {
		array.push("NYT");
		array.push("SUN");
	}
	return array;
}



function listeners() {
	var repu = document.getElementById("REPUBLICAN");
	repu.addEventListener("click", crearTabla);
	var demo = document.getElementById("DEMOCRAT");
	demo.addEventListener("click", crearTabla);
	var inde = document.getElementById("INDEPENDENT");
	inde.addEventListener("click", crearTabla);
	//nuevo
	var sun1 = document.getElementById("sun");
	sun1.addEventListener("click", crearTabla);
	var nyt1 = document.getElementById("nyt");
	nyt1.addEventListener("click", crearTabla);
	//filtrar//

	var filtrar = document.getElementById("filtro");
	filtrar.addEventListener("click", crearTabla);

}
