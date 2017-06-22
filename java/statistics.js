var statis = {
	"stats": [
		{

			"party": 'republicans',
			"noOfRep": 0,
			"porcent": 0,

		},
		{

			"party": "democrats",
			"noOfRep": 0,
			"porcent": 0,

		},
		{

			"party": "independents",
			"noOfRep": 0,
			"porcent": 0,

		},
		{

			"party": "Total",
			"noOfRep": 0,
			"porcent": 0,

		},


	]


};

// numero de  miembros // 
function numberDeReps() {
	var numberRep = [];
	var numberInd = [];
	var numberDem = [];
	var numbertotal = [];
	var votesRep = 0;
	var votesInd = 0;
	var votesDem = 0;
	var totalvotes = 0;





	var currentMembers = data.results[0].members;

	for (var i = 0; i < currentMembers.length; i++) {

		if (currentMembers[i].party == "I") {
			numberInd.push(currentMembers[i]);
			votesInd += parseFloat(currentMembers[i].votes_with_party_pct);
		}
		if (currentMembers[i].party == "D") {
			numberDem.push(currentMembers[i]);
			votesDem += parseFloat(currentMembers[i].votes_with_party_pct);
		}
		if (currentMembers[i].party == "R") {
			numberRep.push(currentMembers[i]);
			votesRep += parseFloat(currentMembers[i].votes_with_party_pct);

		}
	}



	statis.stats[0].noOfRep = numberDem.length;
	statis.stats[1].noOfRep = numberRep.length;
	statis.stats[2].noOfRep = numberInd.length;
	statis.stats[0].porcent = (votesDem / numberDem.length).toFixed(2);
	statis.stats[1].porcent = (votesRep / numberRep.length).toFixed(2);
	statis.stats[2].porcent = (votesInd / numberInd.length).toFixed(2);

	statis.stats[3].noOfRep = numberDem.length + numberRep.length + numberInd.length;



	var cellRepublic = document.getElementById("noRepe");
	var cellIndepent = document.getElementById("noRepe1");
	var cellDemocrat = document.getElementById("noRepe2");
	var porcen1 = document.getElementById("por1");
	var porcen2 = document.getElementById("por2");
	var porcen3 = document.getElementById("por3");

	//NURIA 
	var total1 = document.getElementById("total11");
	total1.innerHTML = statis.stats[3].noOfRep;




	var dem = statis.stats[0].noOfRep;
	var repp = statis.stats[1].noOfRep;
	var demoo = statis.stats[2].noOfRep;
	var porcendem = statis.stats[0].porcent + "%";
	var porcenrep = statis.stats[1].porcent + "%";
	var porcenind = statis.stats[2].porcent + "%";

	//NURIA2
	var totalvotes = (votesDem / numberDem.length) + (votesRep / numberRep.length) + (votesInd / numberInd.length);
	var mVotes = totalvotes / 3

	cellRepublic.innerHTML = dem;
	cellIndepent.innerHTML = repp;
	cellDemocrat.innerHTML = demoo;
	porcen1.innerHTML = porcendem;
	porcen2.innerHTML = porcenrep;

	porcen3.innerHTML = porcenind;

	var total2 = document.getElementById("total22");
	total2.innerHTML = mVotes.toFixed(2) + "%";

};


// Intenta encontrar una forma distinta para resolver las dos funciones de aquí abajo
// Una función debe devolver el 10% de los tíos con menos votos y el otro el 10% con más
// PISTA: ordena primero el array de miembros por el numero de votos (es decir, que el primer miembro del array
// será el que tenga menos votos, y el último miembro será el que tenga más votos)


function filtrarArray() {
	var members = data.results[0].members;
	for (var i = 100; i <= members.length; i = i - 0.01) {
		var filterArray = members.filter(function (data) {
			return data.votes_with_party_pct >= i;
		});
		if (filterArray.length >= members.length * 0.1) {
			return filterArray;
				
			break;
		};
	};
} ;
function filtrarArray2() {
	var members = data.results[0].members;
	for (var i = 0; i <= members.length; i = i + 0.01) {
		var filterArray = members.filter(function (data) {
			return data.votes_with_party_pct <= i;
		});
		if (filterArray.length >= members.length * 0.1) {
			return filterArray;
				
			break;
		}
	}
};



function llenarTabla(idTabla) {

	if (idTabla == 1) {
		var tabla = document.getElementById("table1");
		var members = filtrarArray();
		//NEcesitamos los miembros filtrados de mayor a menor. Los tenemos en filtrarArray();
	} else if(idTabla == 2){
		var tabla = document.getElementById("table2");
		var members = filtrarArray2();
		
		//NEcesitamos los miembros filtrados de menor a mayor. Los tenemos que hacer en otra función.;
		
	}

	for (var i = 0; i < members.length; i++) {
		var row = document.createElement("tr");

		row.insertCell().innerHTML = members[i].first_name + ", " + members[i].last_name;
		row.insertCell().innerHTML = members[i].total_votes;
		row.insertCell().innerHTML = members[i].votes_with_party_pct + "%";

		tabla.append(row);
	}
}

numberDeReps();
llenarTabla(1);
llenarTabla(2);


   

