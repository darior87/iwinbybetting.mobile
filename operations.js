// campionati.js
$(document).on('pagebeforeshow', '#page-campionati', function(){  
   
	$(document).off('click').on('click', '#campionati-back-button, #campionati-menu-button', function(){    
		$.mobile.changePage( "index.html", { transition: "fade"} );	
	});
	
	$.ajax({
		url : 'http://api.iwinbybetting.ofunwebservices.com/index.php/campionati/active/?callback=?',
		type : "GET",
		dataType : "jsonp",
		success : function(data) {
			var content = "<ul data-role='listview'>";
	
			var json = eval(data);
			for (var i = 0; i < json.length; i++) {
				content += "<li><a href='partite.html?n=" + json[i].nome + "'><img src='http://iwinbybetting.ofunwebservices.com/public/campionati/" + json[i].nome + "." + json[i].image + "' alt='' class='ul-li-icon' /><h3>" + json[i].nome + "</h3></a></li>";
			}
	
			$("#campionati").html(content + "</ul>").trigger('create');
		},
		error : function(error) {
			alert('no good ' + JSON.stringify(error));
		}
	}); 
});
// schedina.js
$(document).on('pagebeforeshow', '#page-schedina', function(){  
   
	$(document).off('click').on('click', '#schedina-back-button, #schedina-menu-button', function(){    
		$.mobile.changePage( "index.html", { transition: "fade"} );	
	});
	
	$.ajax({
	url : 'http://api.iwinbybetting.ofunwebservices.com/index.php/pronostici/generateHits/'+getParameterByName("r")+'/?callback=?',
	type : "GET",
	dataType : "jsonp",
	success : function(data) {
		var json = eval(data);
		var content = "<ul data-role=\"listview\">";
		for (var i = 0; i < json.length; i++) {
			var d =json[i].partita.data.data.split(" ",3)[0].split("-");
			var campionato = "<img src=\"http://iwinbybetting.ofunwebservices.com/public/campionati/"+json[i].partita.campionato.nome+"."+json[i].partita.campionato.image+"\" width='60px'  alt='' class='ul-li-icon' />";
			content += "<li data-role='list-divider'><div class='ui-grid-a'>"+
				"<div class='ui-block-a'>"+campionato+"</div></div>"+
				"<div class='ui-grid-a'><div class='ui-block-a'><h3>"+json[i].partita.casa.nome+" vs "+json[i].partita.trasferta.nome+"</h3>"+
			"</div><span class=\"ui-li-aside\">"+d[2]+"/"+d[1]+"/"+d[0]+"</span></li>";
			var pronostico = json[i].pronostico;
			content += "<li>"+
                         "<h6></h6><p>" + pronostico.testo + "</p>"+
                         "<span class=\"ui-li-count\">Rischio = " + pronostico.rischio + "</span>"+
                       "</li>";
		}

		content += "</ul>";
		$("#schedina").html(content).trigger('create');
	},
	error : function(error) {
		alert('no good '+JSON.stringify(error));
	}
});
});

// partite.js
$(document).on('pagebeforeshow', '#page-partite', function(){   
	
	$('#partite-menu-button').off('click').on('click', function(){    
		$.mobile.changePage( "index.html", { transition: "fade"} );	
	});
	
	$('#partite-back-button').off('click').on('click', function(){
		$.mobile.changePage( "campionati.html", { transition: "fade"} );	
	});	
  
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
				/*content += "<li>"+
							 "<a href=\"pronostici.html?id=" + partita['partita'].id + "\"><h3>" + partita['casa'].nome + " vs " + partita['trasferta'].nome + "</h3></a>"+
							 "<span class=\"ui-li-count\">" + d[2]+"/"+d[1]+"/"+d[0] + "</span>"+
						   "</li>";*/
			     content += "<li>"+
							 "<a href=\"pronostici.html?id=" + partita['partita'].id + "\">"+
							 	"<div class='ui-grid-a'>"+
							 		"<div class='ui-block-a'><div align='center'><img src='http://iwinbybetting.ofunwebservices.com/public/squadre/" + partita['casa'].nome + "."+partita['casa'].image+"' class='ul-li-icon' width='60px' /></div></div>" + 
							 		"<div class='ui-block-b'><div align='center'><img src='http://iwinbybetting.ofunwebservices.com/public/squadre/" + partita['trasferta'].nome + "."+partita['trasferta'].image+"' class='ul-li-icon' align='center' width='60px' /></div></div>" + 
							 	"</div>"+
							 	"<div class='ui-grid-a'>"+
							 		"<div class='ui-block-a'><div align='center'>"+partita['casa'].nome+"</div></div>" + 
							 		"<div class='ui-block-b'><div align='center'>"+partita['trasferta'].nome+"</div></div>" + 
							 	"</div>"+
							 "</a>"+
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
});   

$(document).on('pageshow', '#page-pronostici', function(){   
		
	$('#partite-menu-button').off('click').on('click', function(){    
		$.mobile.changePage( "index.html", { transition: "fade"} );	
	});
	
	$('#partite-back-button').off('click').on('click', function(){
		$.mobile.changePage( "campionati.html", { transition: "fade"} );	
	});	
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
}); 
     

function getParameterByName(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}
function reloadSlider(){
	window.location.href = "schedina.html?r="+document.getElementById('slider').value;
}

function setSlider(){
	$("#slider").val(getParameterByName("r"));
 	$("#slider").slider('refresh');
 
}


