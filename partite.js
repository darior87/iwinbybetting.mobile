$.ajax({
	url : 'http://api.iwinbybetting.ofunwebservices.com/index.php/partite/campionato/' + getParameterByName("n") + '/?callback=',
	type : "GET",
	dataType : "jsonp",
	success : function(data) {
		var url = getParameterByName("n");
		var json = eval(data);
		var content = "<ul data-role=\"listview\">";

		for (var i = 0; i < json.length; i++) {
			var partita = json[i];
			var d = partita['partita'].data.split(" ",3)[0].split("-");
			content += "<li>"+
                         "<a href=\"pronostici.html?id=" + partita['partita'].id + "\"><h3>" + partita['casa'].nome + " vs " + partita['trasferta'].nome + "</h3></a>"+
                         "<span class=\"ui-li-count\">" + d[2]+"/"+d[1]+"/"+d[0] + "</span>"+
                       "</li>";
		}

		content += "</ul>";
		$("#partite").html(content).trigger('create');
	},
	error : function(error) {
		alert('no good ' + JSON.stringify(error));
	}
});
     
     
    function menu(){
		$.mobile.changePage( "index.html", { transition: "slidefade"} );	
	} 
	function back(){
		$.mobile.changePage( "campionati.html", { transition: "slidefade"} );
	}
	               
