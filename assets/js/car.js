dohvatiKola();
let item = null;
let gallery = $('#gallery');

function dohvatiKola() {
    $.ajax({
        url: 'assets/data/cars.json',
        method: 'GET',
        type: 'json',
        success: function (data) {
            cars = data;
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const id = urlParams.get('id');
            item = cars.find(kola => kola.id == id);
            document.querySelector('#car-info').innerText = item.brand.naziv + ' ' + item.model.naziv;
            let btn = "";
            if (user) btn = `<a class="text-uppercase primary-btn" onclick="addToCart()">Kupi</a>`;
            let ispis = `
                    <div class="row single-model item mb-3" style="background: #f3f3f3">
                        <div class="col-lg-7 model-left" style="padding: 8px">
                            <div class="title align-items-center justify-content-between d-flex">
                                <h4>${item.brand.naziv} ${item.model.naziv}</h4>
                                <h3 class="text-warning">Eur.${item.cena}</h3>
                            </div>
                            <p>
                               ${item.opis}
                            </p>
                            <p>
                                Kapacitet: ${item.specifikacije.kapacitet} <br>
                                Vrata: ${item.specifikacije.vrata} <br>
                                Menjac: ${item.specifikacije.menjac}<br>
                            </p>${btn}
                        </div>
                        <div class="col-lg-5 model-right car-photo" style="background-image: url(${item.slike[0].large})"></div>
                    </div>`;
            let komentariIspis = '';
            item.komentari.forEach(function (komentar) {
                komentariIspis += `
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-xs-12 col-md-12">
                                <div class="row justify-content-between">
                                   <a href="#">${komentar.autor}</a>
                                    <span>${komentar.datum}</span>
                                 </div>
                                <div class="comment-text row mt-2">${komentar.text}</div>
                            </div>
                        </div>
                    </li>`;
            });
            document.querySelector('#kola-ispis').innerHTML += ispis;
            document.querySelector('#komentari-ispis').innerHTML += komentariIspis;
            item.slike.forEach(function (photo) {
                let loadedIndex = 1;
                let img = document.createElement('img');
                let url = photo.large;
                img.onload = function (e) {
                    img.onload = null;
                    let link = document.createElement('a');
                    let li = document.createElement('li');
                    link.href = photo.large;
                    link.appendChild(this);
                    li.appendChild(link);
                    gallery[0].appendChild(li);
                    setTimeout(function () {
                        $(li).addClass('loaded');
                    }, 25 * loadedIndex++);
                };
                img['largeUrl'] = url;
                img.src = photo.thumb;
                img.title = photo.title;
            });
        }
    })
}

function addToCart() {
    user.korpa.push(item);
    let users = JSON.parse(localStorage.getItem('users'));
    users.forEach(function (registeredUser) {
        if (registeredUser.id == user.id) {
            registeredUser.korpa.push(item);
        }
    });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('ulogovanUser', JSON.stringify(user));
    otvoriSnackbar();
}

$('#gallery').photobox('a', {thumbs: true, loop: false}, callback);
// using setTimeout to make sure all images were in the DOM, before the history.load() function is looking them up to match the url hash
setTimeout(window._photobox.history.load, 2000);

function callback() {
    console.log('callback for loaded content:', this);
};

function otvoriSnackbar() {
    $('#snackbar-box').removeClass('d-none');
    let snackbar = $('#snackbar');
    let interval = setInterval(function () {
        let top = snackbar.position().top;
        snackbar.css({top: top + 2 + 'px'});
        if (top > 30) {
            stopInterval();
        }
    }, 15);

    function stopInterval() {
        clearInterval(interval);
    }
}

function zatvoriSnackbar() {
    let snackbar = $('#snackbar');
    let interval = setInterval(function () {
        let top = snackbar.position().top;
        snackbar.css({top: top - 2 + 'px'});
        if (top <= 0) {
            stopInterval();
        }
    }, 15);

    function stopInterval() {
        $('#snackbar-box').addClass('d-none');
        clearInterval(interval);
    }
}
