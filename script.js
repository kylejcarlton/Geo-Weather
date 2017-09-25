$(document).ready(function(){
  var tempK;
  var weatherIcon;
  var yourCity;
    function geoLocationWeather(){
      if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(function(position){
          var weatherSettings = {
            // Using "https://github.com/Rob--W/cors-anywhere/" to enable API call to HTTP resource from HTTPS Code Pen
            "url": "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=e90c23425a55f3d0f21aad48602f6c8e"
          } //WEATHER SETTINGS
          $.ajax(weatherSettings).done(function(response){
          tempK = response.main.temp;
          weatherIcon = response.weather[0].icon;
            $("#tempF").html(Math.round((1.8*(tempK - 273) + 32)) + ' &#8457');
            $("#tempC").html(Math.round(tempK - 273.15) + ' &#8451');
            $("#apiImage").html('<img id="apiImage" src="https://openweathermap.org/img/w/' + weatherIcon + '.png">');
            }) //AJAX WEATHER
          var yourCitySettings = {
            "url": "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&sensor=true"
          } //CITY SETTINGS
          $.ajax(yourCitySettings).done(function(response){
            yourCity = response.results[0].address_components[2].long_name;
            $("#city").html('<h2>' + yourCity + '</h2>');
          })

        }); //END OF getCurrentPostion

      } else {
        /*GEOLOCATION NOT AVAILABLE*/
      }

    } //GEOLOCATION WEATHER FUNCITON

  geoLocationWeather();

    $("#tempF").click(function(){
      $("#tempF").hide();
      $("#tempC").fadeIn( "slow", function() {});
    });

    $("#tempC").click(function(){
      $("#tempC").hide();
      $("#tempF").fadeIn( "slow", function() {});
    });

}); //END DOC READY JS
