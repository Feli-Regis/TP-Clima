let cityForm = document.getElementById("city-form");
let cityName = document.getElementById("city-name");
let selectCity = document.getElementById("select-city");

function showAddCity() {
    cityForm.style.display = 'block';
}

// selectArr = JSON.parse(localStorage.getItem("selectArr"));

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
        }
        return true;
    }
}

function displayError() {
    alert('La ciudad no se encuentra en la base de datos.');
}

function addCity() {
    let newOption = document.createElement('option');
    newOption.text = cityName.value.toUpperCase()
    selectCity.appendChild(newOption);
    cityForm.style.display = 'none';
    cityName.value = "";
    alert('Se ha cargado con exito!');
}

// function saveData() {
//     selectArr = [];
//     for (var i = 0; i < cityName.options.length; i++) {
//       if (cityName[i].value != "") {
//         selectArr.push(cityName[i].text);
//       }
//     }
//     localStorage.setItem("selectArr", JSON.stringify(selectArr));
//   }

function deleteCity() {
    cityName.remove(cityName.selectedIndex);
    alert("La ciudad fue eliminada.");
}
