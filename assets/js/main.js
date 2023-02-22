let filtriranaKola = [];
dohvatiBrendove();

function dohvatiBrendove() {
    $.ajax({
        url: 'assets/data/brands.json',
        method: 'GET',
        type: 'json',
        success: function (data) {
            document.querySelector('#dropdown-brendovi').innerHTML = `<option value="">Izaberite Brend</option>`;
            for (brend of data) {
                document.querySelector('#dropdown-brendovi').innerHTML += `<option value="${brend.id}">${brend.naziv}</option>`;
            }
            document.querySelector("#dropdown-brendovi").addEventListener("change", function () {
                dohvatiModele2(this.value);
                const pretrazi = document.querySelector('#link-pretrazi');
                if (pretrazi) {
                    document.querySelector('#link-pretrazi').href = `cars.html?brend=${this.value}`;
                }
            });
        }
    })
}

function dohvatiModele2(id) {
    $.ajax({
        url: 'assets/data/models.json',
        method: 'GET',
        type: 'json',
        success: function (data) {
            document.querySelector('#dropdown-modeli').innerHTML = `<option value="">Izaberite model</option>`;
            for (model of data.filter(model => model.brand.id == id)) {
                document.querySelector('#dropdown-modeli').innerHTML += `<option value="${model.id}">${model.naziv}</option>`;
                document.querySelector("#dropdown-modeli").addEventListener("change", function () {
                    const pretrazi = document.querySelector('#link-pretrazi');
                    if (pretrazi) {
                        document.querySelector('#link-pretrazi').href = `cars.html?model=${this.value}`;
                    }
                });
            }
        }
    })
}
