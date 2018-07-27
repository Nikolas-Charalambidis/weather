# UNIB-4IZ268 Weather web application

This web application localizes your current or searched position, receives the weather data which is being displayed and visualised.

It has been developed as a semestral work as a part of the course 4IZ268 Web Technologies.

## How it works?

### Localization API
An asynchronous (AJAX) request is sent to the Localization API [`https://ipapi.co/json`](https://ipapi.co/json) which returns the information in JSON format. 

### Weather API 
The extracted latitude and longitude information is exctracted and passed to the weather API with an API Key as an asynchronous request by [`https://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&APPID=e523473ac8b78fc0eb0018a092bc08f5`](https://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&APPID=e523473ac8b78fc0eb0018a092bc08f5) with the following parameters:

 - `lat=0` is latitude of `0`
 - `lon=0` is longitude of 0 
 - `APPID=e523473ac8b78fc0eb0018a092bc08f5` is my "secret" API key which is required to work. This key should remain secret, however I don't mind to publish it for the educational purposes - feel free to try it out or generate the own key, but don't spam the requests programatically.

## Subpages 
- [Locate me](https://nicharnet.github.io/UNIB-4IZ268-Weather-web-application/index.html) is the main page which localizes your current position and displays the weather information. You don't need to look out the window anymore!
- [Take a look](https://nicharnet.github.io/UNIB-4IZ268-Weather-web-application/take-a-look.html) gives you an opportunity to see the current weather in any city in the world (which is available for the Weather API, however it usually refers to the closest bigger one).
- [My places](https://nicharnet.github.io/UNIB-4IZ268-Weather-web-application/my-places.html) stores the recently found places with these marked as a favourite ones on the previous subpages.
- [About](https://nicharnet.github.io/UNIB-4IZ268-Weather-web-application/about.html) offers a bried summary about the web application.
