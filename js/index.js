let cityForm = document.getElementById("city-form");
let cityName = document.getElementById("city-name");
let selectCity = document.getElementById("select-city");

let citiesList = ['rosario', 'buenos aires', 'cordoba'];
let localList = JSON.parse(localStorage.getItem('CITIES'));
initOptionSelect();

function showAddCity() {
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

/*
Parser arreglo a string:-

JSON.stringify(names)

Parsear string a arreglo

JSON.parse(localStorage.getItem(‘CITIES’))

localStorage.setItem("CITIES", JSON.stringify(citiesList));


*/

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
   /* for (i = 0; i < selectCity.length; ++i) {
        let valor = selectCity.options[i].value;
        console.log(valor);
        if (selectCity.options[i] == cityName.value) {
            alert('La ciudad ya ha sido cargada anteriormente.');
            return false;
        } else {
            return true;
        }
    }
*/}

function displayError() {
    alert('La ciudad no se encuentra en la base de datos.');
}

function addCity() {
    let newOption = cityName.value.toLowerCase();
    citiesList.push(newOption);
    let parseCities = JSON.stringify(citiesList);
    localStorage.setItem("CITIES", parseCities);
    /*agregar nueva ciudad en el arreglo citiesList*/
    selectCity.options.add(new Option(newOption, newOption));
    cityForm.style.display = 'none';
    alert('se ha cargado');
}


function deleteCity() {
    if (selectCity.selectedIndex == 0) {
        alert('No ha seleccionado ninguna ciudad');
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
