const RELOAD = 60000;
const CHECK_RATE = 31000;
const TICK_RATE = 100;

let hasError = false;
let lastUptimeCheck;

function tick() {
    displayTime();

    if (lastUptimeCheck) {
        const lastChecked = $('#lastChecked');
        const seconds = Math.ceil((Date.now() - lastUptimeCheck.getTime()) / 1000);
        lastChecked.text(`last checked ${seconds} seconds ago`);
        
    }

    if (hasError) {
        $('body').addClass('error');
    } else {
        $('body').removeClass('error');
    }
}

function dateToTime(d) {
    var h = (d.getHours()).toString();
    var m = (d.getMinutes()).toString();
    var s = (d.getSeconds()).toString();
    var h2 = ("0" + h).slice(-2);
    var m2 = ("0" + m).slice(-2);
    var s2 = ("0" + s).slice(-2);
    return h2 + ":" + m2 + ":" + s2;
}

function displayTime() {
    var y = document.getElementById("a");
    y.innerHTML = dateToTime(new Date());
}

function doReload() {
    window.location.reload(true);
}

async function checkServer(server, expectedStatus = 200, port = 443) {
    return fetch(`https://cors-anywhere.herokuapp.com/${server}:${ port }`)
        .then((res) => {
            const okay = res.status === expectedStatus;

            if (!okay) {
                console.error(res);
            }

            return okay;
        })
        .catch((e) => {
            console.error(e);
            return false;
        })
}

async function checkServers() {
    const servers = [
        'gooil.ca',
        'www.gooil.ca',
        'domore.plus',
        'frc.domore.plus',
        'shs.domore.plus',
        'dev.domore.plus',
        'demo.domore.plus',
        'fake.domore.plus',
        'duenorth.systems',
        // 'duenorthsystems.ca',
        'duenorthsystems.org',
        // 'duenorthsystems.com',
    ];

    const promises = [];
    for (const server of servers) {
        promises.push(checkServer(server));
    }

    result = await Promise.all(promises);
    console.log(result);
    

    const uptimes = $('#uptimes');
    uptimes.empty();
    hasError = false;
    for (let i = 0; i < result.length; i++) {
        const server = servers[i];
        const okay = result[i];

        const p = $(`<p>${ server } </p>`);
        if (okay) {
            p.addClass('okay');
            p.prepend('✅ ');
        } else {
            p.addClass('bad');
            p.prepend('❌ ');
            hasError = true;
        }
        uptimes.append(p);
    }
    lastUptimeCheck = new Date();

}

checkServers();
displayTime();

setInterval(tick, TICK_RATE);
setInterval(doReload, RELOAD);
setInterval(checkServers, CHECK_RATE);