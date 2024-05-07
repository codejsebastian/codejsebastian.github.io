"use strict"
document.getElementById("search-button").addEventListener("click", consultarAPI);

function consultarAPI(event) {
    let xhr, apiKey, city, url;
    
    event.preventDefault();
    
    city = document.getElementById("place-input").value; 
    apiKey = "e53011891a584287b4eb3ab0233ac000";
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";
    
    xhr = new XMLHttpRequest();;
    xhr.onload = function () {
        mostrarInformacion(this);
    }
    xhr.open("GET", url);
    xhr.send();
}

function mostrarInformacion(xhr) {
    let obj, cityName, cityCountry, cityTemp, weatherIcon, weatherDesc, htmlCode;

    console.log(xhr.responseText);
    obj = JSON.parse(xhr.responseText);
    cityName = obj.name;
    cityCountry = obj.sys.country;
    cityTemp = String(Math.round(obj.main.temp));
    weatherIcon = "https://openweathermap.org/img/wn/" + obj.weather[0].icon + "@2x.png";
    weatherDesc = obj.weather[0].description;
    htmlCode =
        '<div class="card">' +
            '<h2 class="city-name">' + cityName + '<sup>' + cityCountry + '</sup></h2>' +
            '<p class="city-temp">' + cityTemp +'<sup>ºC</sup></p>' +
            '<figure>' +
                '<img src="' + weatherIcon + '" alt="">' +
                '<figcaption>' + weatherDesc + '</figcaption>' +
            '</figure>' +
        '</div>';
    document.getElementById("cards").innerHTML += htmlCode;
    document.getElementById("place-input").value = "";
    
}