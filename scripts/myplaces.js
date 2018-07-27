jQuery(document).ready(function() {
		
	var weatherURL;
	var historyText = "";
	var favouriteText = "";
		
	var tempF, tempC;
				
	function parseHistory() {
		var index = 0;
		$.each(JSON.parse(localStorage.getItem("history")), function(i, val) {
			if (val && index<5) {
				historyText += "<div class=\"panel panel-default\">";
				historyText += 	"<div class=\"panel-heading\">";
				historyText += 		"<h4 class=\"pull-left\">"+val.name+" <small> ~ " + val.date + "</small></h4>";
				historyText += 		"<div class=\"clearfix\"></div>";
				historyText += 	"</div>";
				historyText += 	"<div class=\"panel-body\">";
				historyText += 		"<div class=\"row col-sm-12\">"
				historyText += 			"<div class=\"col-sm-4\">"
				historyText += 				"<ul class=\"my-places weather-icon\">" + getIcon(val.icon) + "</ul>";
				historyText += 			"</div>";
				historyText += 			"<div class=\"col-sm-4\">"
				historyText += 				"<h2>" + val.tempC + "°C<br><small>" + val.tempF + "°F</small></h2>";
				historyText += 			"</div>";
				historyText += 			"<div class=\"col-sm-4\">"
				historyText +=				"<h2>" + val.weatherMain + "<br><small>" + val.weatherDescription + "</small></h2>";
				historyText += 			"</div>";
				historyText += 		"</div>";
				historyText += 	"</div>";
				historyText += "</div>";
				index++;
			}
		});
	};		
		
	function parseFavourites() {
		$.each(JSON.parse(localStorage.getItem("favourite")), function(i, val) {
			if (val) {
				weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + val.name + "&APPID=e523473ac8b78fc0eb0018a092bc08f5" ;
				weather();
			}
		});
	};
		
	function weather() {
		$.ajax({
			url: weatherURL,
			dataType: "json",
			success: function(openweather) {
				var id = openweather.name.replace(/\s/g, '_');
				var tempF = Math.round(openweather.main.temp * 9/5 - 459.67);
				var tempC = Math.round(openweather.main.temp - 273.15);
				var weatherMain = openweather.weather[0].main;
				var weatherDescription = capitalizeFirst(openweather.weather[0].description);
				var icon = openweather.weather[0].icon;
				var date = new Date(openweather.dt*1000).toString().substring(0, new Date(openweather.dt*1000).toString().indexOf("("));
				
				favouriteText += "<div class=\"panel panel-default\">";
				favouriteText += 	"<div class=\"panel-heading\">";
				favouriteText += 		"<h4 class=\"pull-left\">"+openweather.name+" <small> ~ " + date + "</small></h4>";
				favouriteText += 		"<button id=\"fav-"+id+"\" class=\"btn btn-danger pull-right data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Remove this place\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span></button>";
				favouriteText += 		"<div class=\"clearfix\"></div>";
				favouriteText += 	"</div>";
				favouriteText += 	"<div class=\"panel-body\">";
				favouriteText += 		"<div class=\"row col-sm-12\">"
				favouriteText += 			"<div class=\"col-sm-4\">"
				favouriteText += 				"<ul class=\"my-places weather-icon\">" + getIcon(icon) + "</ul>";
				favouriteText += 			"</div>";
				favouriteText += 			"<div class=\"col-sm-4\">"
				favouriteText += 				"<h2>" + tempC + "°C<br><small>" + tempF + "°F</small></h2>";
				favouriteText += 			"</div>";
				favouriteText += 			"<div class=\"col-sm-4\">"
				favouriteText +=				"<h2>" + weatherMain + "<br><small>" + weatherDescription + "</small></h2>";
				favouriteText += 			"</div>";
				favouriteText += 		"</div>";
				favouriteText += 	"</div>";
				favouriteText += "</div>";

				$("#favourites").html(favouriteText);
				getIcon(icon);
				

				$("button[id^='fav-']").on("click", function() {
					var favouriteInstance = JSON.parse(localStorage.getItem("favourite"));
					var city = this.id.split("-")[1].replace(/_/g, ' ');

					$.each(favouriteInstance, function(i, val) {
						if (val && val.name == city) {
							delete favouriteInstance[i];
						}
					});
					localStorage.setItem("favourite", JSON.stringify(favouriteInstance));
					location.reload();
				});
			}, error: function(jqXHR, exception) {
				if (jqXHR.status === 0) {
					$(".alert").hide();
					$(".alert-danger").show();
					$(".alert-text").replaceWith("<p class=\"alert-text\"><strong>Error!</strong> Verify the connection.</p>");
				} else if (jqXHR.status == 404) {
					$(".alert").hide();
					$(".alert-danger").show();
					$(".alert-text").replaceWith("<p class=\"alert-text\"><strong>Error!</strong> The city <strong>" + city + "</strong> has not been found.</p>");
				} else if (jqXHR.status == 500) {
					$(".alert").hide();
					$(".alert-danger").show();
					$(".alert-text").replaceWith("<p class=\"alert-text\"><strong>Error!</strong> Internal server error.</p>");
				} else if (exception === 'parsererror') {
					$(".alert").hide();
					$(".alert-danger").show();
					$(".alert-text").replaceWith("<p class=\"alert-text\"><strong>Error!</strong> Request parse JSON has failed.</p>");
				} else if (exception === 'timeout') {
					$(".alert").hide();
					$(".alert-danger").show();
					$(".alert-text").replaceWith("<p class=\"alert-text\"><strong>Error!</strong> Timeout error.</p>");
				} else if (exception === 'abort') {
					$(".alert").hide();
					$(".alert-danger").show();
					$(".alert-text").replaceWith("<p class=\"alert-text\"><strong>Error!</strong> Ajax request has been aborted.</p>");
				} else {
					$(".alert").hide();
					$(".alert-danger").show();
					$(".alert-text").replaceWith("<p class=\"alert-text\"><strong>Error!</strong> The city <strong>" + city + "</strong> has not been found.</p>");
				}
			}
		})
	};  
				
		
	parseHistory();
	parseFavourites();
		
	$("#history").html(historyText);
	$("#favourites").html(favouriteText);
		
	$(".btn-clear-history").on("click", function() {
		localStorage.removeItem("history");
		$("#history").html("");
		historyText = "";
		parseHistory();
		$("#history").html(historyText);
	});
		
	$(".btn-clear-favourite").on("click", function() {
		localStorage.removeItem("favourite");
		$("#favourites").html("");
		favouriteText = "";
		parseFavourites();
		$("#favourites").html(favouriteText);
	});
	
	function capitalizeFirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
		
	function getIcon(name) {
		if (name == "01d") {
			return "<li id=\"weather-icon-one\" class=\"icon-sun\"></li><li id=\"weather-icon-two\" class=\"\"></li>";
		} else if (name == "01n") {
			return "<li id=\"weather-icon-one\" class=\"icon-moon\"></li><li id=\"weather-icon-two\" class=\"\"></li>";
		} else if (name == "02d") {
			return "<li id=\"weather-icon-one\" class=\"basecloud\"></li><li id=\"weather-icon-two\" class=\"icon-sunny\"></li>";
		} else if (name == "02n") {
			return "<li id=\"weather-icon-one\" class=\"basecloud\"></li><li id=\"weather-icon-two\" class=\"icon-night\"></li>";
		} else if (name == "03d") {
			return "<li id=\"weather-icon-one\" class=\"icon-cloud\"></li><li id=\"weather-icon-two\" class=\"\"></li>";
		} else if (name == "03n") {
			return "<li id=\"weather-icon-one\" class=\"icon-cloud\"></li><li id=\"weather-icon-two\" class=\"\"></li>";
		} else if (name == "04d") {
			return "<li id=\"weather-icon-one\" class=\"icon-black-cloud\"></li><li id=\"weather-icon-two\" class=\"\"></li>";
		} else if (name == "04n") {
			return "<li id=\"weather-icon-one\" class=\"icon-black-cloud\"></li><li id=\"weather-icon-two\" class=\"\"></li>";
		} else if (name == "09d") {
			return "<li id=\"weather-icon-one\" class=\"basecloud\"></li><li id=\"weather-icon-two\" class=\"icon-showers icon-sunny\"></li>";
		} else if (name == "09n") {
			return "<li id=\"weather-icon-one\" class=\"basecloud\"></li><li id=\"weather-icon-two\" class=\"icon-showers icon-night\"></li>";
		} else if (name == "10d") {
			return "<li id=\"weather-icon-one\" class=\"basecloud\"></li><li id=\"weather-icon-two\" class=\"icon-rainy icon-sunny\"></li>";
		} else if (name == "10n") {
			return "<li id=\"weather-icon-one\" class=\"basecloud\"></li><li id=\"weather-icon-two\" class=\"icon-rainy icon-night\"></li>";
		} else if (name == "11d") {
			return "<li id=\"weather-icon-one\" class=\"basethundercloud\"></li><li id=\"weather-icon-two\" class=\"icon-thunder icon-sunny\"></li>";
		} else if (name == "11n") {
			return "<li id=\"weather-icon-one\" class=\"basethundercloud\"></li><li id=\"weather-icon-two\" class=\"icon-thunder icon-night\"></li>";
		} else if (name == "13d") {
			return "<li id=\"weather-icon-one\" class=\"basecloud\"></li><li id=\"weather-icon-two\" class=\"icon-snowy icon-sunny\"></li>";
		} else if (name == "13n") {
			return "<li id=\"weather-icon-one\" class=\"basecloud\"></li><li id=\"weather-icon-two\" class=\"icon-snowy icon-night\"></li>";
		} else if (name == "50d") {
			return "<li id=\"weather-icon-one\" class=\"icon-mist\"></li><li id=\"weather-icon-two\" class=\"\"></li>";
		} else if (name == "50n") {
			return "<li id=\"weather-icon-one\" class=\"icon-mist\"></li><li id=\"weather-icon-two\" class=\"\"></li>";
		} else {
			return "<li id=\"weather-icon-one\" class=\"\"></li><li id=\"weather-icon-two\" class=\"\"></li>";
		}
	};
});