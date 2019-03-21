const CLOCK_UPDATE = 500;
const RELOAD = 60000;

function displayTime() {
    var d = new Date();
    var y = document.getElementById("a");
    var h = (d.getHours()).toString();
    var m = (d.getMinutes()).toString();
    var s = (d.getSeconds()).toString();
    var h2 = ("0" + h).slice(-2);
    var m2 = ("0" + m).slice(-2);
    var s2 = ("0" + s).slice(-2);
    y.innerHTML= h2 + ":" + m2 + ":" + s2;
}

function doReload() {
    window.location.reload(true);
}

displayTime();
setInterval(displayTime, CLOCK_UPDATE);
setInterval(doReload, RELOAD);