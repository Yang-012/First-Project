let map;
let directionsService;
let directionsDisplay;

function initMap() {
  let myLatLng = { lat: 24.9986, lng: 121.5817 }; // 台北木柵動物園
  let mapOptions = {
    center: myLatLng,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  directionsDisplay.setMap(map);
}

function calcRoute() {
  let request = {
    origin: document.getElementById("search__input").value,
    destination: { lat: 24.9986, lng: 121.5817 },
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
  };

  directionsService.route(request, function (result, status) {
    const output = document.querySelector(".search__output");

    if (status === google.maps.DirectionsStatus.OK) {
      output.innerHTML =
        "<div class='googleMap__info googleMap__info--success'>" +
        "<p><strong>出發地:<br></strong> " +
        document.getElementById("search__input").value +
        "</p>" +
        "<p><strong>目的地:<br></strong> 台北木柵動物園</p>" +
        "<p><strong>駕駛距離:<br></strong> <i class='fas fa-road'></i> " +
        result.routes[0].legs[0].distance.text +
        "</p>" +
        "<p><strong>預計時間:<br></strong> <i class='fas fa-hourglass-start'></i> " +
        result.routes[0].legs[0].duration.text +
        "</p>" +
        "</div>";

      directionsDisplay.setDirections(result);
    } else {
      directionsDisplay.setDirections({ routes: [] });
      map.setCenter({ lat: 24.9986, lng: 121.5817 });
      output.innerHTML =
        "<div class='googleMap__info googleMap__info--fail'><i class='fas fa-exclamation-triangle'></i> 無法取得駕駛距離。</div>";
    }
  });
}
function initAutocomplete() {
  let input1 = document.getElementById("search__input");
  let autocomplete1 = new google.maps.places.Autocomplete(input1, {
    types: ["(cities)"],
  });
}

window.onload = function () {
  initMap();
  initAutocomplete();
};
