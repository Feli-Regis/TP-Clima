let cityForm = document.getElementById("city-form");
let cityName = document.getElementById("city-name");
let selectCity = document.getElementById("select-city");
let cityWeather = document.getElementById("city-weather");

let citiesList = ['rosario', 'buenos aires', 'cordoba'];
let localList = JSON.parse(localStorage.getItem('CITIES'));
initOptionSelect();

function showAddCity() {
    cityWeather.style.display = "none";
    cityForm.style.display = 'block';
}

function initOptionSelect() {
    if (localList != null) {
        citiesList = [];
        citiesList = citiesList.concat(localList);
    }
    if (citiesList.length != 0) {
        for (city of citiesList) {
            selectCity.options.add(new Option(city, city));
        }
    }
}

function addNewCity() {
    if (optionsValidateCityName(cityName.value)) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName.value + "&appid=3936d0749fdc3124c6566ed26cf11978&units=metric&lang=es")
            .then((response) => {
                if (response.ok) {
                    addCity();
                } else {
                    displayError();
                };
            })
            .catch((error) => {
                console.error(error);
            });
    } else {
        alert('La ciudad ya se encuentra cargada');
    }
}

function optionsValidateCityName(cityValue) {
    return (citiesList.indexOf(cityValue.toLowerCase()) == -1);
}

function displayError() {
    alert('La ciudad no se encuentra en la base de datos.');
}

function addCity() {
    let newOption = cityName.value.toLowerCase();
    citiesList.push(newOption);
    let parseCities = JSON.stringify(citiesList);
    localStorage.setItem("CITIES", parseCities);
    selectCity.options.add(new Option(newOption, newOption));
    cityName.value = "";
    cityForm.style.display = 'none';
    alert('Se ha cargado con exito.');
}

function deleteCity() {
    if (selectCity.selectedIndex == 0) {
        alert('No ha seleccionado ninguna ciudad.');
    } else {
        selectCity.remove(selectCity.selectedIndex);
        citiesList = [];
        for (city of selectCity.options) {
            if (city.value != "" && city.value != "INGRESAR CIUDAD") {
                citiesList.push(city.value);
            }
        }
        localStorage.setItem('CITIES', JSON.stringify(citiesList));
        alert("La ciudad fue eliminada.");
    }
}

function showCityWeather() {
    if (selectCity.value != "") {
        cityForm.style.display = "none"
        cityWeather.style.display = "block"
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + selectCity.value + "&appid=3936d0749fdc3124c6566ed26cf11978&units=metric&lang=es")
            .then((response) => response.json())
            .then((data) => dumpData(data))
            .catch((error) => {
                console.error(error);
            });
    }
}

function dumpData(data) {
    const { name } = data;
    const { description, icon } = data.weather[0];
    const { temp, humidity, feels_like, pressure, temp_max, temp_min } = data.main;
    result.style.display = "block";
    document.getElementById("icon").src = "http://openweathermap.org/img/wn/" + icon + "@4x.png";
    document.getElementById("tiempo").innerText = "TIEMPO EN";
    document.getElementById("city").innerText = name;
    document.getElementById("date").innerHTML = getDate();
    document.getElementById("temp").innerText = temp.toFixed(1) + "°C";
    document.getElementById("description").innerText = description;
    document.getElementById("humidity").innerText = "Humedad: " + humidity + "%";
    document.getElementById("sen-term").innerText =
      "Sensación térmica: " + feels_like.toFixed(1) + "C°";
    document.getElementById("pressure").innerText = "Presión: " + pressure + " mb";
    document.getElementById("temp-min").innerText = temp_min.toFixed(1) + "°/ ";
    document.getElementById("temp-max").innerText = temp_max.toFixed(1) + "°";
}

function getDate() {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    return "Hasta las " + time;
  }

