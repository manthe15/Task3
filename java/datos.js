var data = null;

switch (window.location.pathname) {

	case "/senatesss.html":



		$.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/senate", function (json) {
			data = json;
			getFilters();
			creartabla();
			sunlightCongress();

		});
		break;

	case "/house-starter-page.html":


		$.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/house", function (json) {
			data = json;
			getFilters();
			creartabla();
			sunlightSenate();

		});


};



function sunlightCongress() {

	$.getJSON("java/apicongress.json", function (ex) {
		//data = json;
		//getFilters();
		// creartabla(); 
		console.log(ex);
	});
};

function sunlightSenate() {


	$.getJSON("java/apisenate.json", function (ex2) {
		//data = json;
		//getFilters();
		//creartabla(); 
		console.log(ex2);

	});

};

sunlightCongress();
sunlightSenate();


function getFilters() {
	//TODO: COMO VER CUAL SON LOS CHECKBOX CHECKED
	var filters = [];
	var rep = document.getElementById("REPUBLICAN").checked;
	var demo = document.getElementById("DEMOCRAT").checked;
	var ind = document.getElementById("INDEPENDENT").checked;
	//nuevo
	var sun0 = document.getElementById("sun").checked;
	var nyt0 = document.getElementById("nyt").checked ;
	


	if (rep) {
		filters.push("R")
	}

	if (demo) {
		filters.push("D")
	}

	if (ind) {
		filters.push("I")
	}
	if (!ind && !demo && !rep && !sun0 && !nyt0) {
		filters.push("R")
		filters.push("D")
		filters.push("I")
		filters.push("S")
		filters.push("Y")
		
	}
	
	if (sun0){
		filters.push("S")
	}
	
	if(nyt0) {
		filters.push("Y")
	}
	



	console.log(filters);

	return filters;
}


function creartabla() {

	var members = data.results[0].members;

	var tbl = document.getElementById("taabla");
	var tbody = document.createElement("tbody");

	while (tbl.rows.length > 0) {
		tbl.deleteRow(0);
	}


	var filters = getFilters();


	//	filters.indexOf(VALOR) == -1 >> no esta en el array

	// PARA CADA MEMBRO
	for (var i = 0; i < members.length; i++) {

		var row = document.createElement("tr");
		tbody.appendChild(row);

		if (filters.indexOf(members[i].party) != -1) {

			row.insertCell().innerHTML = members[i].first_name + ", " + members[i].last_name;
			row.insertCell().innerHTML = members[i].party;
			row.insertCell().innerHTML = members[i].state;
			row.insertCell().innerHTML = members[i].seniority;
			row.insertCell().innerHTML = members[i].votes_with_party_pct + "%";
		}

	}
	tbl.appendChild(tbody);
}


var repu = document.getElementById("REPUBLICAN");
repu.addEventListener("click", creartabla);
var demo = document.getElementById("DEMOCRAT");
demo.addEventListener("click", creartabla);
var inde = document.getElementById("INDEPENDENT");
inde.addEventListener("click", creartabla);
//nuevo
var sun1 = document.getElementById("sun");
sun1.addEventListener("click", creartabla);
var nyt1= document.getElementById("nyt");
nyt1.addEventListener("click", creartabla);







//tarea 3








/*console.log(senates)

function crearTabla() {

	var table1 = "<table>";


	table1 += "<tr><th>Name</th><th>First Name</th><th>Party</th><th>State</th><th>Years in Office</th><th>Votes%</th></tr>"



	for (var i = 0; i < senates.results[0].members.length; i++) {
		
		
		
		console.log(senates.results[0].members);
		console.log(senates.results[0].members[i].first_name);
		console.log(senates.results[0].members[i].party);
		console.log(senates.results[0].members[i].state);
		console.log(senates.results[0].members[i].seniority);
		console.log(senates.results[0].members[i].total_votes);


		table1 += "<tr><td>" + senates.results[0].members[i].first_name +
			"</td><td>" + senates.results[0].members[i].last_name + "</td><td>" +
			senates.results[0].members[i].party + "</td><td>" + senates.results[0].members[i].state + "</td><td>" +
			senates.results[0].members[i].seniority + "</td><td>" +
			senates.results[0].members[i].votes_with_party_pct + "%"  + "</td></tr>";

	};

	document.getElementById("taabla").innerHTML = table1;
}

crearTabla(senates)*/

/*
console.log(data[0]);

function crearTabla(titulo) {
	
	
	var tit = "<h1>" + titulo + "</h1>";
	
	
	var mytable = "<table>";
 	
	mytable += "<tr><th>Name</th><th>Age</th><th>Gender</th></tr>" ;
	
	
	
	

	// PARA CADA OBJETO DE LA ARRAY DATA //
	for (var i=0 ; i<data.length ; i++ ) {
		console.log(data[i].name);
		
		console.log(data[i].age);
		
		console.log(data[i].gender);
		
		
		
		
		// INCLUIR UNA LINEA EN LA TABLE PARA EL OBJETO 
		mytable = mytable + "<tr><td>" + data[i].name +  "</td><td>" + data[i].age +  "</td><td>" + data[i].gender +  "</td></tr>";
		
		
		
		
	
	}
document.getElementById("tabla").innerHTML = tit + mytable;
	
}



crearTabla("MI TABLA");

*/
