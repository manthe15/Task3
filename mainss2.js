$.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/house",
	function (data) {
		var template =
			"{{#results}}{{#members}}\
			<tr>\
            <td>{{firts_name}}{{last_name}}</td>\
            <td>{{party}}</td>\
            <td>{{state}}</td>\
            </tr>\
			{{/members}}{{/results}}";
	
	
	var html = Mustache.to_html(template , data);
	$("#body").append(html);
	})



	
	setFooter();
	function setFooter () {
		
		var data = {
			year : 2017
		}
		
	var template =
		"<footer class'navbar-fixed-bottom'>\
        <div class='container'>\
   		<p> I've created this sticky footer with Mustache .Copyright{{year}}</p>\
		</div>\
		</footer>" ;
		
		var html = Mustache.to_html( template, data);
	   $("body").append(html);
		
		
}

setNavBar()


function setNavBar() {
	
	var data;
	
	$.get("navbar.html", function(templates){
	var template = $(templates).filter("#navbar").html();
	var html = Mustache.to_html(template , data)	
		
	$('body').prepend(html);
		
	})
	
}
	
	

	
