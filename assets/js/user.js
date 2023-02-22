let user = JSON.parse(localStorage.getItem('ulogovanUser'));
if (user) {
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.querySelector('#nav-menu').innerHTML += `<li class="menu-has-children sf-with-ul">
        <a href="" id="loggedUser">${user.imePrezime}</a>
            <ul ><li><a href="#" onclick="logout()">Izloguj se</a></li></ul>
        </li>
        <li><a href="korpa.html"">Korpa</a></li>`;
}

function logout() {
    localStorage.removeItem('ulogovanUser');
    window.location.replace('index.html')
}
