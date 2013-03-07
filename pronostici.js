
 	$.ajax({
	url : 'http://api.iwinbybetting.ofunwebservices.com/index.php/pronostici/get/' + getParameterByName("id") + '/?callback=?',
	type : "GET",
	dataType : "jsonp",
	success : function(data) {
		var json = eval(data);
		var content = "<ul data-role=\"listview\">";
		var d =json['data'].data.split(" ",3)[0].split("-");
		content += "<li data-role='list-divider'><p><h3>"+json['casa'].nome+" vs "+json['trasferta'].nome+"</h3><span class=\"ui-li-aside\">"+d[2]+"/"+d[1]+"/"+d[0]+"</span></p></li>";
		for (var i = 0; i < json['pronostici'].length; i++) {
			var pronostico = json['pronostici'][i];
			content += "<li>"+
                         "<h6></h6><p>" + pronostico['testo'] + "</p>"+
                         "<span class=\"ui-li-count\">Rischio = " + pronostico['rischio'] + "</span>"+
                       "</li>";
		}

		content += "</ul>";
		$("#pronostici").html(content).trigger('create');
	},
	error : function(error) {
		alert('no good ' + JSON.stringify(error));
	}
});

