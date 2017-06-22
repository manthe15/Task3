$(function () {

	var artistsAdded = [];

	$("#search").click(searchArtist);


	function searchArtist() {

		var name = $("#name").val();

		var spotify = "https://api.spotify.com/v1/search?query=" + name + "&type=artist";

		$.getJSON(spotify, function (data) {

			console.log(data);
			crearTabla(data);


		});

	}


	function crearTabla(data) {
		$("#body").empty();

		var artists = data.artists.items;

		$.each(artists, function (key, value) {

			var row = document.createElement("tr");

			if (value.images[0] != undefined) {
				var url = value.images[0].url;

			} else {

				var url = "http://mastersofmedia.hum.uva.nl/wp-content/uploads/2011/09/wikipedia-blog-week-4.jpg";
			}

			row.insertCell().innerHTML = "<img src='" + url + "'>";
			row.insertCell().innerHTML = value.name;
			row.insertCell().innerHTML = value.popularity;
			row.insertCell().innerHTML = "<button data-key='" + key + "'class='addButton btn btn-info'> Add to MyList </button>";

			$("#body").append(row);

		});

		$(".addButton").click(function () {

			var dataKeyValue = $(this).attr("data-key");

			var artists1 = artists[dataKeyValue];
			$(this).hide();

			addArtist(artists1)
		});
	}

	function addArtist(artists1) {
		artistsAdded.push(artists1);

		var row = document.createElement("tr");

		if (artists1.images[0] != undefined) {
			var url = artists1.images[0].url;

		} else {

			var url = "http://mastersofmedia.hum.uva.nl/wp-content/uploads/2011/09/wikipedia-blog-week-4.jpg";
		}
		row.insertCell().innerHTML = "<img src='" + url + "'>";
		row.insertCell().innerHTML = artists1.name;
		$("#body2").append(row);


	}
});
