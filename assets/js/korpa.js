let ispis = '';
let index = 0;
let cena = 0;
user.korpa.forEach(function (item) {
    index++;
    cena += item.cena;
    ispis += `
            <tr>
                <th scope="row">${index}</th>
                <td>${item.brand.naziv}</td>
                <td>${item.model.naziv}</td>
                <td>${item.cena}</td>
            </tr>`;
});

document.getElementById('korpa-body').innerHTML = ispis;
document.getElementById('korpa-cena').innerHTML = cena;
