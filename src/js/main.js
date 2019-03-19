
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

displayTime();
setInterval(displayTime, 1000);