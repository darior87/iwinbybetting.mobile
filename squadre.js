$.getJSON('http://api.iwinbybetting.ofunwebservices.com/squadre/get/'+getParameterByName("id"), function(data) {
	var url = getParameterByName("id");
	var json = JSON.parse(data);
	var content = "<ul data-role=\"listview\">";
	
	while(json.length > 0){
		var champ = json.pop();
		content+= "<li><a href=\"pronostici.html?id="+champ.nome+"\"><img src=\"iwinbybetting.ofunwebservices.com/campionati/"+champ.nome+"."+champ.image+"\" alt=\"\" class=\"ul-li-icon\" /><h3>"+champ.nome+"</h3></a></li>";
	}

	content += "</ul>";
    document.getElementById('squadre').innerHTML = content;
    
}); 

function getParameterByName(name){
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex  new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if(result == null){
		return "";
	}
	else{
		return decodeURIComponent(results[1].replace(/\+/g," "));
	}
}
