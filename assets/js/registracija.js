function registracija() {
    const imePrezime = document.querySelector('#imePrezime').value;
    const imePrezimeRegex = /^[A-Z]{1}?[a-z]+\s[A-Z]{1}[a-z]/.test(imePrezime);
    document.querySelector('#imePrezime-error').style.display = imePrezimeRegex ? 'none' : 'block';

    const username = document.querySelector('#name').value;
    const usernameRegex = username.length >= 3 && username.length <= 20;
    document.querySelector('#username-error').style.display = usernameRegex ? 'none' : 'block';

    const email = document.querySelector('#email').value;
    const emailRegex = /^[a-zA-Z0-9\.\-]+@[a-zA-Z0-9\.\-]+$/.test(email);
    document.querySelector('#email-error').style.display = emailRegex ? 'none' : 'block';

    const password = document.querySelector('#password').value;
    const passwordRegex = /[a-zA-Z0-9]+/.test(password);
    const passwordRegex2 = password.length >= 6 && password.length <= 15;
    document.querySelector('#password-error').style.display = passwordRegex ? 'none' : 'block';
    document.querySelector('#password-error2').style.display = passwordRegex ? passwordRegex2 ? 'none' : 'block' : 'none';

    const passwordRepeat = document.querySelector('#password_confirmation').value;
    const passwordRepeatRegex = password === passwordRepeat;
    document.querySelector('#password_confirmation-error').style.display = passwordRepeatRegex ? 'none' : 'block';

    if (imePrezimeRegex && usernameRegex && emailRegex && passwordRegex && passwordRegex2 && passwordRepeatRegex) {
        let users = localStorage.getItem('users');
        users = users ? JSON.parse(users) : [];
        if (users.find(function (user) {
            return user.email === email;
        })) {
            document.querySelector('#email-exists-error').style.display = 'block';
            document.querySelector('#register-success').style.display = 'none';
        } else {
            document.querySelector('#email-exists-error').style.display = 'none';
            users.push({
                imePrezime,
                username,
                email,
                password,
                korpa: []
            });
            localStorage.setItem('users', JSON.stringify(users));
            document.querySelector('#register-success').style.display = 'block';
        }
    }
}
