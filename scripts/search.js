jQuery(document).ready(function() {

	mapFocus(50, 15, 1);
	empty();
	
	var city;
	var state;
	var lat;
	var lon;
	var weatherURL;
	var tempF;
	var tempC;
	var date;
	var humidity;
	var weatherMain;
	var weatherDescription;
	var realCity;
	
	function mapFocus(lattitude, longitude, zoom) {
		var map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: lattitude, lng: longitude},
			zoom: zoom
		});
	};
  	
	function weather() {
		$.ajax({
			url: weatherURL,
			dataType: "json",
			success: function(openweather) {
				tempF = Math.round(openweather.main.temp * 9/5 - 459.67);
				tempC = Math.round(openweather.main.temp - 273.15);
				date = new Date(openweather.dt*1000).toString().substring(0, new Date(openweather.dt*1000).toString().indexOf("("));
				weatherMain = openweather.weather[0].main;
				weatherDescription = capitalizeFirst(openweather.weather[0].description);
				humidity = openweather.main.humidity + "% humidity";
				pressure = openweather.main.pressure + " hPa";
				realCity = openweather.name;
				
				var wind = windDegToDir(openweather.wind.deg) + " wind, " + openweather.wind.speed + " m/s";
				var icon = openweather.weather[0].icon;
				
				$(".alert").hide();
				if (openweather.name.length > 0) {
					$(".btn-favourite").removeClass("disabled");
					$(".btn-favourite").attr("data-original-title","Add " + realCity + " to favourites");
				}
						
				$(".weather").replaceWith("<h2 class=\"weather\">" + weatherMain + "<br><small>" + weatherDescription+"</small></h2>");
				$(".temperature").replaceWith("<h2 class=\"temperature\">" + tempC + "°C <small>" + tempF + "°F</small></h2>");
				$(".location").replaceWith("<h2 class=\"location\">" + realCity + ", " + openweather.sys.country+ "</h2>");
				$(".date").replaceWith("<p class=\"date\">" + date + "</p>");
				$(".pressure").replaceWith("<h4 class=\"pressure\">" + pressure + "</h4>");
				$(".humidity").replaceWith("<h4 class=\"humidity\">" + humidity + "</h4>");
				$(".wind").replaceWith("<h4 class=\"wind\">" + wind + "</h4>");
				
				var historyInstance = JSON.parse(localStorage.getItem("history"));
				if(!historyInstance){
					var historyInstance = JSON.parse('[]');
				}
								
				$.each(historyInstance, function(i, val) {
					if (val && val.name == realCity) {
						delete historyInstance[i];
					}
				});

				var historyCity = {name: realCity, tempC: tempC, tempF: tempF, date: date, icon: icon, weatherMain: weatherMain, weatherDescription: weatherDescription};
				historyInstance.unshift(historyCity);
				localStorage.setItem("history", JSON.stringify(historyInstance));
				
				getIcon(icon);
				mapFocus(openweather.coord.lat, openweather.coord.lon, 10);

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
	
	function addFavourite() {
		var favouriteInstance = JSON.parse(localStorage.getItem("favourite"));
		if(!favouriteInstance){
			var favouriteInstance = JSON.parse('[]');
		}
		var add = true;
		var historyCity = {name: realCity};
		$.each(favouriteInstance, function(i, val) {
			if (val && val.name == realCity) {
				$(".alert").hide();
				$(".alert-warning").show();
				$(".alert-text").replaceWith("<p class=\"alert-text\"><strong>Warning!</strong> The city <strong>" + realCity + "</strong> is already in favourite places.</p>");
				add = false;
			}
		});
		if (add) {
			favouriteInstance.unshift(historyCity);
			localStorage.setItem("favourite", JSON.stringify(favouriteInstance));
			$(".alert").hide();
			$(".alert-success").show();
			$(".alert-text").replaceWith("<p class=\"alert-text\"><strong>Success!</strong> The city <strong>" + realCity + "</strong> has not been added to favourites.</p>");
		}	
	};
		
	$(".cityname").keypress(function(e) {
		if (e.which == 13) {
			$(".btn-favourite").addClass("disabled");
			getCity();
		}
	});
	
	$(".btn-primary").on("click", function() {
		$(".alert").hide();
		$(".btn-favourite").addClass("disabled");
		getCity();
	});
	
	$(".btn-favourite").on("click", function() {
		if (!$(".btn-favourite").hasClass("disabled")) {
			addFavourite();
		}
	});
  
	$(".alert-close").on("click", function() {
		$(".alert").hide();
	});
	
	function capitalizeFirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};	
	
	function getCity() {
		city = $(".cityname").val();
		weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=e523473ac8b78fc0eb0018a092bc08f5" ;
		weather();
	};
	
	function empty() {
	    $(".lab-h1").text('');
		$(".weather").text('');
		$(".temperature").text('');
		$(".location").text('');
		$(".date").text('');
		$(".pressure").text('');
		$(".humidity").text('');
		$(".wind").text('');
	};
	
	function windDegToDir(degree) {
		if (degree >= 0 && degree < 22.5) {return "Northerly";}
		else if (degree >= 22.5 && degree < 67.5) {return "North-easterly";}
		else if (degree >= 67.5 && degree < 112.5) {return "Easterly";}
		else if (degree >= 112.5 && degree < 157.5) {return "South-easterly";}
		else if (degree >= 157.5 && degree < 202.5) {return "Southerly";}
		else if (degree >= 202.5 && degree < 257.5) {return "South-westerly";}
		else if (degree >= 257.5 && degree < 292.5) {return "Westerly";}
		else if (degree >= 292.5 && degree < 337.5) {return "North-westerly";}
		else if (degree > 337.5 ) {return "Northerly";}	
	};
	
	function getIcon(name) {
		if (name == "01d") {
			$("#weather-icon-one").replaceWith("<li id=\"weather-icon-one\" class=\"icon-sun\"></li>");
			$("#weather-icon-two").replaceWith("<li id=\"weather-icon-two\" class=\"\"></li>");
		} else if (name == "01n") {
			$("#weather-icon-one").replaceWith("<li id=\"weather-icon-one\" class=\"icon-moon\"></li>");
			$("#weather-icon-two").replaceWith("<li id=\"weather-icon-two\" class=\"\"></li>");
		} else if (name == "02d") {
			$("#weather-icon-one").replaceWith("<li id=\"weather-icon-one\" class=\"basecloud\"></li>");
			$("#weather-icon-two").replaceWith("<li id=\"weather-icon-two\" class=\"icon-sunny\"></li>");
		} else if (name == "02n") {
			$("#weather-icon-one").replaceWith("<li id=\"weather-icon-one\" class=\"basecloud\"></li>");
			$("#weather-icon-two").replaceWith("<li id=\"weather-icon-two\" class=\"icon-night\"></li>");
		} else if (name == "03d") {
			$("#weather-icon-one").replaceWith("<li id=\"weather-icon-one\" class=\"icon-cloud\"></li>");
			$("#weather-icon-two").replaceWith("<li id=\"weather-icon-two\" class=\"\"></li>");
		} else if (name == "03n") {
			$("#weather-icon-one").replaceWith("<li id=\"weather-icon-one\" class=\"icon-cloud\"></li>");
			$("#weather-icon-two").replaceWith("<li id=\"weather-icon-two\" class=\"\"></li>");
		} else if (name == "04d") {
			$("#weather-icon-one").replaceWith("<li id=\"weather-icon-one\" class=\"icon-black-cloud\"></li>");
			$("#weather-icon-two").replaceWith("<li id=\"weather-icon-two\" class=\"\"></li>");
		} else if (name == "04n") {
			$("#weather-icon-one").replaceWith("<li id=\"weather-icon-one\" class=\"icon-black-cloud\"></li>");
			$("#weather-icon-two").replaceWith("<li id=\"weather-icon-two\" class=\"\"></li>");
		} else if (name == "09d") {
			$("#weather-icon-one").replaceWith("<li id=\"weather-icon-one\" class=\"basecloud\"></li>");
			$("#weather-icon-two").replaceWith("<li id=\"weather-icon-two\" class=\"icon-showers icon-sunny\"></li>");
		} else if (name == "09n") {
			$("#weather-icon-one").replaceWith("<li id=\"weather-icon-one\" class=\"basecloud\"></li>");
			$("#weather-icon-two").replaceWith("<li id=\"weather-icon-two\" class=\"icon-showers icon-night\"></li>");
		} else if (name == "10d") {
			$("#weather-icon-one").replaceWith("<li id=\"weather-icon-one\" class=\"basecloud\"></li>");
			$("#weather-icon-two").replaceWith("<li id=\"weather-icon-two\" class=\"icon-rainy icon-sunny\"></li>");
		} else if (name == "10n") {
			$("#weather-icon-one").replaceWith("<li id=\"weather-icon-one\" class=\"basecloud\"></li>");
			$("#weather-icon-two").replaceWith("<li id=\"weather-icon-two\" class=\"icon-rainy icon-night\"></li>");
		} else if (name == "11d") {
			$("#weather-icon-one").replaceWith("<li id=\"weather-icon-one\" class=\"basethundercloud\"></li>");
			$("#weather-icon-two").replaceWith("<li id=\"weather-icon-two\" class=\"icon-thunder icon-sunny\"></li>");
		} else if (name == "11n") {
			$("#weather-icon-one").replaceWith("<li id=\"weather-icon-one\" class=\"basethundercloud\"></li>");
			$("#weather-icon-two").replaceWith("<li id=\"weather-icon-two\" class=\"icon-thunder icon-night\"></li>");
		} else if (name == "13d") {
			$("#weather-icon-one").replaceWith("<li id=\"weather-icon-one\" class=\"basecloud\"></li>");
			$("#weather-icon-two").replaceWith("<li id=\"weather-icon-two\" class=\"icon-snowy icon-sunny\"></li>");
		} else if (name == "13n") {
			$("#weather-icon-one").replaceWith("<li id=\"weather-icon-one\" class=\"basecloud\"></li>");
			$("#weather-icon-two").replaceWith("<li id=\"weather-icon-two\" class=\"icon-snowy icon-night\"></li>");
		} else if (name == "50d") {
			$("#weather-icon-one").replaceWith("<li id=\"weather-icon-one\" class=\"icon-mist\"></li>");
			$("#weather-icon-two").replaceWith("<li id=\"weather-icon-two\" class=\"\"></li>");
		} else if (name == "50n") {
			$("#weather-icon-one").replaceWith("<li id=\"weather-icon-one\" class=\"icon-mist\"></li>");
			$("#weather-icon-two").replaceWith("<li id=\"weather-icon-two\" class=\"\"></li>");
		} else {
			$("#weather-icon-one").replaceWith("<li id=\"weather-icon-one\" class=\"\"></li>");
			$("#weather-icon-two").replaceWith("<li id=\"weather-icon-two\" class=\"\"></li>");
		}
	};
});
