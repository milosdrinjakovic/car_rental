window.onload = function() {
    dohvatiKola();
};
let cars = [];
let limit = 3;
let sort = 'naziv';
let order = '+';

function dohvatiKola() {
    $.ajax({
        url: 'assets/data/cars.json',
        method: 'GET',
        type: 'json',
        success: function (data) {
            cars = data;
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const brendQ = urlParams.get('brend');
            const modelQ = urlParams.get('model');
            if (brendQ) {
                document.querySelector('#dropdown-brendovi').value = brendQ;
            } else if (modelQ) {
                const brend = cars.find(kola => kola.model.id == modelQ);
                dohvatiModele2(brend.brand.id);
                setTimeout(function () {
                    document.querySelector('#dropdown-modeli').value = Number(modelQ);
                }, 200);
                document.querySelector('#dropdown-brendovi').value = brend.model.id;
            }
            setTimeout(function () {
                filtriraj()
            }, 1000)
        }
    })
}

function filtriraj() {
    document.getElementById('vesti-loading').style.display = 'block';
    limit = 3;
    document.getElementById('ucitajVise').style.display = 'block';
    const cenaOd = Number(document.querySelector('#cena-od').value);
    const cenaDo = Number(document.querySelector('#cena-do').value);
    const brand = document.querySelector('#dropdown-brendovi').value;
    const model = document.querySelector('#dropdown-modeli').value;
    filtriranaKola = cars.filter(function (kola) {
        return kola.cena >= cenaOd && kola.cena <= cenaDo && (!brand || kola.brand.id == brand) && (!model || kola.model.id == model);
    }).sort(function (a, b) {
        return order === '+' ? a[sort] > b[sort] ? 1 : -1 : a[sort] < b[sort] ? 1 : -1;
    });
    if (limit >= filtriranaKola.length) {
        document.getElementById('ucitajVise').style.display = 'none'
    }
    ispisiKola();
};

function ucitajVise() {
    limit += 3;
    if (limit >= filtriranaKola.length) {
        document.getElementById('ucitajVise').style.display = 'none'
    }
    ispisiKola()
}

function ispisiKola() {
    document.getElementById('vesti-loading').style.display = 'none';
    document.querySelector('#kola-ispis').innerHTML = '';
    for (kola of filtriranaKola.slice(0, limit)) {
        let ispis = `
                    <div class="row single-model item mb-3" style="background: #f3f3f3">
                        <div class="col-lg-7 model-left" style="padding: 8px">
                            <div class="title align-items-center justify-content-between d-flex">
                                <h4>${kola.brand.naziv} ${kola.model.naziv}</h4>
                                <h3 class="text-warning">Eur.${kola.cena}</h3>
                            </div>
                            <p>
                               ${kola.opis}
                            </p>
                            <p>
                                Kapacitet: ${kola.specifikacije.kapacitet} <br>
                                Vrata: ${kola.specifikacije.vrata} <br>
                                Menjac: ${kola.specifikacije.menjac}<br>
                            </p>
                            <a class="text-uppercase primary-btn" href="car.html?id=${kola.id}">Pogledaj</a>
                        </div>
                        <div class="col-lg-5 model-right car-photo" style="background-image: url(${kola.slike[0].large})">
                           
                        </div>
                    </div>`
        document.querySelector('#kola-ispis').innerHTML += ispis;
    }
}
