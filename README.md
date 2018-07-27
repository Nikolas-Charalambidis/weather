# [UNIB-4IZ268 Weather web application](https://nicharnet.github.io/UNIB-4IZ268-Weather-web-application)

![HTML-5](https://img.shields.io/badge/HTML-5-orange.svg)
![CSS-3](https://img.shields.io/badge/CSS-3-blue.svg)
![jQuery-3](https://img.shields.io/badge/jQuery-3-blue.svg)
[![codebeat badge](https://codebeat.co/badges/a60d5166-cfc9-42b0-b886-6267f670096c)](https://codebeat.co/projects/github-com-nicharnet-unib-4iz268-weather-web-application-master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d6a7e87601244174a62512b9a3e7fe30)](https://www.codacy.com/app/NicharNET/UNIB-4IZ268-Weather-web-application?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=NicharNET/UNIB-4IZ268-Weather-web-application&amp;utm_campaign=Badge_Grade)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/NicharNET/UNIB-4IZ268-Weather-web-application/blob/master/LICENSE)

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

## Licence

MIT License

Copyright (c) 2018 Nikolas Charalambidis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
