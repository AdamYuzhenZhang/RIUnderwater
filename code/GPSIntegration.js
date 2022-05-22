//var x = document.getElementById("demo");
//var y = document.getElementById("demo2");
//var z = document.getElementById("demo3");
//var q = document.getElementById("demo4");
//var q2 = document.getElementById("demo5");
var s = document.getElementById("speed");
var vid = document.getElementById("video");
var lat1, lon1, lat2, lon2, time1, time2 = 0;

document.addEventListener("DOMContentLoaded", function(event) {
    var scene = document.querySelector("a-scene");
    //var vid = document.getElementById("video");
    var videoShere = document.getElementById("videoShere");

    if (scene.hasLoaded) {
        run();
    } else {
        scene.addEventListener("loaded", run);
    }

    function run () {
        if(AFRAME.utils.device.isMobile()) {
            //document.querySelector('#splash').style.display = 'flex';
            //document.querySelector('#splash').addEventListener('click', function () {
            //    playVideo();
            //    this.style.display = 'none';
            //})
            //playVideo();
        } else {
            playVideo();
        }
        GPSStart();
    }

    function playVideo () {
        vid.play();
        videoShere.components.material.material.map.image.play();
    }
})


//document.getElementById("measure").onclick = getLocation;

//document.getElementById("start").onclick = clockStart;
//document.getElementById("stop").onclick = clockStop;

var timerId // current timer if started

function GPSStart() {
    if (timerId) return;
    getLocation();
    timerId = setInterval(getCorrection, 1000)

}

function clockStop() {
    clearInterval(timerId)
    timerId = null
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initialPosition, null, {enableHighAccuracy: true});
    } else {
        //x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


function getCorrection() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updatePosition, null, {enableHighAccuracy: true});
    } else {
        //x.innerHTML = "Geolocation is not supported by this browser.";
    }
    // get distance traveled
    var distance = distanceInKmBetweenEarthCoordinates(lat1,lon1,lat2,lon2);
    var time = time2 - time1;
    var speed = speedFromDistance(distance, time);
    s.value = speed;
}

function initialPosition(position){
    lat1, lat2 = position.coords.latitude;
    lon1, lon2 = position.coords.longitude;
    time1, time2 = position.timestamp;
}
function updatePosition(position){
    lat1 = lat2;
    lat2 = position.coords.latitude;
    lon1 = lon2;
    lon2 = position.coords.longitude;
    time1 = time2;
    time2 = position.timestamp;
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude +
        "<br>Accuracy: " + position.coords.accuracy +
        "<br>Speed: " + position.coords.speed + " m/s" +
        "<br>Altitude: " + position.coords.altitude +
        "<br>altitudeAccuracy: " + position.coords.altitudeAccuracy +
        "<br>Headin: " + position.coords.heading +
        "<br>Timestamp: " + position.timestamp  ;

    z.value = position.coords.accuracy;
    lat1, lat2 = position.coords.latitude;
    lon1, lon2 = position.coords.longitude;
    time1, time2 = position.timestamp;
}

function showPosition2(position) {
    y.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude +
        "<br>Accuracy: " + position.coords.accuracy +
        "<br>Speed: " + position.coords.speed + " m/s" +
        "<br>Altitude: " + position.coords.altitude +
        "<br>altitudeAccuracy: " + position.coords.altitudeAccuracy +
        "<br>Headin: " + position.coords.heading +
        "<br>Timestamp: " + position.timestamp  ;
    //     window.document.body.onload = showPosition;
    q.value = position.coords.accuracy;

    lat1 = lat2;
    lat2 = position.coords.latitude;
    lon1 = lon2;
    lon2 = position.coords.longitude;
    time1 = time2;
    time2 = position.timestamp;

    if ( z.value > q.value){z.value = position.coords.accuracy;
        q2.innerHTML = position.coords.accuracy + " " +  position.coords.latitude + ' ' + position.coords.longitude + " the best accurancy with positon";
        console.log('better')}


    else (z.value < q.value); { console.log('worse')}
}


function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "Uşytkownik nie zezwolił na geolokalizację?"
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Informacja o lokalizacji jest niedostępna"
            break;
        case error.TIMEOUT:
            x.innerHTML = "Przekroczono czas zapytania"
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "Wystąpił nieznany błąd"

    }
}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2-lat1);
    var dLon = degreesToRadians(lon2-lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earthRadiusKm * c;
}

function speedFromDistance(distanceInKm, timeInSeconds) {
    return distanceInKm * 1000 / timeInSeconds;
}