
$(document).ready(function(){
	
var apiData = 0 ; 

 switch(window.location.pathname) {
		 
		 
	 case "/senatesss.html":
		 $.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/senate", function(data){
			 apiData=data;
			 creartabla();
			 getFilters();
			 
		 });
		 
		 break;
		
 };
};

