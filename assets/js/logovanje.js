if(localStorage.getItem('ulogovanUser')) {
    console.log('sadds');
    window.location.replace('index.html')
}

function logovanje() {
    const email = document.querySelector('#email').value;
    const emailRegex = /^[a-zA-Z0-9\.\-]+@[a-zA-Z0-9\.\-]+$/.test(email);
    document.querySelector('#email-error').style.display = emailRegex ? 'none' : 'block';

    const password = document.querySelector('#password').value;
    const passwordRegex = /[a-zA-Z0-9]+/.test(password);
    const passwordRegex2 = password.length >= 6 && password.length <= 15;
    document.querySelector('#password-error').style.display = passwordRegex ? 'none' : 'block';
    document.querySelector('#password-error2').style.display = passwordRegex ? passwordRegex2 ? 'none' : 'block' : 'none';

    if (emailRegex && passwordRegex && passwordRegex2) {
        let users = localStorage.getItem('users');
        users = users ? JSON.parse(users) : [];
        const user = users.find(function (user) {
            return user.email === email && user.password === password;
        });
        if (user) {
            localStorage.setItem('ulogovanUser', JSON.stringify(user));
            window.location.replace('index.html')
        } else {
            document.querySelector('#invalid-credentials-error').style.display = 'block';
        }
    }
}
