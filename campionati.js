
	function changePage(){
		$.mobile.changePage( "index.html", { transition: "slidefade"} );	
	}
	$(document).ready(function(){
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