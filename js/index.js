let cityForm = document.getElementById("city-form");
let cityName = document.getElementById("city-name");
let selectCity = document.getElementById("select-city");

let citiesList = ['rosario', 'buenos aires', 'cordoba'];

initOptionSelect();

function showAddCity() {
    cityForm.style.display = 'block';
}

function initOptionSelect(){
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
    if (optionsValidateCityName()) {
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
    }
}

<<<<<<< HEAD
function validateInput() {
    if (!cityName.value) {
      alert("Ingrese el nombre de la ciudad");
      return false;
    }
    return true;
  }

function optionsValidateCityName() {
    if (validateInput()) {
        for (i = 0; i < selectCity.length; ++i) {
            // console.log(selectCity.options[i].value);
            if (selectCity.options[i].value == cityName.value) {
                alert('La ciudad ya ha sido cargada anteriormente.');
                return false;
            }
=======
function optionsValidateCityName(cityValue) {
    return (citiesList.indexOf(cityValue) != -1);
   /* for (i = 0; i < selectCity.length; ++i) {
        let valor = selectCity.options[i].value;
        console.log(valor);
        if (selectCity.options[i] == cityName.value) {
            alert('La ciudad ya ha sido cargada anteriormente.');
            return false;
        } else {
            return true;
>>>>>>> 08b3f48d9ddfbec902b761e38b9da79773b8c725
        }
        return true;
    }
*/}

function displayError() {
    alert('La ciudad no se encuentra en la base de datos.');
}

function addCity() {
    let newOption = cityName.value;
    /*agregar nueva ciudad en el arreglo citiesList*/
    selectCity.options.add(new Option(newOption, newOption));
    cityForm.style.display = 'none';
    alert('se ha cargado');
}


function deleteCity() {
    cityName.remove(cityName.selectedIndex);
    alert("La ciudad fue eliminada.");
}
