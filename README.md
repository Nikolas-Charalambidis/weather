![HTML-5](https://img.shields.io/badge/HTML-5-orange.svg)
![CSS-3](https://img.shields.io/badge/CSS-3-blue.svg)
![jQuery-3](https://img.shields.io/badge/jQuery-3-blue.svg)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Nikolas-Charalambidis/4IZ268/blob/master/LICENSE)

<img align="left" height="113.176" width="126" top="50" src="http://i67.tinypic.com/2ly64qw.png" border="0">

# 4IZ268 Web Technologies | Weather Application

This web application localizes your current or searched position, receives the weather data which is being displayed and visualised. It has been developed as a semestral work as a part of the course 4IZ268 Web Technologies.

## [https://nikolas-charalambidis.github.io/4IZ268](https://nikolas-charalambidis.github.io/4IZ268)

This is also my very first webpage created at 2016 and published now. The webpage is hosted on GitHub Pages.

:warning: At some point, the application exceeds the request quota for the [Google Maps API](https://developers.google.com/maps/documentation/).

### Course

 - [`4IZ268 - Web Technologies`](http://4iz268.github.io/) stands for the university course of [FIS](https://fis.vse.cz/en/).
 - This application was the 2nd semestral work for this course whereas the first one was a simple static webpage.
 
### Glossary

For those who haven't encountered with the following elementary terms yet:
 - `API`: [Application Programming Interface](https://en.wikipedia.org/wiki/Application_programming_interface) is a set of subroutine definitions, communication protocols, and tools.
 - `AJAX`: [Asynchronous JavaScript and XML](https://en.wikipedia.org/wiki/Ajax_(programming)) is a set of the clien-side techniques to create asynchronous Web applications.
 - `HTML`: [Hypertext Markap Language](https://en.wikipedia.org/wiki/HTML) is a standard markup language for creating web pages and web applications.
 - `JavaScript`: [JavaScript](https://en.wikipedia.org/wiki/JavaScript) is an interpreted, weakly typed, prototype-based and multi-paradigm programming language.
 - `JSON`: [JavaScript Object Notation](https://en.wikipedia.org/wiki/JSON) is a file format that uses human-readable text to transmit data objects.

## How it works?

### Localization API
An AJAX request is sent to the Localization API [`https://ipapi.co/json`](https://ipapi.co/json) which returns the information in JSON format. 

### Weather API 
The extracted latitude and longitude information is exctracted and passed to the weather API with an API Key as an asynchronous request by [`https://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&APPID=e523473ac8b78fc0eb0018a092bc08f5`](https://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&APPID=e523473ac8b78fc0eb0018a092bc08f5) with the following parameters:

 - `lat=0` is latitude of `0`
 - `lon=0` is longitude of 0 
 - `APPID=e523473ac8b78fc0eb0018a092bc08f5` is my "secret" API key which is required to work. This key should remain secret, however I don't mind to publish it for the educational purposes - feel free to try it out or generate the own key, but don't spam the requests programatically.

## Subpages 
- [Locate me](https://nikolas-charalambidis.github.io/4IZ268/index.html) is the main page which localizes your current position and displays the weather information. You don't need to look out the window anymore!
- [Take a look](https://nikolas-charalambidis.github.io/4IZ268/take-a-look.html) gives you an opportunity to see the current weather in any city in the world (which is available for the Weather API, however it usually refers to the closest bigger one).
- [My places](https://nikolas-charalambidis.github.io/4IZ268/my-places.html) stores the recently found places with these marked as a favourite ones on the previous subpages.
- [About](https://nikolas-charalambidis.github.io/4IZ268/about.html) offers a bried summary about the web application.

## Quality check

I have integrated [Codebeat](https://codebeat.co) and [Codacy](https://www.codacy.com) cloud static analysis services to check the overall code quality out of curiosity. 

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
